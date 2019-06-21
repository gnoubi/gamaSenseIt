import { Component, OnInit, Input } from '@angular/core';
import { SensorVersion } from '../../SensorVersion';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { sensorVersionFormService } from './sensor-version-form-service';
import { DataParameter, dataParameterToString } from '../../Enums';
import { range } from 'lodash';

@Component({
  selector: 'app-sensor-version',
  templateUrl: './sensor-version.component.html',
  styleUrls: ['./sensor-version.component.css']
})
export class SensorVersionComponent implements OnInit {
  @Input() sensorVersion: SensorVersion;
  SensorView: FormGroup;
  newSensor: FormGroup;
  metaData: FormGroup;
  metaDataParam: FormGroup;
  myrange= range(7);
  stringParameter: string[];

  constructor(private fb: FormBuilder, private sensorFormService: sensorVersionFormService) {

    this.newSensor = this.fb.group({
      name: [''],
      version: [''],
      type: [''],
      longitude: [''],
      latitude: [''],
    });
    // this.metaData = this.fb.group({
    //   Name: [''],
    //   version: [''],
    //   separator: [''],
    // });
    this.metaDataParam = this.fb.group({
      name:[''],
      version: [''],
      separator: [''],
      measuredParameter:['']
    });
    this.stringParameter = this.stringDataParemeter()
  }

  onAddNewSensor() {
    console.log('Add New Sensor appelee');
    let sensorName = this.newSensor.get('Name').value;
    let sensorType = this.newSensor.get('type').value;
    let sensorLongitude = this.newSensor.get('longitude').value;
    let sensorLatitude = this.newSensor.get('latitude').value;
    let s = this.newSensor.value;
    this.sensorFormService.addSensor(sensorName, sensorType, sensorLongitude, sensorLatitude, s).subscribe(
      res => {
        console.log('Ajout effectuer');
        //load Sensor
      });
    // Appeler le service ajouter dans la base
  }

  onAddMetaData() {
    console.log('Add MetaData appelee');
    let metaDataName = this.metaData.get('Name').value;
    let metaDataVersion = this.metaData.get('version').value;
    let metaDataSeparator = this.metaData.get('separator').value;
    let m = this.metaData.value;
    this.sensorFormService.addMetaData(metaDataName, metaDataVersion, metaDataSeparator, m).subscribe(
      res => {
        console.log();
      });
    //ajouter dans la base
  }

  addMetaDataParam() {
    console.log('MetaData Param function  ');
    let name = '';
    let measuredParam = '';
  }

  ngOnInit() {

  }

  stringDataParemeter(): string[]{
    let res: string[] = new Array();
    for(var i = 0; i<7; i++){
      res.push(dataParameterToString(i));
    }
    return res;
  }
}
