include radio.makefile
test: test.o arduPi.o SX1272.o
	g++ -lrt -lpthread test.o arduPi.o SX1272.o -o test

test.o: test.cpp
	gcc $(CFLAGS) -DRASPBERRY -DIS_RCV_GATEWAY -c test.cpp -o test.o

gateway: gateway.o arduPi.o SX1272.o
	g++ -lrt -lpthread gateway.o arduPi.o SX1272.o -o gateway	

gateway.o: gateway.cpp
	gcc $(CFLAGS) -DRASPBERRY -DIS_RCV_GATEWAY -c gateway.cpp -o gateway.o

arduPi.o: arduPi_pi2.cpp arduPi_pi2.h
	gcc -c arduPi_pi2.cpp -o arduPi.o	

SX1272.o: SX1272.cpp SX1272.h
	gcc -c SX1272.cpp -o SX1272.o
		
lib: arduPi.o SX1272.o gateway.o

clean:
	rm *.o gateway
