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
}

void CarCounter::start()
{
	pinMode(activationPin, Pinmode(INPUT));
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
    if (!bcm2835_init()) return 1;
      


        pinMode(8, Pinmode(INPUT));
	pinMode(6, Pinmode(OUTPUT));
        
        attachInterrupt(8,interrupt2,Digivalue(FALLING));

while(true);

    // GPIO begin if specified    
   cout<<"pin " << raspberryPinNumber(8)<<endl;
/*
	counter= new CarCounter(8);
	while(true)
	{
interrupt2		int dst = counter->getDistance();
		cout<<"distance "<<dst<<endl;
	}
*/
}

