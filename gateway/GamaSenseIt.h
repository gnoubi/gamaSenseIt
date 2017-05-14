#ifndef GAMA_SENSE_IT
#define GAMA_SENSE_IT
#include "SX1272.h"
#include "Message.h"
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



using namespace std;



class GamaSenseIT
{
private:
    SX1272 sx1272;
    map<int,string>* sensorName;
    int e;
    
    bool containPrefix(string s, string prefix);
    string extractData(string message);
    int messageCommand(string message);
    int offsetMessageContent(string message);
    string messageContents(string message);
    int computeCaptureCommand(string message, int senderAddress);
    void computeRegisterCommand(string message, int senderAddress);
    void waitAndReceiveMessage(string& message, int& source);
    void computeMessage(string message, int senderAddress);
    
    
    
public:
    GamaSenseIT(SX1272 &loraConnection);
    
    void sendToSensor(string data,int receiverAddress);
    void sendDate(int receiverAddress);
    void waitAndCompute(string& msg, int& source);
    unsigned long getdate();
    
    
};

#endif