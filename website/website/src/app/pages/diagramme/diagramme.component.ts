import { Component, OnInit, Input } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import Chart from 'chart.js';

import { SensorVersion } from '../../SensorVersion';
import { StockCapteurArr } from '../../stock-capteur';
import { FormControl, CheckboxControlValueAccessor } from '@angular/forms';
import { SensorVersionService } from '../sensor-version/sensor-version-service';
import { Sensor } from '../../Sensor';
import { MapsComponent } from '../maps/maps.component';

@Component({
  selector: 'app-diagramme',
  templateUrl: './diagramme.component.html',
  styleUrls: ['./diagramme.component.scss']
})
export class DiagrammeComponent implements OnInit {



  constructor(private sensorService: SensorVersionService, /*private mapSensor: MapsComponent*/) { }

  @Input() typeGraph = '';

  sensorTypes: SensorVersion[];
  // sensors: Sensor[];
 // sensorMap: Sensor[];
  sensors: SensorVersion[] = StockCapteurArr;
  sensorsCheck; myLine; dataUpdate;
  myBar; myPie;
  element; canvas;
  myControl: FormControl = new FormControl();
  filteredOptions: Observable<any>;
  searchText: any = '';
  displaySensor; j = 0; k = 0; l = 0;
  dataMesure: [68, 80, 32, 15, 50, 100, 20];
  checkValue = [];
  ctx: HTMLElement;

  // tslint:disable-next-line: member-ordering
  fruits = [
    { name: 'apple', selected: false },
    { name: 'orange', selected: false },
    { name: 'pear', selected: false },
    { name: 'naartjie', selected: false }
  ];
  /*  fruit: any;*/

  selection = [];
  monthsLabel: ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
  daysLabel: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // tslint:disable-next-line: only-arrow-functions
  randomScalingFactor = function () {
    return Math.round(Math.random() * 100);
  };

  // tslint:disable-next-line: member-ordering
  datasetSensor = [{
    label: 'My First dataset',
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
    borderColor: 'rgba(255, 99, 132, 1)',
    data: [
      this.randomScalingFactor(),
      this.randomScalingFactor(),
      this.randomScalingFactor(),
      this.randomScalingFactor(),
      this.randomScalingFactor(),
      this.randomScalingFactor(),
      this.randomScalingFactor()
    ],
    fill: false,
  }, {
    label: 'My Second dataset',
    fill: false,
    backgroundColor: 'rgba(54, 162, 235, 0.5)',
    borderColor: 'rgba(54, 162, 235, 1)',
    data: [
      this.randomScalingFactor(),
      this.randomScalingFactor(),
      this.randomScalingFactor(),
      this.randomScalingFactor(),
      this.randomScalingFactor(),
      this.randomScalingFactor(),
      this.randomScalingFactor()
    ],
  }];

  // tslint:disable-next-line: member-ordering
  datasetSensorB = [{
    label: 'My First dataset',
    backgroundColor: 'rgba(255, 99, 132, 0.5)',
    borderColor: 'rgba(255, 99, 132, 1)',
    data: [
      this.randomScalingFactor(),
      this.randomScalingFactor(),
      this.randomScalingFactor(),
      this.randomScalingFactor(),
      this.randomScalingFactor(),
      this.randomScalingFactor(),
      this.randomScalingFactor()
    ],
    fill: false,
  }, {
    label: 'My Second dataset',
    fill: false,
    backgroundColor: 'rgba(54, 162, 235, 0.5)',
    borderColor: 'rgba(54, 162, 235, 1)',
    data: [
      this.randomScalingFactor(),
      this.randomScalingFactor(),
      this.randomScalingFactor(),
      this.randomScalingFactor(),
      this.randomScalingFactor(),
      this.randomScalingFactor(),
      this.randomScalingFactor()
    ],
  }];

  /*Chart JS */

