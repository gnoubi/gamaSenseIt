
#include "SX1272.h"
#include <unistd.h>

#include <iostream>
#include <stdio.h>
#include <stdlib.h>
#include <string>
#include <time.h>
#include <sstream>
#include <map>
#include <cstring>

#define GAMA_SENS_IT_MESSAGE_HEADER "GamaSenseIT_"
#define GAMA_SENS_IT_MESSAGE_UPDATE_DATE_COMMAND "UPDATE_DATE_"
#define GAMA_SENS_IT_MESSAGE_REGISTER_COMMAND "REGISTER_"
#define GAMA_SENS_IT_MESSAGE_CAPTURE_COMMAND "CAPTURE"
#define GAMA_SENS_IT_MESSAGE_DATE "_DATE_"
#define GAMA_SENS_IT_MESSAGE_VALUE "_VALUES_"
#define CAPTURE_COMMAND 1
#define DATE_UPDATE_COMMAND 2
#define REGISTER_COMMAND 3


using namespace std;


map<int,string>* sensorName;
int e;
char my_packet[200];

void setupLora()
{
    // Print a start message
    printf("SX1272 module and Raspberry Pi: receive packets without ACK\n");
    
    // Power ON the module
    e = sx1272.ON();
    
    delay(1000);
    printf("Setting power ON: state %d\n", e);
    
    // Set transmission mode
    e = sx1272.setMode(4);
    printf("Setting Mode: state %d\n", e);
    // Set header
    e = sx1272.setHeaderON();
    printf("Setting Header ON: state %d\n", e);
    
    // Select frequency channel
    e = sx1272.setChannel(CH_10_868);
    printf("Setting Channel: state %d\n", e);
    // Set CRC
    e = sx1272.setCRC_ON();
    printf("Setting CRC ON: state %d\n", e);
    
    // Select output power (Max, High or Low)
    e = sx1272.setPower('H');
    printf("Setting Power: state %d\n", e);
    
    // Set the node address
    e = sx1272.setNodeAddress(1);
    printf("Setting Node address: state %d\n", e);
    
    // Print a success message
    printf("SX1272 successfully configured\n\n");
}



    bool containPrefix(string s, string  prefix)
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
    
    void sendToSensor(string data,int receiverAddress)
    {
        string prefix = GAMA_SENS_IT_MESSAGE_HEADER;
        
        string toSend = prefix + data;
        char dtToSend[toSend.size()+1];//as 1 char space for null is also required
        strcpy(dtToSend, toSend.c_str());
        e = sx1272.sendPacketTimeout(receiverAddress, dtToSend);
    }
string extractData(string message)
{
    string prefix = GAMA_SENS_IT_MESSAGE_HEADER;
    string result=message.substr(prefix.size());
    return result;
}

