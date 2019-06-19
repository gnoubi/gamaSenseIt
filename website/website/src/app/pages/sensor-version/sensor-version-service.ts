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
        // console.log(API_URLS.SENSOR_DATA_URL);
        return this.http.get(API_URLS.SENSOR_DATA_URL);
    }

    getSensorsBetween():Observable<any>{
        return null;
    }

    getSince():Observable<any>{
        return null;
    }

    updateSensor(s):Observable<any>{
        var link = API_URLS.UPDATE_SENSOR;
        link+='?sensorID='+s+'&name='+s+'&longitude='+s+'&latitude='+s;
        return this.http.put(link,null);
    }

    /*deleteSensor(s):Observable<any>{

        return this.http.delete(API_URLS.TEST);
    }*/
}
