import { Component, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { remove } from 'lodash';

import { SensorVersion } from '../../SensorVersion';
import { sensorVersionService } from '../../pages/sensor-version/sensor-version-service';
import { sensorVersionFormService } from './sensor-version-form-service';
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
  typeList;
  metaData: Array<MesuredParameter>;
  idList: Array<number>;
  openMap: boolean = true;
  closeResult: string;

  constructor(private fb: FormBuilder,
              private sensorFormService: sensorVersionFormService,
              private sensorService: sensorVersionService,
            private modalService: NgbModal)
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
    this.metaData = this.sensorService.loadMetaData();
    this.typeList = this.sensorService.loadSensorTypes();
    // this.sensorService.getSensorTypeNames().
    //   subscribe( (res) => { this.typeList = res } );
    this.idList = new Array();
  }


    open(content) {
      this.modalService.open(
        content, {ariaLabelledBy: 'modal-basic-title'});
      this.openMap = true;
    }

  onAddNewSensor() {
    let sensorName: string;
    let sensorType: number;
    let sensorLongitude: number;
    let sensorLatitude: number;
    let s = this.newSensor.value;
    if (this.newSensor.get('name').value != "") {
      sensorName = this.newSensor.get('name').value;
    } else {
      sensorName = "UNKNOWN_SENSOR_NAME";
    }
    if (this.newSensor.get('type').value != 1) {
      sensorType  = this.newSensor.get('type').value;
    } else {
      sensorType = 1;
    }
    if (this.newSensor.get('longitude').value != 0) {
      sensorLongitude = this.newSensor.get('longitude').value;
    } else {
      sensorLongitude = 0;
    }
    if (this.newSensor.get('latitude').value != 0) {
      sensorLatitude = this.newSensor.get('latitude').value;
    } else {
      sensorLatitude = 0;
    }
    this.sensorFormService.addSensor(sensorName, sensorType, sensorLongitude, sensorLatitude, s).
      subscribe( res => {
        console.log('Ajout effectue');
      });
    this.resetSensorForm();
  }

  resetSensorForm() {
    this.newSensor.reset({
      name: [''],
      type: [''],
      longitude: [''],
      latitude: [''],
    });
  }

  onAddNewSensorMetaData() {
    let sensorMetaDataName: string;
    let sensorMetaDataVersion: string;
    let sensorMetaDataSeparator: string;
    let measuredDataOrder = this.newSensorMetaData.get('measuredDataOrder').value;
    let m = this.newSensorMetaData.value;
    if (this.newSensorMetaData.get('name').value) {
      sensorMetaDataName = this.newSensorMetaData.get('name').value;
    } else {
      sensorMetaDataName = "UNKNOWN_SENSOR_TYPE";
    }
    if (this.newSensorMetaData.get('version').value) {
      sensorMetaDataVersion = this.newSensorMetaData.get('version').value;
    } else {
      sensorMetaDataVersion = "UNKNOWN_SENSOR_VERSION";
    }
    if (this.newSensorMetaData.get('separator').value) {
      sensorMetaDataSeparator = this.newSensorMetaData.get('separator').value;
    } else {
      sensorMetaDataSeparator = ':';
    }
    this.sensorFormService.addMetaData(
      sensorMetaDataName,
      sensorMetaDataVersion,
      sensorMetaDataSeparator,
      measuredDataOrder,
      m).
      subscribe(res => {
        console.log('Ajout effectue');
      });
    this.resetSensorMetaDataForm();
  }

  resetSensorMetaDataForm() {
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

  onMetaData(id) {
    // test si l'élément est déjà présent
    if ( this.idList.includes(id) ) {
      this.idList = remove(this.idList, (value) => {return value !== id});
    } else {
      this.idList.push(id);
    }
    this.newSensorMetaData.patchValue({
      measuredDataOrder: this.idList.toString()
    });
    this.refreshMetaDataOrder();
  }

  changeIcon(id){
    if (this.idList.includes(id)) {
      return "icon icon-shape bg-success text-white";
    }
    return "icon icon-shape bg-gray text-white";
  }

  refreshMetaDataOrder(){
    let regex = new RegExp(',',"gi");
    this.newSensorMetaData.patchValue({
      measuredDataOrder: this.idList.toString().
        replace(regex,this.newSensorMetaData.get('separator').value) +
      this.newSensorMetaData.get('separator').value
    });
  }

  onMoveLeft(id) {
    let index: number = this.idIndex(id);
    let previousId: number = this.idList[index-1];
    this.idList.splice(index-1, 1, id);
    this.idList.splice(index, 1, previousId);
    this.refreshMetaDataOrder();
  }

  onMoveRight(id) {
    let index: number = this.idIndex(id);
    let nextId: number = this.idList[index+1];
    this.idList.splice(index+1, 1, id);
    this.idList.splice(index, 1, nextId);
    this.refreshMetaDataOrder();
  }

  idIndex(id): number {
    let index: number = this.idList.indexOf(id);
    if (index === -1) {
      console.log("[ERROR] id not in idList");
    }
    return index;
  }
}
