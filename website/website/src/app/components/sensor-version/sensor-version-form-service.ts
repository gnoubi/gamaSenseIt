import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import {API_URLS} from '../../config/api.url.config';
import { Sensor } from '../../sensor';

const httpOptions = {
  headers: new HttpHeaders({
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    //'Authorization': 'my-auth-token',
    'Access-Control-Allow-Origin': '*'
  })
};

@Injectable()
export class sensorVersionFormService {
    constructor(private http: HttpClient){

    }

    addSensor(sensorName,sensorType,sensorLongitude,sensorLatitude,s:Sensor):Observable<any>{
        let link =API_URLS.ADD_SENSOR;
        link+='?&name='+sensorName+'&longitude='+sensorLongitude+'&latitude='+sensorLatitude+'&sensormetadata='+sensorType;
        return this.http.post(link,s,httpOptions);
    }

    addMetaData(metaDataName,metaDataVersion,metaDataSeparator,metaMeasuredDataOrder,m):Observable<any>{
        let link = API_URLS.ADD_SENSOR_METADATA;
        link+='?&name='+metaDataName+'&version='+metaDataVersion+'&dataSeparator='+metaDataSeparator+'&measuredDataOrder='+metaMeasuredDataOrder;
        return this.http.post(link,m,httpOptions);
    }
    // Creer d'abord le formulaire
    addParameterMetaData():Observable<any>{
        let link =API_URLS.ADD_PARAMETER_META_DATA;
        return this.http.post(link,null,httpOptions);
    }
}
