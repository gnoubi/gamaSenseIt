import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {API_URLS} from '../../config/api.url.config'; 
// all Form add to a Database new Sensor.. SensorView and Metadata

@Injectable()
export class sensorVersionFormService {
    constructor(private http: HttpClient){

    }

    getSensors():Observable<any>{
        return this.http.get(API_URLS.TEST);
    }

    addSensor():Observable<any>{
        return this.http.post(API_URLS.TEST,null);
    }

    addMetaData():Observable<any>{
        return this.http.post(API_URLS.ADD_SENSOR_METADATA,null);
    }

    addSensorView():Observable<any>{
        return this.http.post(API_URLS.UPDATE_SENSOR,null);
    }
    addParameterMetaData():Observable<any>{
        return this.http.post(API_URLS.ADD_PARAMETER_META_DATA,null);
    }
}