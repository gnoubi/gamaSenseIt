import { Component, OnInit, Input } from '@angular/core';
import { SensorVersion } from '../../SensorVersion';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {sensorVersionFormService} from './sensor-version-form-service';

@Component({
  selector: 'app-sensor-version',
  templateUrl: './sensor-version.component.html',
  styleUrls: ['./sensor-version.component.css']
})
export class SensorVersionComponent implements OnInit {
  @Input() sensorVersion : SensorVersion;
  SensorView: FormGroup;
  newSensor: FormGroup;
  metaData: FormGroup;

  constructor(private fb: FormBuilder,private sensorFormService:sensorVersionFormService) { 
    this.SensorView = this.fb.group({
      Name:[''],
      latitude:[''],
      longitude:['']
    });
    this.newSensor = this.fb.group({
      Name:[''],
      version:[''],
      adresse:[''],
      latitude:[''],
      longitude:['']
    });
    this.metaData = this.fb.group({
      Name:[''],
      version:[''],
    });
  }


  onAddSensorView(){
    console.log('Sensor View appelee');
    let SensorView = this.SensorView.value;
    //envoyer SensorView a la base de donnees des MAP
  }

  onAddNewSensor(){
    console.log('Add New Sensor appelee');
    let Sensor = this.newSensor.value;
    // Appeler le service ajouter dans la base
  }

  onAddMetaData(){
    console.log('Add MetaData appelee');
    let MetaDataSensor= this.metaData.value;
    //ajouter dans la base

  }

  findAddress(){
    console.log('Find Address appelee');
    // find Address and generate lat and long
  }

  ngOnInit() {
  }

}
