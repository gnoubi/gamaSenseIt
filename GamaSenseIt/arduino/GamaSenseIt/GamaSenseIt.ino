#include"./GamaSenseIt.h"


int i = 0;

void setup() {
  Serial.begin(9600);
  //**********************************
  //Paramètres de connexion du capteur au réseau 
  //**********************************
  String sensorName = "my_sensor"; //nom du capteur sur le réseau LORA 
  int sensorAddress = 2; //Adresse du capteur, L'adresse 0 est réservée pour la gateway
  
  //Configuration des paramètres réseau
  int res = gamaSenseIt.configure(sensorName,sensorAddress);

  //Connexion à la gateway
  res = gamaSenseIt.registerToGateway();
  if(res == 0)
  {
    Serial.println("Sensor registering to Gateway OK");
    Serial.print("Current date is ");
    Serial.println(gamaSenseIt.getCurrentDate(), DEC);
  }
  else
  {
     Serial.println("Sensor registering to Gateway ERROR");
     while(true);
  }
}

void loop() {
  i++;
  String message = "Bonjour le monde
  //envoi d'un message à la gateway
  gamaSenseIt.sendToGateway("Bonjour le Monde " + String(i));
}
