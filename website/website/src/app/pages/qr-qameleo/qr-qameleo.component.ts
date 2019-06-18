import { Component, OnInit, SimpleChanges } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { sensorVersionService } from '../sensor-version/sensor-version-service'
import * as jQuery from 'jquery';
@Component({
  selector: 'qr-qameleo',
  templateUrl: './qr-qameleo.component.html',
  styleUrls: ['./qr-qameleo.component.css']
})
export class QrQameleoComponent implements OnInit {

  PM1: number = 28;
  PM25: number = 55;
  PM10: number = 85;
  temperature: number = 12;
  humidity: number = 70;
  pmsensor;
  varTest;
  dataUrl: string = 'http://vmpams.ird.fr:8080/qameleo/airQualityIndicator?id=48';

  constructor( private sensor: sensorVersionService ) { }

  ngOnInit() {

    // jQuery.when(jQuery.getJSON(this.dataUrl)).done( function(json) {
    //   console.log(json);
    //   });

    // this.pmsensor = jQuery.getJSON(this.dataUrl).done(function(data){
    //   console.log('Dans le done :');
    //   console.log(data);
    //   this.vartest = data;
    //   });

    // console.log('Apres le done :');
    // console.log(this.pmsensor);
    // console.log('varTest :');
    // console.log(this.varTest);
    this.setValueFromURL(this.dataUrl);

  }

  setValueFromURL(url: string){
    var $ajax = jQuery.ajax({
        type: 'GET',
        url: url,
        data: '',
        async: false,
        dataType: 'json',
        success: function(data) {
        }
    });
    this.PM1 = $ajax.responseJSON.pm1/2;
    this.PM25 = $ajax.responseJSON.pm25/2;
    this.PM10 = $ajax.responseJSON.pm10/2;
    this.temperature = $ajax.responseJSON.temperature;
    this.temperature = Math.round(this.temperature*100)/100;
    this.humidity = $ajax.responseJSON.humidity;
    this.humidity = Math.round(this.humidity*100)/100;
  }

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
