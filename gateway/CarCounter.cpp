/*
 * CarCounter.cpp
 *
 *  Created on: 23 juil. 2017
 *      Author: nicolas
 */

#include "CarCounter.h"


#include <mutex>
#include <thread>
#include "Lidar.h"
#include <exception>

using namespace unistd;
using namespace std;

CarCounter::CarCounter() {
	endOfWay = 0;////s
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
	//cout<<"push 1"<<endl;
	this->mesuredDistance[(measureWriterIndex++)%BUFFER_SIZE].distance = distance;
	this->mesuredDistance[(measureWriterIndex++)%BUFFER_SIZE].captureDate =  std::chrono::high_resolution_clock::now();
//	cout<<"push 2 "<<endl;
	measureWriterIndex++;
//	this->mesuredDistance[measureWriterIndex].distance = distance;
//	this->mesuredDistance[measureWriterIndex].captureDate =  std::chrono::high_resolution_clock::now();
//	measureWriterIndex++;
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

//	cout<<"c1"<<endl;
	Lidar* counter= new Lidar(9);
//	cout<<"c2"<<endl;
	isStarting = true;
//	cout<<"c3"<<endl;
	while(isStarting)
	{
//		cout<<"c4"<<endl;
		int dst = counter->getLastDistance();
		if(dst < this->lastDistance - BUFFER_DISTANCE && dst > this->lastDistance + BUFFER_DISTANCE)
		{
			this->lastDistance = dst;
			this->pushDistanceData(dst);
		}

	}
}

int main()
{

	CarCounter car;

	try
	{
	std::thread t1([&car]() {
//		std::cout<<"sfdsfdsgfgdfgfdgfds"<<endl;
		car.start();
//		cout <<" dfdsq "<<endl;
	});
	std::thread t2([&car]() {
		ofstream dictionary;
		dictionary.open("data.csv");

		while(true)
		{
			if(car.hasMoreDistanceData())
			{
				MeasuredDistance m = car.getDistanceData();
				long long tmp = m.captureDate.time_since_epoch().count();
				dictionary <<tmp<<"\t"<<m.distance<<endl;
				std::cout<<tmp<<"  "<<m.distance<<endl;
			}

		}
		dictionary.close(); //explicite
	});
	t1.join();
	t2.join();
	} catch( std::exception& e)
	{
		 ofstream edictionary;
                edictionary.open("edata.csv");
		edictionary<<e.what()<<endl;
		edictionary.close();
		std::cout<<"error"<<e.what()<<endl;
	//	std::cout<<"error"<<e<<endl;
	}

}

