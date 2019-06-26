import { Component, OnInit } from '@angular/core';

import { SensorVersion } from '../../SensorVersion';
import { sensorVersionService } from './sensor-version-service';
import { Sensor } from '../../sensor';
import { MesuredParameter } from '../../MesuredParameter';

@Component({
  selector: 'page-sensor-version',
  templateUrl: './sensor-version.component.html',
  styleUrls: ['./sensor-version.component.scss']
})
export class SensorVersionPage implements OnInit {

  sensorType: Array<SensorVersion> = new Array();
  sensors: Array<Sensor> = new Array();
  displaySensorType: SensorVersion;
  sensorTypeUpdate: SensorVersion;
  sensorTypeDelete: SensorVersion;
  operationType: String = 'details';
  displaySensor: Sensor;
  sensorUpdate: Sensor;
  sensorDelete: Sensor;
  operationSensor: String = 'details';
  sensors1: any;
  metaData: Array<MesuredParameter> = new Array();
  metaDataList: Array<MesuredParameter> = new Array();

  constructor(private sensorService: sensorVersionService) { }

  ngOnInit() {
    this.loadSensors();
    this.loadSensorType();
    this.loadMetaDataId(3);
    this.loadSensorMetaDataParameter(10);
    this.initSensorType();
    this.initSensor();
  }

  initSensorType() {
    this.displaySensorType = new SensorVersion(0, '', '', '', '');
  }

  loadSensorType() {
    this.sensorService.getSensorType().
      subscribe(
        data => {
          for(let sensor of data) {
            this.sensorType.push(JSON.parse(JSON.stringify(sensor)));
          }
        },
        error => { console.log('error was occured') }
      );
  }

  updateSensorType(s) {
       /* this.sensorService.updateSensor(s).subscribe(
          res => {
            this.loadSensor();
          }
        );*/
  }

  deleteSensorType(s) {
    /*this.sensorService.deleteSensor(s)
      .subscribe(
        res=>{
          this.loadSensor();
        }
      );*/
  }

  initSensor() {
    this.displaySensor= new Sensor(0, '', 0,0,0,'');
  }

  loadSensors() {
    this.sensorService.getSensors().
      subscribe(
        data => {
          for(let sensor of data) {
            this.sensors.push(JSON.parse(JSON.stringify(sensor)));
          }
        },
        error => { console.log('error was occured') }
      );
  }

  updateSensor(s) {
       /* this.sensorService.updateSensor(s).subscribe(
          res => {
            this.loadSensor();
          }
        );*/
  }

  deleteSensor(s) {
    /*this.sensorService.deleteSensor(s)
      .subscribe(
        res=>{
          this.loadSensor();
        }
      );*/
  }

  loadMetaDataId(parameterId: number) {
    this.sensorService.getMetaDataId(parameterId).
      subscribe(
        (data: MesuredParameter) => { this.metaData.push(data) },
        error => { console.log('error was occured') }

      );
  }

  loadSensorMetaDataParameter(metadataId: number) {
    this.sensorService.getSensorParameter(metadataId).
      subscribe(
        (data: MesuredParameter[]) => {
          for (let parameter of data) {
            this.metaDataList.push(parameter);
          }
        },
        error => { console.log('error was occured') }
      );
  }
}
