import { Component, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'qr-qameleo',
  templateUrl: './qr-qameleo.component.html',
  styleUrls: ['./qr-qameleo.component.css']
})
export class QrQameleoComponent implements OnInit {

  private PM1: number = 28;
  private PM25: number = 55;
  private PM10: number = 85;
  private temperature: number = 12;
  private humidity: number = 70;
  private url = 'http://vmpams.ird.fr:8080';

  constructor( private router: Router,
    private http: HttpClient ) { }

  ngOnInit() {
    console.log('Source prevue',this.url = this.url + this.router.url);
    this.url = 'http://vmpams.ird.fr:8080/qameleo/airQualityIndicator?id=48';
    this.initValues(this.url);
  }

  initValues(url: string){
    this.http.get(url).
      subscribe((data: PMSensor) => {
        this.PM1 = data.pm1/2;
        this.PM1 = Math.round(this.PM1*100)/100;
        this.PM25 = data.pm25/2;
        this.PM25 = Math.round(this.PM25*100)/100;
        this.PM10 = data.pm10/2;
        this.PM10 = Math.round(this.PM10*100)/100;
        this.temperature = data.temperature;
        this.temperature = Math.round(this.temperature*100)/100;
        this.humidity = data.humidity;
        this.humidity = Math.round(this.humidity*100)/100;
    });
  }

  ngOnChanges(changes: SimpleChanges){
    this.PM1 = changes[this.PM1].currentValue;
    this.PM25 = changes[this.PM25].currentValue;
    this.PM10 = changes[this.PM10].currentValue;
    this.temperature = changes[this.temperature].currentValue;
    this.humidity = changes[this.humidity].currentValue;
  }
}

interface PMSensor {
  sensorName: string;
  pm1: number;
  pm25: number;
  pm10: number;
  temperature: number;
  humidity: number;
}
