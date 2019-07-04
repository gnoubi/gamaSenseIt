import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import {API_URLS} from '../../config/api.url.config';
import { Sensor } from '../../Sensor';
import { SensorVersion } from '../../SensorVersion';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    //'Authorization': 'my-auth-token',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable()
export class SensorVersionFormService {
    constructor(private http: HttpClient){
    }

    addSensor(
      sensorName: string,
      sensorDisplayName: string,
      sensorType: number,
      sensorSubDisplayName: string,
      sensorLongitude: number,
      sensorLatitude: number,
      s: Sensor): Observable<any>
    {
      let link = API_URLS.ADD_SENSOR;
      link += '?&name=' + sensorName +
              '&displayName=' + sensorDisplayName +
              '&place=' + sensorSubDisplayName+
              '&longitude=' + sensorLongitude +
              '&latitude=' + sensorLatitude +
              '&sensormetadata=' + sensorType;
      return this.http.post(link,s,httpOptions);
    }

    addSensorMetaData(
      metaDataName: string,
      metaDataVersion: string,
      metaDataSeparator: string,
      metaMeasuredDataOrder: string,
      sensorDescription: string,
      sm: SensorVersion): Observable<any>
    {
      let link = API_URLS.ADD_SENSOR_METADATA;
      link += '?&name=' + metaDataName +
              '&version=' + metaDataVersion +
              '&dataSeparator=' + metaDataSeparator +
              '&measuredDataOrder=' + metaMeasuredDataOrder
              '&description=' + sensorDescription;
      return this.http.post(link,sm,httpOptions);
    }

    // Creer d'abord le formulaire
    addParameterMetaData(): Observable<any> {
      let link = API_URLS.ADD_PARAMETER_META_DATA;
      return this.http.post(link,null,httpOptions);
    }
}
