import { Component, OnInit, SimpleChanges } from '@angular/core';

import { sensorVersionService } from '../sensor-version/sensor-version-service'

@Component({
  selector: 'qr-qameleo',
  templateUrl: './qr-qameleo.component.html',
  styleUrls: ['./qr-qameleo.component.css']
})
export class QrQameleoComponent implements OnInit {

  PM1_value: number = 28;
  PM25_value: number = 55;
  PM10_value: number = 85;
  PM_value: number = 45;

  constructor(
    private sensor: sensorVersionService
  ) { }

  ngOnInit() {
    this.PM_value = Number(this.sensor.getSensors());
  }

  ngOnChanges(changes: SimpleChanges){
    this.PM_value = changes[this.PM_value].currentValue;
  }
}
