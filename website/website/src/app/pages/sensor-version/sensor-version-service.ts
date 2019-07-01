// list des sensors available for read and update
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { API_URLS } from '../../config/api.url.config';
import { MesuredParameter } from '../../MesuredParameter';
import { Sensor } from '../../sensor';
import { SensorVersion } from '../../SensorVersion';

@Injectable()
export class sensorVersionService {
  constructor(private http: HttpClient){

  }

  getData(): Observable<any> {
      return this.http.get(API_URLS.SENSOR_DATA);
  }

  getSensors(): Observable<any>{
      return this.http.get(API_URLS.SENSORS);
  }

  loadSensors(): Array<Sensor> {
    let sensors: Array<Sensor> = [];
    this.getSensors().
      subscribe(
        (data: Array<Sensor>) => {
          for(let sensor of data) {
            sensors.push(JSON.parse(JSON.stringify(sensor)));
          }
        },
        error => { console.log('error was occured') }
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

  loadSensorTypes(): Array<SensorVersion> {
    let sensorTypes: Array<SensorVersion> = [];
    this.getSensorTypes().
      subscribe(
        (data: Array<SensorVersion>) => {
          for(let sensor of data) {
            sensorTypes.push(JSON.parse(JSON.stringify(sensor)));
          }
        },
        error => { console.log('error was occured') }
      );
    return sensorTypes;
  }

  getSensorMetaDataParameters(metadataId: number): Observable<any> {
    let link = API_URLS.META_DATA_SENSOR_META_DATA_ID;
    link += "?metadataId="+metadataId;
      return this.http.get(link);
  }

  loadSensorMetaDataParameters(metadataId: number): Array<MesuredParameter> {
    let metaData: Array<MesuredParameter> = [];
    this.getSensorMetaDataParameters(metadataId).
      subscribe(
        (data: Array<MesuredParameter>) => {
          for (let parameter of data) {
            metaData.push(parameter);
          }
        },
        error => { console.log('error was occured') }
      );
      return metaData;
  }

  getMetaData(): Observable<any> {
    return this.http.get(API_URLS.META_DATA);
  }

  loadMetaData(): Array<MesuredParameter> {
    let metaData: Array<MesuredParameter> = [];
    this.getMetaData().
      subscribe(
        (data: Array<MesuredParameter>) => {
          for(let parameter of data) {
            metaData.push(JSON.parse(JSON.stringify(parameter)));
          }
        },
        error => { console.log('error was occured') }
      );
    return metaData;
  }

  getMetaDataId(parameterId: number): Observable<any> {
    let link = API_URLS.META_DATA_ID;
    link += "?parameterId="+parameterId;
    return this.http.get(link);
  }

  loadMetaDataId(parameterId: number): Array<MesuredParameter> {
    let metaData: Array<MesuredParameter> = [];
    this.getMetaDataId(parameterId).
      subscribe(
        (data: MesuredParameter) => { metaData.push(data) },
        error => { console.log('error was occured') }
      );
    return metaData;
  }

  getSensorsBetween(): Observable<any> {
      return null;
  }

  getSince(): Observable<any> {
      return null;
  }

  getDefaultDataSeparator(): Observable<any> {
    return this.http.get(API_URLS.DEFAULT_DATA_SEPARATOR,
      {responseType: 'text'});
  }

  updateSensor(s): Observable<any> {
      var link = API_URLS.UPDATE_SENSOR;
      link+='?sensorID='+s+'&name='+s+'&longitude='+s+'&latitude='+s;
      console.log(link);
      return this.http.put(link,null);
  }

  /*deleteSensor(s):Observable<any>{
      return this.http.delete(API_URLS.TEST);
  }*/

  initSensorType(): SensorVersion {
    let displaySensorType: SensorVersion = new SensorVersion(0, '', '', '', '');
    return displaySensorType;
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

  initSensor(): Sensor {
    let displaySensor: Sensor = new Sensor(0, '', 0,0,0,'');
    return displaySensor;
  }

  //updateSensor(s) {
       /* this.sensorService.updateSensor(s).subscribe(
          res => {
            this.loadSensor();
          }
        );*/
  //}

  deleteSensor(s) {
    /*this.sensorService.deleteSensor(s)
      .subscribe(
        res=>{
          this.loadSensor();
        }
      );*/
  }
}
