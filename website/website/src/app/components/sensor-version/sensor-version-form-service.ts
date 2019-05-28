import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {API_URLS} from '../../config/api.url.config'; 
import { Sensor } from '../../sensor';
// all Form add to a Database new Sensor.. SensorView and Metadata

@Injectable()
export class sensorVersionFormService {
    constructor(private http: HttpClient){

    }


    addSensor(s:Sensor):Observable<any>{
        return this.http.post(API_URLS.ADD_SENSOR,s);
    }

    addMetaData(m):Observable<any>{
        return this.http.post(API_URLS.ADD_SENSOR_METADATA,m);
    }

    addParameterMetaData():Observable<any>{
        return this.http.post(API_URLS.ADD_PARAMETER_META_DATA,null);
    }
}