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

    getSensors():Observable<any>{
        return this.http.get(API_URLS.SENSORS);
    }

    getSensorsNames():Observable<any>{
        return this.http.get(API_URLS.SENSORS_NAMES);
    }

    getSensorType():Observable<any>{
        return this.http.get(API_URLS.SENSOR_META_DATA);
    }

    getSensorParameter(metadataId: number):Observable<any>{
      let link = API_URLS.SENSOR_META_DATA_ID;
      link += "?metadataId="+metadataId;
        return this.http.get(link);
    }

    getSensorTypeNames():Observable<any>{
        return this.http.get(API_URLS.SENSOR_META_DATA_FULLNAMES);
    }

    getMetaData(){
      return this.http.get(API_URLS.META_DATA);
    }

    getMetaDataId(parameterId: number){
      let link = API_URLS.META_DATA_ID;
      link += "?parameterId="+parameterId;
      return this.http.get(link);
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
