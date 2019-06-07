import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { sensorVersionService } from '../sensor-version/sensor-version-service';

declare let L;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})

export class MapsComponent implements OnInit {

  SearchCapteurForm: FormGroup;
  sensorMap: any;
  sensor: any;
  tabSensor;
  map;


  constructor(private fb: FormBuilder, private sensorService: sensorVersionService) {
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

    let mapboxUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      mapboxAttribution = " UMMISCO Dashboard Sensor's Maps";


    let SoilSensor = L.marker([14.731812, -17.433000]).bindPopup('This is Soil Sensor '),
      Humidity = L.marker([14.741995, -17.433543]).bindPopup('This is humidity sensor '),
      Temperature = L.marker([14.731095, -17.435143]).bindPopup('This is Temperature sensor'),
      Rain = L.marker([14.721995, -17.437343]).bindPopup('This is Rain Detection Sensor');
    var sensors = L.layerGroup([SoilSensor, Humidity, Temperature, Rain]);
    var field = L.tileLayer(mapboxUrl, { id: 'mapbox.satellite', attribution: mapboxAttribution }),
      streets = L.tileLayer(mapboxUrl, { id: 'mapbox.streets', attribution: mapboxAttribution });

    this.map = L.map('mapid', {
      center: [14.731995, -17.433143],
      zoom: 15,
      layers: [field, sensors]
    });

    let popup = L.popup();

    function onMapClick(e) {
      popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(this.map);
    }

    this.map.on('click', onMapClick);

    var baseMaps = {
      "Field": field,
    };

    var overlayMaps = {
      "Sensors": sensors
    };

    //L.control.layers(baseMaps, overlayMaps).addTo(map);

    /*const mymap = L.map('mapid').setView([14.731995, -17.433143], 15);
    let tilestreets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: " UMMISCO Dashboard Sensor's Maps",
      maxZoom: 19
    });
    tilestreets.addTo(mymap);
    let marker = L.marker([14.731995, -17.433143]).addTo(mymap);
    marker.bindPopup("<b>Sensor Name!</b><br> Sensor Description.");

    let popup = L.popup();

    function onMapClick(e) {
      popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(mymap);
    }

    mymap.on('click', onMapClick);*/
  }

  loadSensor() {
    this.sensorService.getSensors()
      .subscribe(
        data => { this.sensorMap = data }
      );
  }
}
