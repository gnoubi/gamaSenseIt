import { Component, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

interface PMSensor {
  sensorName: string;
  pm1: number;
  pm25: number;
  pm10: number;
  temperature: number;
  humidity: number;
}

@Component({
  selector: 'qr-qameleo',
  templateUrl: './qr-qameleo.component.html',
  styleUrls: ['./qr-qameleo.component.scss']
})
export class QrQameleoComponent implements OnInit {

  PM1_THRESHOLD: number = 25;
  PM2_5_THRESHOLD: number = 25;
  PM10_THRESHOLD: number = 50;

  private PM1: number = 0;
  private PM25: number = 0;
  private PM10: number = 0;
  private PMUnit: string = "μg/m³";
  private temperature: number = 0;
  private temperatureUnit: string = "°C";
  private humidity: number = 0;
  private humidityUnit: string = "%";
  private url = 'http://vmpams.ird.fr:8080';
  public browseQRcode = true;
  private httpGetSucceed = true;

  constructor(private router: Router, private http: HttpClient,) { }

  ngOnInit() {
    if( this.router.url !== '/qameleo') {
      this.browseQRcode = false;
      let i = this.router.url.lastIndexOf('/') + 1;
      this.url = this.url + this.router.url.slice(0,i) +
        'airQualityIndicator?id=' + this.router.url.slice(i);
      this.initValues(this.url);
    }
  }

  initValues(url: string){
    this.http.get(url).subscribe(
      (data: PMSensor) => {
        if (data) {
          this.PM1 = data.pm1/this.PM1_THRESHOLD;
          this.PM1 = Math.round(this.PM1*100)/100;
          this.PM25 = data.pm25/this.PM2_5_THRESHOLD;
          this.PM25 = Math.round(this.PM25*100)/100;
          this.PM10 = data.pm10/this.PM10_THRESHOLD;
          this.PM10 = Math.round(this.PM10*100)/100;
          this.temperature = data.temperature;
          this.temperature = Math.round(this.temperature);
          this.humidity = data.humidity;
          this.humidity = Math.round(this.humidity);
        } else {
          this.httpGetSucceed = false;
        }
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          console.log('An error occurred in initValues:', err.error.message);
        } else {
          console.log(`Backend returned code ${err.status},
            body was: ${err.error}`);
        }
        this.httpGetSucceed = false;
      }
    );
  }

  // ngOnChanges(changes: SimpleChanges){
  //   this.PM1 = changes[this.PM1].currentValue;
  //   this.PM25 = changes[this.PM25].currentValue;
  //   this.PM10 = changes[this.PM10].currentValue;
  //   this.temperature = changes[this.temperature].currentValue;
  //   this.humidity = changes[this.humidity].currentValue;
  // }
}
