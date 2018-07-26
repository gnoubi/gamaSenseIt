
#include "GamaSenseIt.h"





using namespace std;

GamaSenseIT::GamaSenseIT(SX1272 &loraConnection)
{
	string id = CLIENTID;
	gatewayName = new char[id.length()+1];
	strcpy(gatewayName,id.c_str());
	this->loraConnector = loraConnection;
	brokerAddress = ADDRESS;
	useBroker = false;
	saveInFile = false;
	fileName = DEFAULT_FILE_NAME;
	loraMode=LORAMODE;
	DEFAULT_CHANNEL = CH_10_868;


}

void GamaSenseIT::setupLora()
{
	int e;
    // Print a start message
    printf("loraConnector module and Raspberry Pi: receive packets with ACK\n");
    
    // Power ON the module
    e = loraConnector.ON();
    
    delay(1000);
    printf("Setting power ON: state %d\n", e);
    
    // Set transmission mode
    e = loraConnector.setMode(loraMode);
    printf("Setting Mode: state %d\n", e);

    // Set header
  //  e = loraConnector.setHeaderON();
  //  printf("Setting Header ON: state %d\n", e);
	
	loraConnector._enableCarrierSense=true;
    printf("Setting Header ON: state %d\n", e);
    
    // Select frequency channel
	
	e = loraConnector.setChannel(DEFAULT_CHANNEL);
    printf("Setting Channel: state %d\n", e);
    // Set CRC
    //e = loraConnector.setCRC_ON();
    //printf("Setting CRC ON: state %d\n", e);
	
#ifdef PABOOST
  	loraConnector._needPABOOST=true;
  // previous way for setting output power
  // powerLevel='x';
#else
  // previous way for setting output power
  // powerLevel='M';  
#endif
  
	
    e = loraConnector.setPowerDBM((uint8_t)MAX_DBM); 
    printf("Setting Power: state %d\n", e);
    printf("select power in DBM : %d\n", MAX_DBM);
    
    // Set the node address
    e = loraConnector.setNodeAddress(1);
    printf("Setting Node address: state %d\n", e);
    
    // Print a success message
    printf("loraConnector successfully configured\n\n");
}

bool GamaSenseIT::containPrefix(string s, string  prefix)
{
    for(int i=0; i<prefix.size() && i < s.size(); i++)
    {
        if(s[i] != prefix[i])
        {
            return false;
        }
    }
    return true;
}

void GamaSenseIT::sendToSensor(string data,int receiverAddress)
{
	int e;
    string prefix = GAMA_SENS_IT_MESSAGE_HEADER;

    string toSend = prefix + data;
    char dtToSend[toSend.size()+1];//as 1 char space for null is also required
    strcpy(dtToSend, toSend.c_str());


#ifdef WITH_ACK
  int n_retry=NB_RETRIES;
  do {
	  e = loraConnector.sendPacketTimeoutACKRetries(receiverAddress, dtToSend);

    n_retry--;

    if (n_retry == 0)
    {
    	cout<<"Abort message to "<<receiverAddress<<endl;
    	cout<<"contents "<<dtToSend<<endl;
    }
  } while (e && n_retry);
#else
  e = loraConnector.sendPacketTimeout(receiverAddress, dtToSend);
#endif
}

string GamaSenseIT::extractData(string message)
{
	string prefix = GAMA_SENS_IT_MESSAGE_HEADER;
	string result=message.substr(prefix.size());
	return result;
}

void GamaSenseIT::waitAndReceiveMessage(string& message, int& source)
{
	int e;
    boolean cc = true;
    int sender = 0;
    string prefix = GAMA_SENS_IT_MESSAGE_HEADER;
    string receivedMessage = "";
    cout<<"waiting message."<<endl;
    do
    {
    	e = 0;
        string tmpReceivedMessage = "";
        e = loraConnector.receivePacketTimeout(10000);
        if ( e == 0 )
        {
            sender =loraConnector.packet_received.src;
            for (unsigned int i = 0; i < loraConnector.packet_received.length; i++)
            {
                tmpReceivedMessage += (char)loraConnector.packet_received.data[i];
            }
			cout<<"pre contents : "<<tmpReceivedMessage<<endl;
            if(containPrefix(tmpReceivedMessage,prefix))
            {
                receivedMessage = extractData(tmpReceivedMessage);
                cc = false;
             }
        }
        else {
            cout<<".";
        }
    }while(cc);
    message  =receivedMessage;
    source = sender;
    cout<<"receiving message from : "<<source<<endl;
    cout<<"contents : "<<message<<endl;
    //return 0;
}


unsigned long GamaSenseIT::getdate()
{
    time_t timer;
    time(&timer);
    unsigned long tt = timer;
    return tt;
}


