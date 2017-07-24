/*
 * CarCounter.cpp
 *
 *  Created on: 23 juil. 2017
 *      Author: nicolas
 */

#include "CarCounter.h"


#include <mutex>
#include <thread>


CarCounter::CarCounter() {
	endOfWay = 0;
	lastDistance = 0;
	mesuredDistance = new MeasuredDistance[BUFFER_SIZE];
	this->carArrival = new CarArrival[BUFFER_SIZE];
	measureReadIndex = 0;
	measureWriterIndex = 0;
	this->carReadIndex = 0;
	this->carWriterIndex = 0;
	isStarting = false;
}


CarCounter::~CarCounter() {
	// TODO Auto-generated destructor stub
}

MeasuredDistance CarCounter::getDistanceData()
{
	if(this->measureReadIndex == this->measureWriterIndex)
		return MeasuredDistance();
	return this->mesuredDistance[(measureReadIndex++)%BUFFER_SIZE];
}

bool CarCounter::hasMoreDistanceData()
{
	return this->measureReadIndex != this->measureWriterIndex;
}

void CarCounter::pushDistanceData(int distance)
{
	this->mesuredDistance[measureWriterIndex].distance = distance;
	this->mesuredDistance[measureWriterIndex].captureDate =  std::chrono::high_resolution_clock::now();
	measureWriterIndex++;
}


CarArrival CarCounter::getArrivalData()
{
	if(this->carReadIndex == this->carWriterIndex)
		return CarArrival();
	return this->carArrival[(carReadIndex++)%BUFFER_SIZE];
}

bool CarCounter::hasMoreArrivalData()
{
	return this->carReadIndex != this->carWriterIndex;
}

void CarCounter::stop()
{
	this-> isStarting = false;
}

void CarCounter::start()
{
	Lidar* counter= new Lidar(9);
	isStarting = true;
	while(isStarting)
	{
		int dst = counter->getLastDistance();
		if(dst < this->lastDistance + BUFFER_DISTANCE && dst > this->lastDistance - BUFFER_DISTANCE)
		{
			this->lastDistance = dst;
			this->pushDistanceData(dst);
		}

	}
}

int main()
{
	CarCounter car;

	std::thread t1([&car]() {
		car.start();
	});
	std::thread t2([&car]() {
		while(true)
		{
			if(car.hasMoreDistanceData())
			{
				MeasuredDistance m = car.getDistanceData();
				chrono::microseconds microseconds = std::chrono::duration_cast<std::chrono::microseconds>(m.captureDate);
				cout <<microseconds.count()<<"  "<<m.distance;
			}

		}

	});
}

