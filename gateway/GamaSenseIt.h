#ifndef GAMA_SENSE_IT
#define GAMA_SENSE_IT


#include <iostream>
#include <stdio.h>
#include <stdlib.h>
#include <string>
#include <time.h>
#include <sstream>

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



class GamaSenseIT
{
private:
    bool containPrefix(string& s, string & prefix);
    string extractData(char message[], int messageSize);
    int messageCommand(string message);
    int offsetMessageContent(string message);
    string messageContents(string message);
    void computeCaptureCommand(string message, int senderAddress);
    void computeRegisterCommand(string message, int senderAddress);
    
    
public:
    void sendToSensor(string data,int receiverAddress);
    void computeMessage(string message, int senderAddress);
    void sentDate(int receiverAddress);
    unsigned long getdate();
    
    
};

#endif