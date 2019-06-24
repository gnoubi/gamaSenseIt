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

    getData():Observable<any>{
        return this.http.get(API_URLS.SENSOR_DATA);
    }

    getSensorsNames():Observable<any>{
        return this.http.get(API_URLS.ALL_SENSORS);
    }

    getSensorTypeNames():Observable<any>{
        return this.http.get(API_URLS.SENSOR_META_DATA_FULLNAMES);
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
        console.log(link);
        return this.http.put(link,null);
    }

    /*deleteSensor(s):Observable<any>{

        return this.http.delete(API_URLS.TEST);
    }*/
}
