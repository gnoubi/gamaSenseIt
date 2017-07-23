/*
 * CarCounter.h
 *
 *  Created on: 23 juil. 2017
 *      Author: nicolas
 */

#ifndef CARCOUNTER_H_
#define CARCOUNTER_H_

#ifdef RASPBERRY2
#include "arduPi_pi2.h"
#else
#include "arduPi.h"
#endif
#include <iostream>
#include <chrono>

using namespace std;

class CarCounter {

private:
	int activationPin;
	int lastDistance;
	int currentDistance;
	std::chrono::high_resolution_clock::time_point lastTimeUpdade;
	int lastMeasure;




public:
	void start();
	void stop();
	int getDistance();
	void distanceDetected();
	CarCounter(int pin);
	virtual ~CarCounter();
};


#endif /* CARCOUNTER_H_ */
