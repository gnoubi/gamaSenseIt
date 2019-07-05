import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { Sensor } from '../../Sensor';
import { SensorVersionService } from '../../pages/sensor-version/sensor-version-service';

declare let L;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})

export class MapsComponent implements OnInit {

  lat: number;
  lng: number;
  SearchCapteurForm: FormGroup;
  sensorMap: any;
  tabSensor;
  map;
  myControl:FormControl = new FormControl();
  filteredOptions: Observable<any>;

  // test autocompletion
  fruits = [
    { name: 'apple',    selected: true },
    { name: 'orange',   selected: false },
    { name: 'pear',     selected: true },
    { name: 'naartjie', selected: false },
    { name: 'apple1',    selected: true },
    { name: 'orange1',   selected: false },
    { name: 'pear1',     selected: true },
    { name: 'naartjie1', selected: false }
  ];
  //Fin test

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private sensorService: SensorVersionService)
  {
    this.SearchCapteurForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  onSearchSensor() {

    let sensorName = this.SearchCapteurForm.get('name').value;
    // creer un moteur de recherche par le biais de leaflet
    this.map.flyTo([43.6316, 3.89706], 15);

    /*for( this.sensor in this.sensorMap){
        if (this.sensor.name == sensorName ){
          this.map('mapid').flyTo([this.sensor.latitude, this.sensor.longitude], 15);
        }
    }*/
  }

  ngOnInit() {
    const myIcon = L.icon({
      iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.2.0/images/marker-icon.png'
    });
    this.autoCompletInit();

    let mapboxUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      mapboxAttribution = " UMMISCO Dashboard Sensor's Maps";

    let soilSensor = L.marker([14.731812, -17.433000], {icon: myIcon}).bindPopup('This is Soil Sensor '),
      humidity = L.marker([14.741995, -17.433543], {icon: myIcon}).bindPopup('This is humidity sensor '),
      temperature = L.marker([14.731095, -17.435143], {icon: myIcon}).bindPopup('This is temperature sensor'),
      rain = L.marker([14.721995, -17.437343], {icon: myIcon}).bindPopup('This is rain Detection Sensor');
    var sensors = L.layerGroup([soilSensor, humidity, temperature, rain]);
    var field = L.tileLayer(mapboxUrl, { id: 'mapbox.satellite', attribution: mapboxAttribution }),
      streets = L.tileLayer(mapboxUrl, { id: 'mapbox.streets', attribution: mapboxAttribution });

    // Ajout des positions des capteurs du serveur local
    this.sensorService.getSensors().subscribe(
      (data: Sensor[]) => {
        for (let sensor of data) {
          L.marker([
            JSON.parse(JSON.stringify(sensor)).latitude,
            JSON.parse(JSON.stringify(sensor)).longitude
          ], {icon: myIcon}).bindPopup(sensor.sensorMetadataName).
          addTo(this.map);
          // utiliser bindPopup si bindTooltip ne fonctionne pas avec les ecrans tactiles
        }
      }
    );

    let index_lat = 0;
    let index_lng = 0;
    if (this.router.url !== '/maps' && this.router.url.includes('&')) {
      index_lat = this.router.url.lastIndexOf('/') + 1;
      index_lng = this.router.url.lastIndexOf('&') + 1;
    }
    if (index_lat > 0) {
      this.lat = Number(this.router.url.slice(index_lat,index_lng-1));
    } else {
      this.lat = 0;
    }
    if (index_lng > 0) {
      this.lng = Number(this.router.url.slice(index_lng));
    } else {
      this.lng = 0;
    }
    this.map = L.map('mapid', {
      center: [this.lat, this.lng],
      zoom: 5,
      layers: [field, sensors]
    });
    this.map.on('click', (e) => {
      L.popup()
      .setLatLng(e.latlng)
      .setContent('latitude: ' + e.latlng.lat + '<br>longitude: ' + e.latlng.lng)
      .openOn(this.map);
    });

  }

  autoCompletInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.fruits.slice())
      );
  }

  displayFn(user?: any): string | undefined {
    return user ? user.name : undefined;
  }

  private _filter(name: string): any {
    const filterValue = name.toLowerCase();

    return this.fruits.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }
}