  // tslint:disable-next-line: member-ordering
  config = {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: this.datasetSensor,
    },
    options: {
      legend: {
        display: true
      },
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: ' Line Chart'
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Month'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Value'
          }
        }]
      }
    }
  };

  // tslint:disable-next-line: member-ordering
  configbar = {
    type: 'bar',
    data: {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: this.datasetSensorB,
    },
    options: {
      legend: {
        display: true
      },
      responsive: true,
      maintainAspectRatio: false,
      title: {
        display: true,
        text: ' Line Chart'
      },
      tooltips: {
        mode: 'index',
        intersect: false,
      },
      hover: {
        mode: 'nearest',
        intersect: true
      },
      scales: {
        xAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Month'
          }
        }],
        yAxes: [{
          display: true,
          scaleLabel: {
            display: true,
            labelString: 'Value'
          }
        }]
      }
    }
  };

  // tslint:disable-next-line: member-ordering
  configpie = {
    type: 'pie',
    data: {
      datasets: [{
        data: [
          this.randomScalingFactor(),
          this.randomScalingFactor(),
          this.randomScalingFactor(),
          this.randomScalingFactor(),
          this.randomScalingFactor(),
        ],
        backgroundColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)'
        ],
        label: 'Dataset 1'
      }],
      labels: [
        'Red',
        'Orange',
        'Yellow',
        'Green',
        'Blue'
      ]
    },
    options: {
      responsive: true
    }
  };



  /*typeGraphChange() {
    this.myLine.type = this.typeGraph;
    console.log(this.myLine.type);
    this.myLine.update();
  }*/


  /* Get Data to Form */

  /* addSensor (displaySensor){
     var dataMesure;
     var $red = this.randomScalingFactor()*255;
     var $green = this.randomScalingFactor()*255;
     var $blue = this.randomScalingFactor()*255;

     for( let i of displaySensor.measuredParameters){
       dataMesure.push(i.DataParameter.PRESSURE)
     }

     var dataSensor= {
       label:displaySensor.id,
       backgroundColor:"rgba("+$red+","+$green+","+$blue+",0.5)",
       borderColor:"rgba("+$red+","+$green+","+$blue+",1)",
       data:dataMesure,
       fill:false
     }
     this.sensorsCheck.push(dataSensor);
   }*/

  addSensoTest() {

    const red = this.randomScalingFactor() * 255 / 100;
    const green = this.randomScalingFactor() * 255 / 100;
    const blue = this.randomScalingFactor() * 255 / 100;

    const dataSensorL = {
      label: 'another dataset' + this.j,
      backgroundColor: 'rgba(' + red + ',' + green + ',' + blue + ',0.5)',
      borderColor: 'rgba(' + red + ',' + green + ',' + blue + ',1)',
      data: [
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor()
      ],
      fill: false
    };
    const dataSensorB = {
      label: 'another dataset' + this.k,
      backgroundColor: 'rgba(' + red + ',' + green + ',' + blue + ',0.5)',
      borderColor: 'rgba(' + red + ',' + green + ',' + blue + ',1)',
      data: [
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor()
      ],
      fill: false
    };
    const dataSensorP = {
      label: 'another dataset' + this.l,
      backgroundColor: [
        'rgba(' + red + ',' + green + ',' + blue + ',0.5)',
        'rgba(' + this.randomScalingFactor() + ',' +
        this.randomScalingFactor() + ',' + this.randomScalingFactor() + ',0.5)',
        'rgba(' + this.randomScalingFactor() + ',' +
        this.randomScalingFactor() + ',' + this.randomScalingFactor() + ',0.5)',
        'rgba(' + this.randomScalingFactor() + ',' +
        this.randomScalingFactor() + ',' + this.randomScalingFactor() + ',0.5)',
        'rgba(' + this.randomScalingFactor() + ',' +
        this.randomScalingFactor() + ',' + this.randomScalingFactor() + ',0.5)',
      ],
      data: [
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
        this.randomScalingFactor(),
      ],
    };
    // tslint:disable-next-line: triple-equals
    if (this.typeGraph == 'line') {
      this.myLine.data.datasets.push(dataSensorL);
      this.myLine.update();
      this.j++;
    } else if (this.typeGraph == 'bar') {
      this.myBar.data.datasets.push(dataSensorB);
      this.myBar.update();
      this.k++;
    } else if (this.typeGraph == 'pie') {
      // other config
      this.myPie.data.datasets.push(dataSensorP);
      this.myPie.update();
      this.l++;
    }
  }

  resetGraph() {
    if (this.typeGraph == 'line') {
      this.myLine.data.datasets = [];
      this.myLine.update();
      this.j = 0;
    } else if (this.typeGraph == 'bar') {
      this.myBar.data.datasets = [];
      this.myBar.update();
      this.k = 0;
    } else if (this.typeGraph == 'pie') {
      this.myPie.data.datasets = [];
      this.myPie.update();
      this.l = 0;
    }

  }

  line() {
    this.typeGraph = 'line';
    this.element = document.getElementById('chart');
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('id', 'myChart');
    this.canvas.className = 'chart-canvas';
    this.element.appendChild(this.canvas);

    this.ctx = document.getElementById('myChart');

    this.myLine = new Chart(this.ctx, this.config);
  }
  bar() {
    this.typeGraph = 'bar';
    // this.ctx=null;
    this.element = document.getElementById('chart');
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('id', 'myChart');
    this.canvas.className = 'chart-canvas';
    this.element.appendChild(this.canvas);

    this.ctx = document.getElementById('myChart');

    this.myBar = new Chart(this.ctx, this.configbar);
  }
  pie() {
    this.typeGraph = 'pie';
    // this.ctx=null;
    this.element = document.getElementById('chart');
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute('id', 'myChart');
    this.canvas.className = 'chart-canvas';
    this.element.appendChild(this.canvas);

    this.ctx = document.getElementById('myChart');
    this.myPie = new Chart(this.ctx, this.configpie);
  }

  days() {
    /*if(this.typeGraph == 'line'){
      this.myLine.data.labels =this.daysLabel ;
      this.myLine.update();
    }else if(this.typeGraph == 'bar'){
      this.myBar.data.labels=this.daysLabel;
      this.myBar.update();
    }else if (this.typeGraph == 'pie'){
      this.myPie.data.labels =this.daysLabel ;
      this.myPie.update();
    }*/
  }


  months() {/*
    if(this.typeGraph == 'line'){
      this.myLine.data.labels =this.monthsLabel ;
      this.myLine.update();
    }else if(this.typeGraph == 'bar'){
      this.myBar.data.labels=this.monthsLabel;
      this.myBar.update();
    }else if (this.typeGraph == 'pie'){
      this.myPie.data.labels =this.monthsLabel ;
      this.myPie.update();
    }*/
  }

  selectedSensor(value: any, check: boolean) {
    if (check) {
      for (const item of this.checkValue) {
        if (item.sensor.name === value.name) {
          item.selected = !item.selected;
        }
      }
    } else {
      for (const item of this.checkValue) {
        if (item.sensor.name === value.name) {
          item.selected = !item.selected;
        }
      }
    }
  }
  ngOnInit() {
    this.autoCompletInit();
    // this.sensors = this.sensorService.loadSensorTypes();
    this.initValueChecked();
    // this.mapSensor.getsensorChecked();

  }

  initValueChecked() {
    for (const sensor of this.sensors) {
      const value = { sensor, selected: false };
      this.checkValue.push(value);
    }
    /*for (const sensor of this.sensorMap) {
      for (const item of this.sensors) {
        si le capteur choisi sur la carte se trove dans la liste des capteurs on l'ajoute a la liste
        des donn2es a visualiser
        if(sensor.idSensor == item.metadata...){
  
        }
      }
    }*/
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
    return this.fruits.filter(
      option => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

}
