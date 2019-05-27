import { Component, OnInit } from '@angular/core';

import { SensorVersion } from '../../SensorVersion';
import { StockCapteurArr } from '../../stock-capteur';
import { sensorVersionService } from './sensor-version-service';


@Component({
  selector: 'page-sensor-version',
  templateUrl: './sensor-version.component.html',
  styleUrls: ['./sensor-version.component.scss']
})
export class SensorVersionPage implements OnInit {

  sensors: Array<SensorVersion> = StockCapteurArr;
  displaySensor;
  operation:String = 'details';
  sensors1: any;
 
  constructor(private sensorService: sensorVersionService) { }

  ngOnInit() {
    this.initSensor();
  }

  sensorDisplay(s: SensorVersion) {
    this.displaySensor = s;
  }

  initSensor() {
    this.displaySensor = new SensorVersion(0, '', '', '', []);
    /*this.sensorService.getSensors().subscribe(
      data => { this.sensors1 = data },
      error => { console.log('error was occured') },
      () => { console.log('Donnees bien chargee') }
    );*/

  }
  updateSensor() {
    this.sensorService.updateSensor().subscribe(
      res => {
        this.initSensor();
      }
    );
  }
}