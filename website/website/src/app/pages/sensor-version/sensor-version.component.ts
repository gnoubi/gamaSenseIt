import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';

import {SensorVersion} from '../../SensorVersion';
import {StockCapteurArr} from '../../stock-capteur';


// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../variables/charts";
import { from } from 'rxjs';

@Component({
  selector: 'page-sensor-version',
  templateUrl: './sensor-version.component.html',
  styleUrls: ['./sensor-version.component.scss']
})
export class SensorVersionPage implements OnInit {

  sensors : Array<SensorVersion> = StockCapteurArr;
  displaySensor;
  constructor() { }
  ngOnInit() {
      this.initSensor();
     }
  sensorDisplay(s:SensorVersion ){
    this.displaySensor=s;
  }
  initSensor(){
    this.displaySensor = new SensorVersion(0,'','','',[]);
  }
}
