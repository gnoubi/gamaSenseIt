import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { remove } from 'lodash';

import { SensorVersion } from '../../SensorVersion';
import { SensorVersionService } from '../../pages/sensor-version/sensor-version-service';
import { SensorVersionFormService } from './sensor-version-form-service';
import { MesuredParameter } from '../../MesuredParameter';

declare let L; // import * as L from 'leaflet' : ERROR 77,78

@Component({
  selector: 'app-sensor-version',
  templateUrl: './sensor-version.component.html',
  styleUrls: ['./sensor-version.component.scss']
})
export class SensorVersionComponent implements OnInit {
  ROUND = 100000;

  @Input()
  sensorVersion: SensorVersion;

  SensorView: FormGroup;
  newSensor: FormGroup;
  newSensorMetaData: FormGroup;
  typeList: SensorVersion[];
  metaData: MesuredParameter[];
  idList: number[];
  openMap: boolean = true;
  map;
  coord;

  constructor(
    private fb: FormBuilder,
    private sensorFormService: SensorVersionFormService,
    private sensorService: SensorVersionService,
    private modalService: NgbModal)
  {
    this.newSensor = this.fb.group({
      name: [''],
      displayName: [''],
      type: [''],
      place: [''],
      longitude: [''],
      latitude: [''],
      description: ['']
    });
    this.newSensorMetaData = this.fb.group({
      name: [''],
      version: [''],
      separator: [''],
      measuredDataOrder: ['']
    });
    this.metaData = [];
    this.metaData = this.sensorService.loadMetaData();
    this.typeList = this.sensorService.loadSensorTypes();
    this.idList = [];
  }

  ngOnInit() {
    const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    });
    let mapboxUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      mapboxAttribution = " UMMISCO New Sensor's Map";

    let SoilSensor = L.marker([14.731812, -17.433000], {icon: myIcon}).bindPopup('This is Soil Sensor ');
    let sensors = L.layerGroup([SoilSensor]);
    let field = L.tileLayer(mapboxUrl,
      { id: 'mapbox.satellite', attribution: mapboxAttribution });

    this.map = L.map('mapid', {
      center: [14.731995, -17.433143],
      zoom: 10,
      layers: [field, sensors]
    });
    this.map.on('click', (e) => {
      L.popup()
      .setLatLng(e.latlng)
      .setContent("Lat = " + Math.round(e.latlng.lat*this.ROUND)/this.ROUND +
        ", Lng = " + Math.round(e.latlng.lng*this.ROUND)/this.ROUND)
      .openOn(this.map);
      this.coord = e.latlng;
    });
  }

  onAddNewSensor(): void {
    let sensorName: string;
    let sensorDisplayName: string;
    let sensorType: number;
    let sensorPlace: string;
    let sensorLongitude: number;
    let sensorLatitude: number;
    let sensorDescription: string;
    let s = this.newSensor.value;

    if (this.newSensor.get('name').value != "") {
      sensorName = this.newSensor.get('name').value;
    } else {
      sensorName = "UNKNOWN_SENSOR_NAME";
    }
    if (this.newSensor.get('displayName').value != "") {
      sensorDisplayName = this.newSensor.get('displayName').value;
    } else {
      sensorDisplayName = "UNKNOWN_DISPLAY_NAME";
    }
    if (this.newSensor.get('type').value != 1) {
      sensorType = this.newSensor.get('type').value;
    } else {
      sensorType = 1;
    }
    if (this.newSensor.get('place').value != "") {
      sensorPlace = this.newSensor.get('place').value;
    } else {
      sensorPlace = "UNKNOWN_PLACE";
    }
    // inputs has priority on map
    if (typeof(this.newSensor.get('longitude').value) === 'number' &&
        typeof(this.newSensor.get('latitude').value) === 'number') {
      sensorLongitude = this.newSensor.get('longitude').value;
      sensorLatitude = this.newSensor.get('latitude').value;
    } else if (this.coord) {
      sensorLongitude = this.coord.lng;
      sensorLatitude = this.coord.lat;
    } else {
      sensorLongitude = 0;
      sensorLatitude = 0;
    }
    if (this.newSensor.get('description').value != "") {
      sensorDescription = this.newSensor.get('description').value;
    } else {
      sensorDescription = "UNKNOWN_DESCRIPTION";
    }

    this.sensorFormService.addSensor(
      sensorName,
      sensorDisplayName,
      sensorType,
      sensorPlace,
      sensorLongitude,
      sensorLatitude,
      sensorDescription,
      s).subscribe(
        res => {
          console.log('Ajout effectue');
        }
    );
    this.resetSensorForm();
  }

  resetSensorForm(): void {
    this.newSensor.reset({
      name: [''],
      displayName: [''],
      type: [''],
      place: [''],
      longitude: [''],
      latitude: [''],
      description: ['']
    });
    this.coord = undefined;
  }

  onAddNewSensorMetaData(): void {
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

  resetSensorMetaDataForm(): void {
    this.newSensorMetaData.reset({
      name:[''],
      version: [''],
      separator: [''],
      measuredDataOrder: ['']
    });
  }

  // TODO
  addMetaDataParam(): void {
    console.log('MetaData Param function  ');
    let name = '';
    let measuredParam = '';
  }

  onMetaData(id): void {
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

  changeIcon(id): string {
    if (this.idList.includes(id)) {
      return "bg-success icon icon-shape no-outline text-white";
    }
    return "bg-gray icon icon-shape no-outline text-white";
  }

  refreshMetaDataOrder(): void {
    let regex = new RegExp(',',"gi");
    this.newSensorMetaData.patchValue({
      measuredDataOrder: this.idList.toString().
        replace(regex,this.newSensorMetaData.get('separator').value) +
      this.newSensorMetaData.get('separator').value
    });
  }

  onMoveLeft(id: number): void {
    let index: number = this.idIndex(id);
    let previousId: number = this.idList[index-1];
    this.idList.splice(index-1, 1, id);
    this.idList.splice(index, 1, previousId);
    this.refreshMetaDataOrder();
  }

  onMoveRight(id: number): void {
    let index: number = this.idIndex(id);
    let nextId: number = this.idList[index+1];
    this.idList.splice(index+1, 1, id);
    this.idList.splice(index, 1, nextId);
    this.refreshMetaDataOrder();
  }

  idIndex(id: number): number {
    let index: number = this.idList.indexOf(id);
    if (index === -1) {
      console.log("[ERROR] id not in idList");
    }
    return index;
  }
}
