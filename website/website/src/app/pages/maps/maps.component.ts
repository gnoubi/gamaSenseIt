import { Component, OnInit } from '@angular/core';
declare let L;

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})

export class MapsComponent implements OnInit {

  constructor() { }

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

    var map = L.map('mapid', {
      center: [14.731995, -17.433143],
      zoom: 15,
      layers: [field, sensors]
    });

    let popup = L.popup();

    function onMapClick(e) {
      popup
        .setLatLng(e.latlng)
        .setContent("You clicked the map at " + e.latlng.toString())
        .openOn(map);
    }

    map.on('click', onMapClick);

    var baseMaps = {
      "Field": field,
      //"Streets": streets
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

}