void waitAndReceiveMessage(string& message, int& source)
{
    boolean cc = true;
    int sender = 0;
    string prefix = GAMA_SENS_IT_MESSAGE_HEADER;
    string receivedMessage = "";
    do
    {
        string tmpReceivedMessage = "";
        e = sx1272.receivePacketTimeout(10000);
        if ( e == 0 )
        {
            sender =sx1272.packet_received.src;
            for (unsigned int i = 0; i < sx1272.packet_received.length; i++)
            {
                tmpReceivedMessage += (char)sx1272.packet_received.data[i];
            }
            cout<< endl<<"message recu :"<<endl;
            cout<< endl<<tmpReceivedMessage<<endl;
            cout<< endl<<endl;
            
            if(containPrefix(tmpReceivedMessage,prefix))
            {
                receivedMessage = extractData(tmpReceivedMessage);
                
                cc = false;
                
                cout<< endl<<"donnees extraites :"<<endl;
                cout<< endl<<receivedMessage<<endl;
                cout<< endl<<endl;
                cout<< endl<<endl;
                cout<< endl<<endl;
                cout<< endl<<endl;
                
                
            }
        }
        else {
            cout<<".."<<endl;
            // Serial.println(e, DEC);
        }
    }while(cc);
    message  =receivedMessage;
    source = sender;
    
    //return 0;
}


    unsigned long getdate()
    {
        time_t timer;
        time(&timer);
        unsigned long tt = timer;
        return tt;
    }
    
    void sendDate(int receiverAddress)
    {
        unsigned long mdate =getdate();
        stringstream ss;
        ss << mdate;
        string sdate = ss.str();
        string data = GAMA_SENS_IT_MESSAGE_UPDATE_DATE_COMMAND;
        data = data + sdate;
        sendToSensor(data,receiverAddress);
    }
    
    

    int messageCommand(string message)
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
    
    int offsetMessageContent(string message)
    {
        switch(messageCommand(message))
        {
            case CAPTURE_COMMAND : { return sizeof(GAMA_SENS_IT_MESSAGE_CAPTURE_COMMAND);}
            case DATE_UPDATE_COMMAND : { return sizeof(GAMA_SENS_IT_MESSAGE_UPDATE_DATE_COMMAND);}
            case REGISTER_COMMAND : { return sizeof(GAMA_SENS_IT_MESSAGE_REGISTER_COMMAND);}
        }
        return -1;
    }
    
    string messageContents(string message)
    {
        string tailString = message.substr(offsetMessageContent(message));
        return tailString;
    }

    int computeCaptureCommand(string message, int senderAddress)
    {
        string datePrefix = GAMA_SENS_IT_MESSAGE_DATE;
        string valuePrefix = GAMA_SENS_IT_MESSAGE_VALUE;
        
        cout << "donnees arrivees"<<message<<endl;
        
        int dateFound = message.find(GAMA_SENS_IT_MESSAGE_DATE);
        if(dateFound==std::string::npos)
            return -1;
        int dataFound = message.find(GAMA_SENS_IT_MESSAGE_VALUE);
        if(dataFound==std::string::npos)
            return -1;
        int sensorDate;
        
        
        int dateIndex =dateFound + datePrefix.size();
        int dateSize =dataFound - dateIndex ;
        istringstream( message.substr(dateIndex,dateSize)) >> sensorDate;
        int dataIndex =dataFound + valuePrefix.size();
        string data = message.substr(dataIndex);
        
        cout<<"date:"<< sensorDate << endl<<"  data :"<<data<<endl;
        return 0;
    }

    void computeRegisterCommand(string message, int senderAddress)
    {
        string senderName = messageContents(message);
        sensorName->insert(make_pair(senderAddress,senderName));
        sendDate(senderAddress);
    }

    void computeMessage(string message, int senderAddress)
    {
        int command = messageCommand(message);
        
        switch(command)
        {
            case CAPTURE_COMMAND : {
                computeCaptureCommand(message,senderAddress);
                break;
            }
            case REGISTER_COMMAND : {
                computeRegisterCommand(message,senderAddress);
                break;
            }
        }
    }

    string buildCaptureMessage()
    {
        unsigned long mdate =getdate();
        stringstream ss;
        ss << mdate;
        string sdate = ss.str();
        string message = GAMA_SENS_IT_MESSAGE_HEADER ;
        message+=GAMA_SENS_IT_MESSAGE_CAPTURE_COMMAND;
        message+=GAMA_SENS_IT_MESSAGE_DATE;
        message+=sdate;
        message+=GAMA_SENS_IT_MESSAGE_VALUE;
        message+="oyé";
        return message;
    }


void setup()
{
    sensorName = new map<int,string>();
    setupLora();
}

void loop()
{
   while(true)
   {
       string msg = "";
       int source = -1;
       waitAndReceiveMessage(msg,source);
       computeMessage(msg,source);
   }
}
int main(int argc, char *argv[])
{
    setup();
    
    sendDate(8);
    string tmp = buildCaptureMessage();
    char tab2[tmp.size()];
    strcpy(tab2, tmp.c_str());
    string dts = extractData(tmp);
    cout<<dts<<"  "<<messageCommand(dts)<<" "<<messageContents(dts)<<endl;
    loop();
    return 0;
}
