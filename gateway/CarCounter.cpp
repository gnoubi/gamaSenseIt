/*
 * CarCounter.cpp
 *
 *  Created on: 23 juil. 2017
 *      Author: nicolas
 */

#include "CarCounter.h"

using namespace unistd;

void CarCounter::distanceDetected()
{
		std::chrono::high_resolution_clock current = std::chrono::high_resolution_clock::now();
		while(digitalRead(activationPin) == LOW);
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
	attachInterrupt(activationPin,distanceDetected,Digivalue(FALLING));
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
	CarCounter* counter= new CarCounter(14);

	while(true)
	{
		int dst = counter->getDistance();
		cout<<"distance "<<dst<<endl;
	}
}

