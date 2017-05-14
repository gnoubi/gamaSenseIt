include radio.makefile
test: test.o arduPi.o SX1272.o
	g++ -lrt -lpthread -lpaho-mqtt3c  test.o arduPi.o SX1272.o -o test

test.o: test.cpp
	gcc $(CFLAGS) -DRASPBERRY -DIS_RCV_GATEWAY -c test.cpp -o test.o

gateway: gateway.o arduPi.o SX1272.o
	g++ -lrt -lpthread gateway.o arduPi.o SX1272.o -o gateway	

gamaSenseIt: gamaSenseIt.o main.o arduPi.o SX1272.o
	g++ -lrt -lpthread gamaSenseIt.o main.o arduPi.o SX1272.o -o gamaSenseIt	

gateway.o: gateway.cpp
	gcc $(CFLAGS) -DRASPBERRY -DIS_RCV_GATEWAY -c gateway.cpp -o gateway.o

gamaSenseIt.o: GamaSenseIt.cpp GamaSenseIt.h
	gcc -c GamaSenseIt.cpp -o GamaSenseIt.o	

message.o: Message.cpp Message.h
	gcc -c Message.cpp -o message.o	

main.o: main.cpp
	gcc -c main.cpp -o main.o	

arduPi.o: arduPi_pi2.cpp arduPi_pi2.h
	gcc -c arduPi_pi2.cpp -o arduPi.o	

SX1272.o: SX1272.cpp SX1272.h
	gcc -c SX1272.cpp -o SX1272.o
		
lib: arduPi.o SX1272.o gateway.o

clean:
	rm *.o gateway gamaSenseIt test
