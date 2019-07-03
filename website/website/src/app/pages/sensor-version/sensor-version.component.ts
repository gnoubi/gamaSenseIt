import { Component, OnInit } from '@angular/core';

import { SensorVersion } from '../../SensorVersion';
import { SensorVersionService } from './sensor-version-service';
import { Sensor } from '../../sensor';
import { MesuredParameter } from '../../MesuredParameter';

@Component({
  selector: 'page-sensor-version',
  templateUrl: './sensor-version.component.html',
  styleUrls: ['./sensor-version.component.scss']
})
export class SensorVersionPage implements OnInit {

  sensorTypes: SensorVersion[];
  sensors: Sensor[];
  displaySensorType: SensorVersion;
  sensorTypeUpdate: SensorVersion;
  sensorTypeDelete: SensorVersion;
  operationType: String = 'details';
  displaySensor: Sensor;
  sensorUpdate: Sensor;
  sensorDelete: Sensor;
  operationSensor: String = 'details';
  sensors1: any;
  metaData: MesuredParameter[];

  constructor(private sensorService: SensorVersionService) { }

  ngOnInit() {
    this.sensors = this.sensorService.loadSensors();
    this.sensorTypes = this.sensorService.loadSensorTypes();
    this.displaySensorType = this.sensorService.initSensorType();
    this.displaySensor = this.sensorService.initSensor();
    this.metaData = this.sensorService.loadMetaData();
  }

  metaDataParameters(sensorType: SensorVersion): MesuredParameter[] {
    if (sensorType.measuredDataOrder) {
      let splitedDataOrder: string[] = sensorType.measuredDataOrder.
        split(sensorType.dataSeparator);
      splitedDataOrder.pop();
      let dataOrderId: number[] = [];
      let parameter: MesuredParameter[] = [];
      splitedDataOrder.forEach(
        (element: string) => { dataOrderId.push( Number(element) ) });
      for (let id of dataOrderId) {
        for (let md of this.metaData) {
          if (md.id === id) {
            parameter.push(md);
          }
        }
      }
      return parameter;
    } else {
      return undefined;
    }
  }

}
