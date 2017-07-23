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
	auto lastTimeUpdade;
	int lastMeasure;


	void distanceDetected();


public:
	void start();
	void stop();
	int getDistance();

	CarCounter(int pin);
	virtual ~CarCounter();
};


#endif /* CARCOUNTER_H_ */
