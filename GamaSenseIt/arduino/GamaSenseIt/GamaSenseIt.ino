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
}

void loop() {
  i++;
  //envoi d'un message à la gateway
  gamaSenseIt.sendDataToGateway("Bonjour le Monde " + String(i));
  Serial.print("Bonjour le Monde " + String(i));
}
