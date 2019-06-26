import { Component, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { range, remove } from 'lodash';

import { SensorVersion } from '../../SensorVersion';
import { sensorVersionService } from '../../pages/sensor-version/sensor-version-service';
import { sensorVersionFormService } from './sensor-version-form-service';
import { DataParameter,
  dataParameterToString}
  from '../../Enums';
import { MesuredParameter } from '../../MesuredParameter';

@Component({
  selector: 'app-sensor-version',
  templateUrl: './sensor-version.component.html',
  styleUrls: ['./sensor-version.component.css']
})
export class SensorVersionComponent {
  @Input() sensorVersion: SensorVersion;
  SensorView: FormGroup;
  newSensor: FormGroup;
  newSensorMetaData: FormGroup;
  separator: string = ':';
  typeList: string[];
  metaData: Array<MesuredParameter>;
  iconList: string[] = [
    "",
    "",
    "",
    "fab fa-cloudversify",
    "fab fa-cloudversify",
    "fab fa-cloudversify",
    "fas fa-tint",
    "fas fa-thermometer-three-quarters",
    "",
    "",
    "",
    "fas fa-tint",
    "fas fa-thermometer-three-quarters",
  ];

  constructor(private fb: FormBuilder,
              private sensorFormService: sensorVersionFormService,
              private sensorService: sensorVersionService)
  {
    this.newSensor = this.fb.group({
      name: [''],
      type: [''],
      longitude: [''],
      latitude: [''],
    });
    this.newSensorMetaData = this.fb.group({
      name:[''],
      version: [''],
      separator: [''],
      measuredDataOrder: ['']
    });
    this.metaData = new Array();
    this.loadMetaData();
    this.sensorService.getSensorTypeNames().
      subscribe( (res) => { this.typeList = res } );
  }

  onAddNewSensor() {
    let sensorName = this.newSensor.get('name').value;
    let sensorType = this.newSensor.get('type').value;
    let sensorLongitude = this.newSensor.get('longitude').value;
    let sensorLatitude = this.newSensor.get('latitude').value;
    let s = this.newSensor.value;
    this.sensorFormService.addSensor(sensorName, sensorType, sensorLongitude, sensorLatitude, s).
      subscribe( res => {
        console.log('Ajout effectue');
      });
    this.newSensor.reset({
      name: [''],
      type: [''],
      longitude: [''],
      latitude: [''],
    });
  }

  onAddNewSensorMetaData() {
    let sensorMetaDataName = this.newSensorMetaData.get('name').value;
    let sensorMetaDataVersion = this.newSensorMetaData.get('version').value;
    let sensorMetaDataSeparator = "";
    if (this.newSensorMetaData.get('separator').value) {
      sensorMetaDataSeparator = this.newSensorMetaData.get('separator').value;
    } else {
      sensorMetaDataSeparator = this.separator;
    }
    let metaMeasuredDataOrder = this.newSensorMetaData.get('measuredDataOrder').value;
    let m = this.newSensorMetaData.value;
    this.sensorFormService.addMetaData(sensorMetaDataName, sensorMetaDataVersion, sensorMetaDataSeparator,metaMeasuredDataOrder, m).
      subscribe(res => {
        console.log('Ajout effectue');
      });
    this.newSensorMetaData.reset({
      name:[''],
      version: [''],
      separator: [''],
      measuredDataOrder: ['']
    });
  }

  addMetaDataParam() {
    console.log('MetaData Param function  ');
    let name = '';
    let measuredParam = '';
  }

  addMetaData(id) {
    this.refreshSeparator();
    // test si l'élément est déjà présent
    if ( this.newSensorMetaData.get('measuredDataOrder').value.includes(id) ) {
      // si oui, on l'enlève
      this.newSensorMetaData.patchValue({
        measuredDataOrder: this.newSensorMetaData.get('measuredDataOrder').value.
          replace(id+this.newSensorMetaData.get('separator').value,"")
      });
    } else {
      // sinon, on l'ajoute
      this.newSensorMetaData.patchValue({
        measuredDataOrder: this.newSensorMetaData.get('measuredDataOrder').value +
          id + this.newSensorMetaData.get('separator').value
      });
    }
  }

  changeIcon(id){
    if (this.newSensorMetaData.get('measuredDataOrder').value.includes(id)) {
      return "icon icon-shape bg-success text-white";
    }
    return "icon icon-shape bg-gray text-white";
  }

  refreshSeparator(){
    // actualisation du separateur
    if(this.newSensorMetaData.get('separator').value){
      let oldSeparator = this.separator;
      this.separator = this.newSensorMetaData.get('separator').value;
      let regex = new RegExp(oldSeparator,"gi");
      this.newSensorMetaData.patchValue({
        measuredDataOrder: this.newSensorMetaData.get('measuredDataOrder').value.
          replace(regex,this.newSensorMetaData.get('separator').value)
      });
    } else {
      // separateur par defaut
      this.newSensorMetaData.patchValue({ separator: ':' });
    }
  }

  loadMetaData(){
    this.sensorService.getMetaData().
      subscribe(
        (data: Array<MesuredParameter>) => {
          for(let parameter of data) {
            this.metaData.push(JSON.parse(JSON.stringify(parameter)));
          }
        },
        error => { console.log('error was occured') }
      );
  }

}
