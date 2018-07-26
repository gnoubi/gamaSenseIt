#include "GamaSenseIt.h"

GamaSenseIt::GamaSenseIt()
{}

int GamaSenseIt::configure(String nm, int addr)
{
  this->myName = nm;
  this->address = addr;
  return this->setupLora();
 }


int GamaSenseIt::setupLora()
{
  // Open serial communications and wait for port to open:
 #if(GAMA_SENSE_IT_DEBUG_MODE > 0)
  Serial.begin(9600);
  // Print a start message
  Serial.println(F("SX1272 module and Arduino: send packets without ACK"));
 #endif 
  // Power ON the module
  e = sx1272.ON();
 #if(GAMA_SENSE_IT_DEBUG_MODE > 0)
  Serial.print(F("Setting power ON: state "));
  Serial.println(e, DEC);
 #endif 
  // Set transmission mode and print the result
  e |= sx1272.setMode(4);
#if(GAMA_SENSE_IT_DEBUG_MODE > 0)
   Serial.print(F("Setting Mode: state "));
  Serial.println(e, DEC);
#endif  
  // Set header
  e |= sx1272.setHeaderON();
#if(GAMA_SENSE_IT_DEBUG_MODE > 0)
  Serial.print(F("Setting Header ON: state "));
  Serial.println(e, DEC);
#endif  
  // Select frequency channel
  e |= sx1272.setChannel(CH_11_868);
#if(GAMA_SENSE_IT_DEBUG_MODE > 0)
  Serial.print(F("Setting Channel: state "));
  Serial.println(e, DEC);
#endif  
  // Set CRC
  e |= sx1272.setCRC_ON();

#if(GAMA_SENSE_IT_DEBUG_MODE > 0)
  Serial.print(F("Setting CRC ON: state "));
  Serial.println(e, DEC);
#endif  
  // Select output power (Max, High or Low)
  e |= sx1272.setPower('H');
#if(GAMA_SENSE_IT_DEBUG_MODE > 0)
  Serial.print(F("Setting Power: state "));
  Serial.println(e, DEC);
#endif  
  // Set the node address and print the result
  e |= sx1272.setNodeAddress(this->address);
#if(GAMA_SENSE_IT_DEBUG_MODE > 0)
  Serial.print(F("Setting node address: state "));
  Serial.println(e, DEC);
  
  // Print a success message
  if (e == 0)
    Serial.println(F("SX1272 successfully configured"));
  else
    Serial.println(F("SX1272 initialization failed"));
#endif
  return e;
}


bool GamaSenseIt::containPrefix(String s, String  prefix)
    {
        for(int i=0; i<prefix.length() && i < s.length(); i++)
        {
            if(s[i] != prefix[i])
                return false;
        }
        
        return true;
    }
String GamaSenseIt::extractData(String message)
    {
        String prefix = GAMA_SENS_IT_MESSAGE_HEADER;
        String result=message.substring(prefix.length());
        return result;
    }
    
int GamaSenseIt::messageCommand(String message)
    {
        int found = message.indexOf(GAMA_SENS_IT_MESSAGE_CAPTURE_COMMAND);
        if(found>=0)
            return CAPTURE_COMMAND;
        found = message.indexOf(GAMA_SENS_IT_MESSAGE_UPDATE_DATE_COMMAND);
        if(found>=0)
            return DATE_UPDATE_COMMAND;
        found = message.indexOf(GAMA_SENS_IT_MESSAGE_REGISTER_COMMAND);
        if(found>=0)
            return REGISTER_COMMAND;
        return -1;
    }
    
int GamaSenseIt::offsetMessageContent(String message)
    {
        switch(messageCommand(message))
        {
            case CAPTURE_COMMAND : { return GAMA_SENS_IT_MESSAGE_CAPTURE_COMMAND.length();}
            case DATE_UPDATE_COMMAND : { return GAMA_SENS_IT_MESSAGE_UPDATE_DATE_COMMAND.length();}
            case REGISTER_COMMAND : { return GAMA_SENS_IT_MESSAGE_REGISTER_COMMAND.length();}
        }
        return -1;
    }
    
