// list des sensors available for read and update 
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {API_URLS} from '../../config/api.url.config'; 
// all Form add to a Database new Sensor.. SensorView and Metadata

@Injectable()
export class sensorVersionService {
    constructor(private http: HttpClient){

    }

    getSensors():Observable<any>{
        return this.http.get(API_URLS.SENSOR_DATA_URL);
    }

    updateSensor(s):Observable<any>{
        return this.http.put(API_URLS.UPDATE_SENSOR,null);
    }

    deleteSensor(s):Observable<any>{
        return this.http.delete(API_URLS.TEST);
    }
}