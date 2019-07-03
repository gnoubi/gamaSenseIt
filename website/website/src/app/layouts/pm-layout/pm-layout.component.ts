import { Component, OnInit } from '@angular/core';

import { Sensor } from '../../sensor';
import { SensorVersionService } from '../../pages/sensor-version/sensor-version-service';

@Component({
  selector: 'app-pm-layout',
  templateUrl: './pm-layout.component.html',
  styleUrls: ['./pm-layout.component.scss']
})
export class PMLayoutComponent implements OnInit {
  id: number;
  private sensors: Sensor[];

  constructor(private sensorService: SensorVersionService) {
  }

  ngOnInit() {
    this.sensors = this.sensorService.loadSensorId(9); // this.id
  }
}
