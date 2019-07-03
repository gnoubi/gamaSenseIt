// list des sensors available for read and update
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URLS } from '../../config/api.url.config';
import { MesuredParameter } from '../../MesuredParameter';
import { Sensor } from '../../Sensor';
import { SensorVersion } from '../../SensorVersion';

@Injectable()
export class SensorVersionService {

  constructor(private http: HttpClient) { }

  getData(): Observable<any> {
      return this.http.get(API_URLS.SENSOR_DATA);
  }

  getSensorById(sensorId): Observable<any> {
    let link = API_URLS.SENSOR;
    link += "?sensorId=" + sensorId;
    return this.http.get(link);
  }

  loadSensorId(sensorId: number): Sensor[] {
    let sensor: Sensor[] = [];
    this.getSensorById(sensorId).subscribe(
      (data: Sensor) => {
        sensor.push(data);
      },
      error => {
        console.log('error was occured in loadSensorId');
      }
    );
    return sensor;
  }

  getSensors(): Observable<any> {
      return this.http.get(API_URLS.SENSORS);
  }

  loadSensors(): Sensor[] {
    let sensors: Sensor[] = [];
    this.getSensors().subscribe(
      (data: Sensor[]) => {
        for (let sensor of data) {
          sensors.push(JSON.parse(JSON.stringify(sensor)));
        }
      },
      error => {
        console.log('error was occured in loadSensors');
      }
    );
    return sensors;
  }

  getSensorsNames(): Observable<any> {
      return this.http.get(API_URLS.SENSORS_NAMES);
  }

  getSensorTypeNames(): Observable<any> {
      return this.http.get(API_URLS.SENSOR_META_DATA_FULLNAMES);
  }

  getSensorTypes(): Observable<any> {
      return this.http.get(API_URLS.SENSOR_META_DATA);
  }

  loadSensorTypes(): SensorVersion[] {
    let sensorTypes: SensorVersion[] = [];
    this.getSensorTypes().subscribe(
      (data: SensorVersion[]) => {
        for (let sensor of data) {
          sensorTypes.push(JSON.parse(JSON.stringify(sensor)));
        }
      },
      error => {
        console.log('error was occured in loadSensorTypes');
      }
    );
    return sensorTypes;
  }

  getSensorMetaDataParameters(metadataId: number): Observable<any> {
    let link = API_URLS.META_DATA_SENSOR_META_DATA_ID;
    link += "?metadataId=" + metadataId;
    return this.http.get(link);
  }

  loadSensorMetaDataParameters(metadataId: number): MesuredParameter[] {
    let metaData: MesuredParameter[] = [];
    this.getSensorMetaDataParameters(metadataId).subscribe(
      (data: MesuredParameter[]) => {
        for (let parameter of data) {
          metaData.push(parameter);
        }
      },
      error => {
        console.log('error was occured in loadSensorMetaDataParameters');
      }
    );
    return metaData;
  }

  getMetaData(): Observable<any> {
    return this.http.get(API_URLS.META_DATA);
  }

  loadMetaData(): MesuredParameter[] {
    let metaData: MesuredParameter[] = [];
    this.getMetaData().subscribe(
      (data: MesuredParameter[]) => {
        for(let parameter of data) {
          metaData.push(JSON.parse(JSON.stringify(parameter)));
        }
      },
      error => {
        console.log('error was occured in loadMetaData');
      }
    );
    return metaData;
  }

  getMetaDataId(parameterId: number): Observable<any> {
    let link = API_URLS.META_DATA_ID;
    link += "?parameterId=" + parameterId;
    return this.http.get(link);
  }

  loadMetaDataId(parameterId: number): MesuredParameter[] {
    let metaData: MesuredParameter[] = [];
    this.getMetaDataId(parameterId).subscribe(
      (data: MesuredParameter) => {
        metaData.push(data)
      },
      error => {
        console.log('error was occured in loadMetaDataId');
      }
    );
    return metaData;
  }

  // TODO
  getSensorsBetween(): Observable<any> {
      return undefined;
  }

  // TODO
  getSince(): Observable<any> {
      return undefined;
  }

  getDefaultDataSeparator(): Observable<any> {
    return this.http.get(API_URLS.DEFAULT_DATA_SEPARATOR,
      {responseType: 'text'});
  }

  initSensor(): Sensor {
    let displaySensor: Sensor = new Sensor(0,'', '','',0,0,0,'','');
    return displaySensor;
  }

  initSensorType(): SensorVersion {
    let displaySensorType: SensorVersion = new SensorVersion(0, '', '', '', '');
    return displaySensorType;
  }

  // TODO

  // updateSensor(s): Observable<any> {
  //   var link = API_URLS.UPDATE_SENSOR;
  //   link += '?sensorID=' + s +
  //           '&name=' + s +
  //           '&longitude=' + s +
  //           '&latitude=' + s;
  //   console.log(link);
  //   return this.http.put(link,null);
  // }

  // deleteSensor(s): Observable<any> {
  //   return this.http.delete(API_URLS.TEST);
  // }

  // updateSensorType(s) {
  //   this.sensorService.updateSensor(s).subscribe(
  //     res => {
  //       this.loadSensor();
  //     }
  //   );
  // }

  // deleteSensorType(s) {
  //   this.sensorService.deleteSensor(s).subscribe(
  //     res => {
  //       this.loadSensor();
  //     }
  //   );
  // }

  // updateSensor(s) {
  //   this.sensorService.updateSensor(s).subscribe(
  //     res => {
  //       this.loadSensor();
  //     }
  //   );
  // }

  // deleteSensor(s) {
  //   this.sensorService.deleteSensor(s).subscribe(
  //     res => {
  //       this.loadSensor();
  //     }
  //   );
  // }
}
