import { Component, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'qr-qameleo',
  templateUrl: './qr-qameleo.component.html',
  styleUrls: ['./qr-qameleo.component.css']
})
export class QrQameleoComponent implements OnInit {

  private PM1: number = 0;
  private PM25: number = 0;
  private PM10: number = 0;
  private temperature: number = 0;
  private temperatureUnit: string = "°C";
  private humidity: number = 0;
  private humidityUnit: string = "%";
  private url = 'http://vmpams.ird.fr:8080';
  public browseQRcode = true;
  private httpGetSucceed = true;

  constructor( private router: Router,
    private http: HttpClient ) { }

  ngOnInit() {
    if( this.router.url.includes('/',1)) {
      this.browseQRcode = false;
      console.log('Source prevue ?',this.url + this.router.url);
      // this.url = this.url + this.router.url;
      this.url = 'http://vmpams.ird.fr:8080/qameleo/airQualityIndicator?id=48';
      console.log('Source actuelle',this.url);
      this.initValues(this.url);
    }
  }

  initValues(url: string){
    this.http.get(url).
      subscribe((data: PMSensor) => {
        if(data) {
          this.PM1 = data.pm1/2;
          this.PM1 = Math.round(this.PM1*100)/100;
          this.PM25 = data.pm25/2;
          this.PM25 = Math.round(this.PM25*100)/100;
          this.PM10 = data.pm10/2;
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
        console.log('la');
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
        this.httpGetSucceed = false;
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
