import { Component, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

import { range, remove } from 'lodash';

import { SensorVersion } from '../../SensorVersion';
import { sensorVersionService } from '../../pages/sensor-version/sensor-version-service';
import { sensorVersionFormService } from './sensor-version-form-service';
import { DataParameter,
  IconsDataParameter,
  dataParameterToString,
  iconsDataParameterToString,
  stringifyDataParameter }
  from '../../Enums';


@Component({
  selector: 'app-sensor-version',
  templateUrl: './sensor-version.component.html',
  styleUrls: ['./sensor-version.component.css']
})
export class SensorVersionComponent {
  @Input() sensorVersion: SensorVersion;
  SensorView: FormGroup;
  newSensor: FormGroup;
  metaData: FormGroup;
  myrange = range(7);
  stringDataParameter;
  separator: string = ':';
  typeList: string[];

  constructor(private fb: FormBuilder,
              private sensorFormService: sensorVersionFormService,
              private sensorService: sensorVersionService)
  {
    this.newSensor = this.fb.group({
      name: [''],
      // version: [''],
      type: [''],
      longitude: [''],
      latitude: [''],
    });
    this.metaData = this.fb.group({
      name:[''],
      version: [''],
      separator: [''],
      measuredDataOrder: ['']
    });
    this.stringDataParameter = stringifyDataParameter();
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
        //load Sensor

      });
    // Appeler le service ajouter dans la base
    this.newSensor.reset({
      name: [''],
      // version: [''],
      type: [''],
      longitude: [''],
      latitude: [''],
    });
  }

  onAddMetaData() {
    let metaDataName = this.metaData.get('name').value;
    let metaDataVersion = this.metaData.get('version').value;
    let metaDataSeparator = "";
    if (this.metaData.get('separator').value) {
      metaDataSeparator = this.metaData.get('separator').value;
    } else {
      metaDataSeparator = this.separator;
    }
    let metaMeasuredDataOrder = this.metaData.get('measuredDataOrder').value;
    let m = this.metaData.value;
    this.sensorFormService.addMetaData(metaDataName, metaDataVersion, metaDataSeparator,metaMeasuredDataOrder, m).
      subscribe(res => {
        console.log('Ajout effectue');
      });
    //ajouter dans la base
    this.metaData.reset({
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

  addMetaData(parameter) {
    this.refreshSeparator();
    // test si l'élément est déjà présent
    if ( this.metaData.get('measuredDataOrder').value.includes(parameter.id) ) {
      // si oui, on l'enlève
      this.metaData.patchValue({
        measuredDataOrder: this.metaData.get('measuredDataOrder').value.
          replace(parameter.id+this.metaData.get('separator').value,"")
      });
    } else {
      // sinon, on l'ajoute
      this.metaData.patchValue({
        measuredDataOrder: this.metaData.get('measuredDataOrder').value +
          parameter.id + this.metaData.get('separator').value
      });
    }
  }

  changeIcon(parameter){
    if (this.metaData.get('measuredDataOrder').value.includes(parameter.id)) {
      return "icon icon-shape bg-success text-white";
    }
    return "icon icon-shape bg-danger text-white";
  }

  refreshSeparator(){
    // actualisation du separateur
    if(this.metaData.get('separator').value){
      let oldSeparator = this.separator;
      this.separator = this.metaData.get('separator').value;
      let regex = new RegExp(oldSeparator,"gi");
      this.metaData.patchValue({
        measuredDataOrder: this.metaData.get('measuredDataOrder').value.
          replace(regex,this.metaData.get('separator').value)
      });
    } else {
      // separateur par defaut
      this.metaData.patchValue({ separator: ':' });
    }
  }

}
