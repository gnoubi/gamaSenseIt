/*
 * CarCounter.cpp
 *
 *  Created on: 23 juil. 2017
 *      Author: nicolas
 */

#include "CarCounter.h"

using namespace unistd;

CarCounter* counter;

void interrupt2()
{
        cout<<"coucou"<<endl;
}


void interrupt()
{
	counter->distanceDetected();
}

void CarCounter::distanceDetected()
{
	cout<<"coucou1"<<endl;
		std::chrono::high_resolution_clock::time_point current = std::chrono::high_resolution_clock::now();
		while(digitalRead(activationPin) == LOW);
cout <<"coucou2"<<endl;		
auto elapsed = std::chrono::high_resolution_clock::now() - current ;
		lastTimeUpdade = current;
		chrono::microseconds microseconds = chrono::duration_cast<std::chrono::microseconds> (elapsed);
		lastMeasure = microseconds.count() / 10;
}

int CarCounter::getDistance()
{
	while(digitalRead(activationPin) == HIGH);  	
auto current = std::chrono::high_resolution_clock::now();
	while(digitalRead(activationPin) == LOW);
auto elapsed = std::chrono::high_resolution_clock::now() - current ;
	chrono::microseconds microseconds = chrono::duration_cast<std::chrono::microseconds> (elapsed);
	return microseconds.count() / 10;
}

CarCounter::CarCounter(int pin) {
	activationPin = pin;
	lastMeasure = 0;
	lastDistance = 0;
	currentDistance = 0;
	lastTimeUpdade = std::chrono::high_resolution_clock::now();
	pinMode(activationPin, Pinmode(INPUT));

}

void CarCounter::start()
{
	attachInterrupt(activationPin,interrupt,Digivalue(FALLING));
}

void CarCounter::stop()
{
	detachInterrupt(activationPin);
}

CarCounter::~CarCounter() {
	// TODO Auto-generated destructor stub
}


int main(int argc, char *argv[])
{

   // if (!bcm2835_init()) return 1;
	// Turn it on
	cout<<"pin " << raspberryPinNumber(9)<<endl;
#ifdef RASPBERRY2
	cout<< "coucou "<<endl;

#endif

	pinMode(9, Pinmode(INPUT));
/*while(true)
{
	  digitalWrite(9, HIGH);
	  delay(1000);
	  digitalWrite(9, LOW);
	  delay(1000);
}*/




        
  //      attachInterrupt(9,interrupt2,Digivalue(FALLING));

//while(true);

    // GPIO begin if specified    


	counter= new CarCounter(9);
	while(true)
	{
		int dst = counter->getDistance();
		cout<<"distance "<<dst<<endl;
	}

}

