import { Component, OnInit, Input } from '@angular/core';
import { SensorVersion } from '../../SensorVersion';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { sensorVersionFormService } from './sensor-version-form-service';

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

  constructor(private fb: FormBuilder, private sensorFormService: sensorVersionFormService) {

    this.newSensor = this.fb.group({
      Name: [''],
      type: [''],
      longitude: [''],
      latitude: [''],
    });
    this.metaData = this.fb.group({
      Name: [''],
      version: [''],
      separator: [''],
    });
  }



  onAddNewSensor() {
    console.log('Add New Sensor appelee');
    let sensorName = this.newSensor.get('Name').value;
    let sensorType = this.newSensor.get('type').value;
    let sensorLongitude = this.newSensor.get('longitude').value;
    let sensorLatitude = this.newSensor.get('latitude').value;
    let s = this.newSensor.value;
    this.sensorFormService.addSensor(sensorName,sensorType,sensorLongitude,sensorLatitude,s).subscribe(
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
    this.sensorFormService.addMetaData(metaDataName,metaDataVersion,metaDataSeparator,m).subscribe(
      res => {
        console.log();
      });
    //ajouter dans la base
  }

  addMetaDataParam(){

  }

  ngOnInit() {

  }

}
