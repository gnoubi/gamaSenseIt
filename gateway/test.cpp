#include <iostream>
#include <stdio.h>
#include <stdlib.h>
#include <string>
#include <time.h>
#include <sstream>
#include <map>

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

    bool containPrefix(string& s, string & prefix)
    {
        for(int i=0; i<prefix.size() && i < s.size(); i++)
        {
            if(s[i] != prefix[i])
                return false;
        }
        
        return true;
    }
    
    void sendToSensor(string data,int receiverAddress)
    {
        string prefix = GAMA_SENS_IT_MESSAGE_HEADER;
        
        string toSend = prefix + data;
        char dtToSend [toSend.size()];
        for(int j = 0; j < toSend.size(); j++)
        {
            dtToSend[j]=toSend[j];
        }
        
        cout<< "message to send ";
        for(int j = 0; j < sizeof(dtToSend); j++)
            cout<<dtToSend[j];
        
        
        cout<<"  "<<toSend.size()<<endl;
        
    }
    
    unsigned long getdate()
    {
        time_t timer;
        time(&timer);
        unsigned long tt = timer;
        cout <<tt<<endl;
        return tt;
    }
    
    void sentDate(int receiverAddress)
    {
        unsigned long mdate =getdate();
        stringstream ss;
        ss << mdate;
        string sdate = ss.str();
        string data = GAMA_SENS_IT_MESSAGE_UPDATE_DATE_COMMAND;
        data = data + sdate;
        
        sendToSensor(data,1);
    }
    
    
    string extractData(char message[], int messageSize)
    {
        string prefix = GAMA_SENS_IT_MESSAGE_HEADER;
        string result="";
        for(int i = prefix.size(); i<messageSize;i++)
        {
            result += message[i];
        }
        return result;
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

    void computeCaptureCommand(string message, int senderAddress)
    {
        
    }

    void computeRegisterCommand(string message, int senderAddress)
    {
        string senderName = messageContents(message);
        sensorName->insert(make_pair(senderAddress,senderName));
        sentDate(senderAddress);
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



int main(int argc, char *argv[])
{
    sensorName = new map<int,string>();
    sentDate(8);
    
    string tmp = buildCaptureMessage();
    char tab2[tmp.size()];
    strcpy(tab2, tmp.c_str());
    string dts = extractData(tab2,sizeof(tab2));
    cout<<dts<<"  "<<messageCommand(dts)<<" "<<messageContents(dts)<<endl;
    return 0;
}