void GamaSenseIT::sendDate(int receiverAddress)
{
    unsigned long mdate =getdate();
    stringstream ss;
    ss << mdate;
    string sdate = ss.str();
    string data = GAMA_SENS_IT_MESSAGE_UPDATE_DATE_COMMAND;
    data = data + sdate;
    sendToSensor(data,receiverAddress);
}

int GamaSenseIT::messageCommand(string message)
 {
     int found = message.find(GAMA_SENS_IT_MESSAGE_CAPTURE_COMMAND);
     if(found!=std::string::npos)
         return CAPTURE_COMMAND;
     found = message.find(GAMA_SENS_IT_MESSAGE_UPDATE_DATE_COMMAND);
     if(found!=std::string::npos)
         return DATE_UPDATE_COMMAND;
     found = message.find(GAMA_SENS_IT_MESSAGE_REGISTER_COMMAND);
     if(found!=std::string::npos)
         return REGISTER_COMMAND;
     return -1;
 }

int GamaSenseIT::offsetMessageContent(string message)
{
    switch(messageCommand(message))
    {
        case CAPTURE_COMMAND : { return strlen(GAMA_SENS_IT_MESSAGE_CAPTURE_COMMAND);}
        case DATE_UPDATE_COMMAND : { return strlen(GAMA_SENS_IT_MESSAGE_UPDATE_DATE_COMMAND);}
        case REGISTER_COMMAND : { return strlen(GAMA_SENS_IT_MESSAGE_REGISTER_COMMAND);}
    }
    return -1;
}

string GamaSenseIT::messageContents(string message)
{
    string tailString = message.substr(offsetMessageContent(message));
    return tailString;
}

int GamaSenseIT::sendToBrocker(string message, string sender, string mid, unsigned long sensorDate)
 {
	 cout<<"send messgage to broker"<<endl;
	string dte = to_string(sensorDate);
 	string data =""+ dte+";"+sender+";"+mid+";"+message;
 	char  msg[data.length() + 1];
 	strcpy(msg, data.c_str());
 	int rc;
 	pubmsg.payload = msg;
     pubmsg.payloadlen = message.length();
     pubmsg.qos = QOS;
     pubmsg.retained = 0;
     MQTTClient_publishMessage(client, gatewayName, &pubmsg, &token);
     printf("Waiting for up to %d seconds for publication of %s\n"
             "on topic %s for client with ClientID: %s\n",
             (int)(TIMEOUT/1000), msg, gatewayName, CLIENTID);
     rc = MQTTClient_waitForCompletion(client, token, TIMEOUT);
     printf("Message with delivery token %d delivered\n", token);
     return rc;
 }

 void GamaSenseIT::testMQTT()
 {
	 for(int i = 0; i < 1000; i++)
	 {
		 this-> sendToBrocker("message "+i,"truc","bidule",1);
	 }
	
 }


int GamaSenseIT::computeCaptureCommand(string message, int senderAddress)
{
    string datePrefix = GAMA_SENS_IT_SENDER_NAME;
    string MIDPrefix = GAMA_SENS_IT_MESSAGE_ID;
    string valuePrefix = GAMA_SENS_IT_MESSAGE_VALUE;

    int dateFound = message.find(GAMA_SENS_IT_SENDER_NAME);
    if(dateFound==std::string::npos)
        return -1;
	
	cout <<" pos name "<<dateFound<<endl;
    
    int midFound = message.find(GAMA_SENS_IT_MESSAGE_ID);
    if(midFound==std::string::npos)
        return -1;
	
	
	int dataFound = message.find(GAMA_SENS_IT_MESSAGE_VALUE);
    if(dataFound==std::string::npos)
        return -1;

	cout <<" pos data "<<dataFound<<endl;

    int dateIndex =dateFound + datePrefix.size();
    int dateSize =midFound - dateIndex ;

	string sensorName = message.substr(dateIndex,dateSize);
	cout <<" name "<<sensorName<<endl;


    int midIndex =midFound + MIDPrefix.size();
    int midSize =dataFound - midIndex ;

	string mid = message.substr(midIndex,midSize);
	cout <<" mid "<<mid<<endl;

    int dataIndex =dataFound + valuePrefix.size();
    string data = message.substr(dataIndex);
	cout <<" data "<<data<<endl;

	
	unsigned long sensorDate  = time(NULL);
	cout <<  mid << ";"<<sensorName<<";"<<data<<"\r\n";
   if(saveInFile == true)
    {
    	(*outFile) <<  sensorDate << ";"<<sensorName<<";"<<mid<<";"<<data<<"\r\n";
    	outFile->flush();
    }

    int sending = useBroker==false?0:sendToBrocker(data,  sensorName, mid,  sensorDate);
    return 1;
}


