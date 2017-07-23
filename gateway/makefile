include radio.makefile
gamaSenseIt: gamaSenseIt.o arduPi.o SX1272.o
	g++ -std=c++11 -lrt -lpthread -lpaho-mqtt3c  gamaSenseIt.o arduPi.o SX1272.o -o gamaSenseIt

carCounter: CarCounter.o arduPi.o SX1272.o
	g++ -std=c++11 -lrt -lpthread -lpaho-mqtt3c  CarCounter.o arduPi.o SX1272.o arduPi.o -o carCounter

test.o: test.cpp
	gcc -std=c++11 $(CFLAGS) -DRASPBERRY -DIS_RCV_GATEWAY -c test.cpp -o test.o

gamaSenseIt.o: GamaSenseIt.cpp GamaSenseIt.h
	gcc -std=c++11 $(CFLAGS) -DRASPBERRY -DIS_RCV_GATEWAY -c GamaSenseIt.cpp -o gamaSenseIt.o	

CarCounter.o: CarCounter.cpp CarCounter.h
	gcc -std=c++11 $(CFLAGS) -DRASPBERRY -DIS_RCV_GATEWAY -c CarCounter.cpp -o CarCounter.o	


message.o: Message.cpp Message.h
	gcc -c Message.cpp -o message.o	

arduPi.o: arduPi_pi2.cpp arduPi_pi2.h
	gcc -c arduPi_pi2.cpp -o arduPi.o	

SX1272.o: SX1272.cpp SX1272.h
	gcc -c SX1272.cpp -o SX1272.o
		
lib: arduPi.o SX1272.o gamaSenseIt.o

clean:
	rm *.o gateway gamaSenseIt test