String GamaSenseIt::messageContents(String message)
{
    String tailString = message.substring(offsetMessageContent(message));
    return tailString;
}

String GamaSenseIt::buildRegisterMessage()
{
  String msg =  GAMA_SENS_IT_MESSAGE_REGISTER_COMMAND+this->myName;
  return msg; 
}

String GamaSenseIt::buildCaptureMessage(String data)
{
    unsigned long mdate =getCurrentDate();
    String sdate = String(mdate);
    String message = "" ;
    message+=GAMA_SENS_IT_MESSAGE_CAPTURE_COMMAND;
    message+=GAMA_SENS_IT_MESSAGE_DATE;
    message+=sdate;
    message+=GAMA_SENS_IT_MESSAGE_VALUE;
    message+=data;
 return message;
}

String GamaSenseIt::waitAndReceiveMessage()
{
  boolean cc = true;
  String receivedMessage = "";
  do
  {
    String tmpReceivedMessage = "";
    e = sx1272.receivePacketTimeout(10000);
    if ( e == 0 )
    {
      for (unsigned int i = 0; i < sx1272.packet_received.length; i++)
      {
        tmpReceivedMessage += (char)sx1272.packet_received.data[i];
      }
      if(containPrefix(tmpReceivedMessage,GAMA_SENS_IT_MESSAGE_HEADER))
      {
        receivedMessage = extractData(tmpReceivedMessage);
        cc = false;
      }
    }
    else {
#if(GAMA_SENSE_IT_DEBUG_MODE > 0)
       Serial.print(F(".."));
#endif
    }
  }while(cc);
  return receivedMessage;
}

void GamaSenseIt::sendToGateway(String message)
{
  String prefix = GAMA_SENS_IT_MESSAGE_HEADER ;     
  char data [message.length()+prefix.length()+1 ];
  //xmm.toCharArray(data, xmm.length());
  int i = 0;
  for(; i<prefix.length();i++)
  {
    data[i] = prefix[i];
  }
  
   for(; i<sizeof(data);i++)
  {
    data[i] = message[i - prefix.length()];
  }
  
#if(GAMA_SENSE_IT_DEBUG_MODE > 0)
Serial.println("************************");
Serial.print("sent data : ");
Serial.println(data);
Serial.println("************************");
#endif

#ifdef WITH_ACK
      int n_retry=NB_RETRIES;
      
      do {
        e = sx1272.sendPacketTimeoutACKRetries(GATEWAY_ADDRESS, data);
        n_retry--;
      
#if(GAMA_SENSE_IT_DEBUG_MODE > 0)
        if (e==3)
          Serial.print("No ACK");
        if (n_retry)
          Serial.print("Retry");
        else
          Serial.print("Abort"); 
#endif          
      } while (e && n_retry);          
#else
      e = sx1272.sendPacketTimeout(GATEWAY_ADDRESS, data);
#endif
}


int GamaSenseIt::registerToGateway()
{
 sendToGateway(buildRegisterMessage());
  String receivedMessage="";
  int command = -1;
  unsigned long startWaiting = millis()/1000;
  delay(1000);
#if(GAMA_SENSE_IT_DEBUG_MODE > 0)
   Serial.print("Registering");
#endif
  do
  {
    receivedMessage = waitAndReceiveMessage();
    Serial.print("message recu");
    Serial.println(receivedMessage);
    
    command = messageCommand(receivedMessage);
    if(startWaiting + 120 < (millis()/1000))
      return -1;
  }while(DATE_UPDATE_COMMAND != command);
  startDate = millis() / 1000;
  timeStamp = (receivedMessage.substring(offsetMessageContent(receivedMessage))).toInt();

#if(GAMA_SENSE_IT_DEBUG_MODE > 0)
  Serial.print("date : ");
  Serial.println(timeStamp);
#endif  
  
  return 0;
}

unsigned long GamaSenseIt::getCurrentDate()
{
  unsigned long delayFromStart = (millis()/1000) - startDate;
  return timeStamp + delayFromStart;
}

GamaSenseIt gamaSenseIt = GamaSenseIt();

