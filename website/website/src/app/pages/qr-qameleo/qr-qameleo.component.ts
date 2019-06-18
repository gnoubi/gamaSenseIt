import { Component, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import * as jQuery from 'jquery';

import { sensorVersionService } from '../sensor-version/sensor-version-service'

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
  private pmsensor;
  private test;
  private url = 'http://vmpams.ird.fr:8080';

  constructor( private sensor: sensorVersionService,
    private router: Router,
    private http: HttpClient ) { }

  ngOnInit() {
    console.log('Source prevue',this.url = this.url + this.router.url);
    this.url = 'http://vmpams.ird.fr:8080/qameleo/airQualityIndicator?id=48';

    this.http.get(this.url).
      subscribe((data: PMSensor) => {
        this.test = data;
        this.PM1 = data.pm1/2;
        this.PM1 = data.pm1/2;
        this.PM25 = data.pm25/2;
        this.PM10 = data.pm10/2;
        this.temperature = data.temperature;
        this.temperature = Math.round(this.temperature*100)/100;
        this.humidity = data.humidity;
        this.humidity = Math.round(this.humidity*100)/100;
      });
  }

  // setValueFromURL(url: string){
  //   var $ajax = jQuery.ajax({
  //     type: 'GET',
  //     url: url,
  //     data: '',
  //     async: false,
  //     dataType: 'json',
  //     success: function(data) {
  //     }
  //   });
  //   this.PM1 = $ajax.responseJSON.pm1/2;
  //   this.PM25 = $ajax.responseJSON.pm25/2;
  //   this.PM10 = $ajax.responseJSON.pm10/2;
  //   this.temperature = $ajax.responseJSON.temperature;
  //   this.temperature = Math.round(this.temperature*100)/100;
  //   this.humidity = $ajax.responseJSON.humidity;
  //   this.humidity = Math.round(this.humidity*100)/100;
  // }

  ngOnChanges(changes: SimpleChanges){
    this.PM1 = changes[this.PM1].currentValue;
    this.PM25 = changes[this.PM25].currentValue;
    this.PM10 = changes[this.PM10].currentValue;
    this.temperature = changes[this.temperature].currentValue;
    this.humidity = changes[this.humidity].currentValue;
  }
}

export interface PMSensor {
  sensorName: string;
  pm1: number;
  pm25: number;
  pm10: number;
  temperature: number;
  humidity: number;
}
