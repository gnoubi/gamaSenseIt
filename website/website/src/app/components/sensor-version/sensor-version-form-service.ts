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

    addSensor(sensorName,sensorType,sensorLongitude,sensorLatitude,s:Sensor):Observable<any>{
        let link =API_URLS.ADD_SENSOR;
        link+='?&name='+sensorName+'&longitude='+sensorLongitude+'&latitude='+sensorLatitude+'&sensormetadata='+sensorType;
        return this.http.post(link,s);
    }

    addMetaData(metaDataName,metaDataVersion,metaDataSeparator,metaMeasuredDataOrder,m):Observable<any>{
        let link = API_URLS.ADD_SENSOR_METADATA;
        link+='?&name='+metaDataName+'&version='+metaDataVersion+'&dataSeparator='+metaDataSeparator+'&measuredDataOrder='+metaMeasuredDataOrder;
        return this.http.post(link,m);
    }
    // Creer d'abord le formulaire
    addParameterMetaData():Observable<any>{
        let link =API_URLS.ADD_PARAMETER_META_DATA;
        return this.http.post(link,null);
    }
}
