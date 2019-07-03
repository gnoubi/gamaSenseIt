import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import {API_URLS} from '../../config/api.url.config';
import { Sensor } from '../../Sensor';

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
      sensorPlace: string,
      sensorLongitude: number,
      sensorLatitude: number,
      sensorDescription: string,
      s:Sensor): Observable<any>
    {
      let link = API_URLS.ADD_SENSOR;
      link += '?&name=' + sensorName +
              '&displayName=' + sensorDisplayName +
              '&place=' + sensorPlace +
              '&longitude=' + sensorLongitude +
              '&latitude=' + sensorLatitude +
              '&sensormetadata=' + sensorType
              '&description=' + sensorDescription;
      return this.http.post(link,s,httpOptions);
    }

    addMetaData(
      metaDataName,
      metaDataVersion,
      metaDataSeparator,
      metaMeasuredDataOrder,
      m): Observable<any>
    {
      let link = API_URLS.ADD_SENSOR_METADATA;
      link += '?&name=' + metaDataName +
              '&version=' + metaDataVersion +
              '&dataSeparator=' + metaDataSeparator +
              '&measuredDataOrder=' + metaMeasuredDataOrder;
      return this.http.post(link,m,httpOptions);
    }

    // Creer d'abord le formulaire
    addParameterMetaData(): Observable<any> {
      let link = API_URLS.ADD_PARAMETER_META_DATA;
      return this.http.post(link,null,httpOptions);
    }
}
