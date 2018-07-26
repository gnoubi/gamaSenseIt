#ifndef GAMASENSEIT_H
#define GAMASENSEIT_H

#include "SX1272.h"

#define GAMA_SENSE_IT_DEBUG_MODE 0

#define WITH_ACK 
#define NB_RETRIES 10

#define  GAMA_SENS_IT_MESSAGE_HEADER String("GamaSenseIT_")
#define GAMA_SENS_IT_MESSAGE_UPDATE_DATE_COMMAND String("UPDATE_DATE_")
#define GAMA_SENS_IT_MESSAGE_REGISTER_COMMAND String("REGISTER_")
#define GAMA_SENS_IT_MESSAGE_CAPTURE_COMMAND String("CAPTURE")
#define GAMA_SENS_IT_MESSAGE_DATE "_DATE_"
#define GAMA_SENS_IT_MESSAGE_VALUE "_VALUES_"
#define CAPTURE_COMMAND 1
#define  DATE_UPDATE_COMMAND 2
#define  REGISTER_COMMAND 3

#define GATEWAY_ADDRESS  1





using namespace std;

class GamaSenseIt
{
 public :
    GamaSenseIt();
    int configure(String nm, int addr);
    unsigned long getCurrentDate();
    void sendToGateway(String message);
    String waitAndReceiveMessage();
    int registerToGateway();


 private :
    String myName;
    int address;
    int e;
    unsigned long int startDate;
    unsigned long int timeStamp;
 
    int setupLora();
    String buildCaptureMessage(String data);
    String buildRegisterMessage();
    String messageContents(String message);
    int offsetMessageContent(String message);
    int messageCommand(String message);
    String extractData(String message);
    bool containPrefix(String s, String  prefix);
    




     
};

extern GamaSenseIt gamaSenseIt;
#endif
