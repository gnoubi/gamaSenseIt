/*
 * CarCounter.h
 *
 *  Created on: 23 juil. 2017
 *      Author: nicolas
 */

#ifndef CARCOUNTER_H_
#define CARCOUNTER_H_

#include "arduPi_pi2.h"
#include <iostream>
#include <chrono>

using namespace std;

class CarCounter {

private:
	int activationPin;
	int currentDistance;
	std::chrono::high_resolution_clock::time_point lastTimeUpdade;
	int lastMeasure;




public:
	void start();
	void stop();
	int getDistance();
	int getLastDistance();
	void distanceDetected();
	CarCounter(int pin);
	virtual ~CarCounter();
};


#endif /* CARCOUNTER_H_ */
