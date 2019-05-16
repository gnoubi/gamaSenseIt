import { Component, OnInit, Input } from '@angular/core';
import { SensorVersion } from '../../SensorVersion';

@Component({
  selector: 'app-sensor-version',
  templateUrl: './sensor-version.component.html',
  styleUrls: ['./sensor-version.component.css']
})
export class SensorVersionComponent implements OnInit {
  @Input() sensorVersion : SensorVersion;

  constructor() { }

  ngOnInit() {
  }

}
