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
  newSensorMetadata: FormGroup;
  typeList: SensorVersion[];
  metadata: MesuredParameter[];
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
      subDisplayName: [''],
      longitude: [''],
      latitude: [''],
    });
    this.newSensorMetadata = this.fb.group({
      name: [''],
      version: [''],
      separator: [''],
      measuredDataOrder: [''],
      description: ['']
    });
    this.metadata = this.sensorService.loadMetadata();
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
    let sensorSubDisplayName: string;
    let sensorLongitude: number;
    let sensorLatitude: number;
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
    if (this.newSensor.get('subDisplayName').value != "") {
      sensorSubDisplayName = this.newSensor.get('subDisplayName').value;
    } else {
      sensorSubDisplayName = "UNKNOWN_PLACE";
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

    this.sensorFormService.addSensor(
      sensorName,
      sensorDisplayName,
      sensorType,
      sensorSubDisplayName,
      sensorLongitude,
      sensorLatitude,
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
      subDisplayName: [''],
      longitude: [''],
      latitude: [''],
    });
    this.coord = undefined;
  }

  onAddNewSensorMetadata(): void {
    let sensorMetadataName: string;
    let sensorMetadataVersion: string;
    let sensorMetadataSeparator: string;
    let measuredDataOrder = this.newSensorMetadata.get('measuredDataOrder').value;
    let sensorDescription: string;
    let m = this.newSensorMetadata.value;

    if (this.newSensorMetadata.get('name').value) {
      sensorMetadataName = this.newSensorMetadata.get('name').value;
    } else {
      sensorMetadataName = "UNKNOWN_SENSOR_TYPE";
    }
    if (this.newSensorMetadata.get('version').value) {
      sensorMetadataVersion = this.newSensorMetadata.get('version').value;
    } else {
      sensorMetadataVersion = "UNKNOWN_SENSOR_VERSION";
    }
    if (this.newSensorMetadata.get('separator').value) {
      sensorMetadataSeparator = this.newSensorMetadata.get('separator').value;
    } else {
      sensorMetadataSeparator = ':';
    }
    if (this.newSensorMetadata.get('description').value != "") {
      sensorDescription = this.newSensorMetadata.get('description').value;
    } else {
      sensorDescription = "UNKNOWN_DESCRIPTION";
    }

    this.sensorFormService.addSensorMetadata(
      sensorMetadataName,
      sensorMetadataVersion,
      sensorMetadataSeparator,
      measuredDataOrder,
      sensorDescription,
      m).subscribe(
        res => {
          console.log('Ajout effectue');
        }
    );
    this.resetSensorMetadataForm();
  }

  resetSensorMetadataForm(): void {
    this.newSensorMetadata.reset({
      name:[''],
      version: [''],
      separator: [''],
      measuredDataOrder: [''],
      description: ['']
    });
    this.idList = [];
  }

  // TODO
  addMetadataParam(): void {
    console.log('Metadata Param function  ');
    let name = '';
    let measuredParam = '';
  }

  onMetadata(id): void {
    if ( this.idList.includes(id) ) {
      this.idList = remove(this.idList, (value) => {return value !== id});
    } else {
      this.idList.push(id);
    }
    this.newSensorMetadata.patchValue({
      measuredDataOrder: this.idList.toString()
    });
    this.refreshMetadataOrder();
  }

  changeIcon(id): string {
    if (this.idList.includes(id)) {
      return "green-qameleo icon icon-shape no-outline text-white";
    }
    return "bg-gray icon icon-shape no-outline text-white";
  }

  refreshMetadataOrder(): void {
    let regex = new RegExp(',',"gi");
    this.newSensorMetadata.patchValue({
      measuredDataOrder: this.idList.toString().
        replace(regex,this.newSensorMetadata.get('separator').value) +
      this.newSensorMetadata.get('separator').value
    });
  }

  onMoveLeft(id: number): void {
    let index: number = this.idIndex(id);
    let previousId: number = this.idList[index-1];
    this.idList.splice(index-1, 1, id);
    this.idList.splice(index, 1, previousId);
    this.refreshMetadataOrder();
  }

  onMoveRight(id: number): void {
    let index: number = this.idIndex(id);
    let nextId: number = this.idList[index+1];
    this.idList.splice(index+1, 1, id);
    this.idList.splice(index, 1, nextId);
    this.refreshMetadataOrder();
  }

  idIndex(id: number): number {
    let index: number = this.idList.indexOf(id);
    if (index === -1) {
      console.log("[ERROR] id not in idList");
    }
    return index;
  }
}