void GamaSenseIT::computeMessage(string message, int senderAddress)
 {
     int command = messageCommand(message);
     switch(command)
     {
         case CAPTURE_COMMAND : {
			 cout<<"message à traiter "<<message<<endl;
             computeCaptureCommand(message,senderAddress);
             break;
         }
     }
 }

void GamaSenseIT::setupMQTT(string address, string clientID)
{
	string pro = ADDRESS_PROTOCOL;
	string port = ADDRESS_PORT;

	/*char  tcpAddress[pro.length()+port.length()+1+address.length()];
	strcpy(tcpAddress,pro.c_str());
	strcat(tcpAddress,address.c_str());
	strcat(tcpAddress,port.c_str());
	*/
	
	char  tcpAddress[1+address.length()];
	strcpy(tcpAddress,address.c_str());
	//strcat(tcpAddress,address.c_str());
	//strcat(tcpAddress,port.c_str());
	int rc;

	char id_c[clientID.length()+1];
	strcpy(id_c,clientID.c_str());

	 MQTTClient_create(&client, tcpAddress, id_c,
        MQTTCLIENT_PERSISTENCE_NONE, NULL);
    conn_opts.keepAliveInterval = 4000;
    conn_opts.cleansession = 1;
	conn_opts.username ="gama_demo";
	conn_opts.password = "gama_demo";

    if ((rc = MQTTClient_connect(client, &conn_opts)) != MQTTCLIENT_SUCCESS)
    {
        printf("Failed to connect, return code %d\n", rc);
        exit(-1);
    }
}

void GamaSenseIT::setupOutFile(string outf)
{
    outFile = new ofstream();
    outFile->open(outf.c_str());
}

void  GamaSenseIT::analyseParameter(string cmd, string value)
{
	cout<< "command: "<<cmd<<" value"<<value<<endl;
	if (cmd.compare("-broker") == 0)
	{
		useBroker = true;
		brokerAddress = value;
	}
	if (cmd.compare("-name") == 0)
	{
		gatewayName = new char[value.length()+1];
		strcpy(gatewayName, value.c_str());
	}
	if (cmd.compare("-file") == 0)
	{
		saveInFile = true;
		fileName = value;
	}
}


void GamaSenseIT::setup()
{
    setupLora();
    if(useBroker == true)
    {
        setupMQTT(brokerAddress,gatewayName);
    }
    if(saveInFile == true)
    {
    	setupOutFile(fileName);
    }


}

void GamaSenseIT::loop()
{
   while(true)
   {
       string msg = "";
       int source = -1;
       waitAndReceiveMessage(msg,source);
       computeMessage(msg,source);
    }
}

int truc()
{
    MQTTClient client;
    MQTTClient_connectOptions conn_opts = MQTTClient_connectOptions_initializer;
    MQTTClient_message pubmsg = MQTTClient_message_initializer;
    MQTTClient_deliveryToken token;
    int rc;
    MQTTClient_create(&client, "vmpams.mpl.ird.fr:1935/gama/", "CLIENTID",
        MQTTCLIENT_PERSISTENCE_NONE, NULL);
    conn_opts.keepAliveInterval = 20;
    conn_opts.cleansession = 1;
	conn_opts.username="gama_demo"; 
	conn_opts.password="gama_demo"; 
    MQTTClient_setCallbacks(client, NULL, connlost, msgarrvd, delivered);
    if ((rc = MQTTClient_connect(client, &conn_opts)) != MQTTCLIENT_SUCCESS)
    {
        printf("Failed to connect, return code %d\n", rc);
        exit(EXIT_FAILURE);
    }
    pubmsg.payload = PAYLOAD;
    pubmsg.payloadlen = strlen(PAYLOAD);
    pubmsg.qos = QOS;
    pubmsg.retained = 0;
    deliveredtoken = 0;
    MQTTClient_publishMessage(client, TOPIC, &pubmsg, &token);
    printf("Waiting for publication of %s\n"
            "on topic %s for client with ClientID: %s\n",
            PAYLOAD, TOPIC, CLIENTID);
    while(deliveredtoken != token);
    MQTTClient_disconnect(client, 10000);
    MQTTClient_destroy(&client);
	
}

int main(int argc, char *argv[])
{
	truc();
/*	 GamaSenseIT* gamaSenseIt;
	 gamaSenseIt = new GamaSenseIT(sx1272);

	for(int i = 1; i+1<argc; i=i+2 )
	{
		string cmd(argv[i]);
		string val(argv[i+1]);
		gamaSenseIt->analyseParameter(cmd,val);
	}

	gamaSenseIt->setup();
	gamaSenseIt->testMQTT();
	gamaSenseIt->loop();*/
    return 0;
}

