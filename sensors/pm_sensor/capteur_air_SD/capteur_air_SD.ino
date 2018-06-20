#include "PMS.h"
#include <SoftwareSerial.h>
#define SENSOR_NAME "SENSOR_3"

#include <SPI.h>
#include <SD.h>
#include "RTClib.h"

RTC_DS1307 rtc;
File myFile;

//#define TINY_GSM_MODEM_A7
#define SerialMon Serial
//#define TINY_GSM_DEBUG SerialMon

 float p1 = 0, p10 = 0,  p25 = 0;
//Dust sensor configuration
SoftwareSerial SerialPMS(12, 13);
PMS pms(SerialPMS);
PMS::DATA data;

//Gsm sending configuration
SoftwareSerial SerialAT(7, 8); 

void setup() {
  Serial.begin(115200);
  while(!Serial);
 
 
 Serial.println("start SD");
  setupSD();
  delay(1000);
  Serial.println("start dust Sensor");
  setupDustSensor();
  delay(1000);

    
    
    Serial.println("start measure");
    
}

void setupSD()
{
   Serial.print("Initializing SD card...");

  if (!SD.begin(10)) {
    Serial.println("initialization failed!");
    return;
  }
  Serial.println("initialization done.");

}

void loop() {
  Serial.println("start sensor");
  collectData();
  delay(1000);
  publishData();
}

/**
 * Dust Sensor
 */
void collectData()
{
  //setupDustSensor();
  SerialPMS.listen();
  delay(100);
  getSensorData();
}


void publishData()
{
  myFile = SD.open("DataLog.txt", FILE_WRITE);

    DateTime now = rtc.now();
    String message = String(SENSOR_NAME )+";"+now.unixtime()+";"+now.year()+"/"+now.month()+"/"+now.day()+" "+now.hour()+":"+now.minute()+":"+now.second()+";"+String(p1)+";"+String(p25)+";"+String(p10);
    Serial.println("Writing to DataLog.txt...   "+message);
    myFile.println(message);
   
    // close the file:
    myFile.close();
    Serial.println("done.");

}

void setupDustSensor()
{
   // configure dust sensor
  SerialPMS.begin(9600);
  pms.passiveMode(); 
  //pms.activeMode();
  delay(10);
}
void getSensorData()
{

  Serial.println("wake up, wait 30 seconds for stable readings...");
  pms.wakeUp();
  delay(30000);

  Serial.println("Send request read...");
  pms.requestRead();

  Serial.println("Wait max. 10 seconds for read...");
  if (pms.read(data, 10000))
  {
    Serial.println("Data:");
    p1 = data.PM_AE_UG_1_0;
    p10 = data.PM_AE_UG_10_0;
    p25 = data.PM_AE_UG_2_5;
    
    Serial.print("PM 1.0 (ug/m3): ");
    Serial.println(p1);

    Serial.print("PM 2.5 (ug/m3): ");
    Serial.println(p25);

    Serial.print("PM 10.0 (ug/m3): ");
    Serial.println(p10);
   // sendData(p1,p25,p10);
  }
  else
  {
    Serial.println("No data.");
  }
//sendData(1.0, 2.5, 10.0);
  Serial.println("Going to sleep");
  pms.sleep();

}

void closeDustSensor()
{
  SerialPMS.end();
}



