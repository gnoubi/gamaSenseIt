import { Component, OnInit, Input } from '@angular/core';
import { Observable, from } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import Chart from 'chart.js';

import { SensorVersion } from '../../SensorVersion';
import { StockCapteurArr } from '../../stock-capteur';
import { FormControl, CheckboxControlValueAccessor, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SensorVersionService } from '../sensor-version/sensor-version-service';
import { Sensor } from '../../Sensor';
import { MapsComponent } from '../maps/maps.component';

@Component({
  selector: 'app-diagramme',
  templateUrl: './diagramme.component.html',
  styleUrls: ['./diagramme.component.scss']
})
export class DiagrammeComponent implements OnInit {
  checkValues: any;



  constructor(private sensorService: SensorVersionService, private fb: FormBuilder, /*private mapSensor: MapsComponent*/) {
    this.SearchCapteurForm = this.fb.group({
      name: ['', Validators.required],
    });
  }

  @Input() typeGraph = '';

  sensorTypes: SensorVersion[];
  sensors: Sensor[];
  sensorChoosed = [];
  // sensors: Sensor[];
  // sensorMap: Sensor[];
  //  sensors: SensorVersion[] = StockCapteurArr;
  sensorsCheck; myLine; dataUpdate;
  myBar; myPie;
  element; canvas;
  myControl: FormControl = new FormControl();
  filteredOptions: Observable<any>;
  searchText: any = '';
  // searchText: any;
  displaySensor; j = 0; k = 0; l = 0;
  dataMesure: [68, 80, 32, 15, 50, 100, 20];
  checkValue = [];
  SearchCapteurForm: FormGroup;
  ctx: HTMLElement;

  // tslint:disable-next-line: member-ordering
  // fruits = [
  // { name: 'apple', selected: false },
  // { name: 'orange', selected: false },
  // { name: 'pear', selected: false },
  // { name: 'naartjie', selected: false }
  // ];
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
        text: ' Bar Chart'
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
      title: {
        display: true,
        text: ' Pie Chart'
      },
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
    if (this.typeGraph === 'line') {
      this.myLine.data.datasets = [];
      this.myLine.update();
      this.j = 0;
    } else if (this.typeGraph === 'bar') {
      this.myBar.data.datasets = [];
      this.myBar.update();
      this.k = 0;
    } else if (this.typeGraph === 'pie') {
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

  initValueChecked() {
    console.log('init value checked');

    // tslint:disable-next-line: prefer-for-of
    /*for (let i = 0; i < this.sensors.length; i++) {
      console.log('element choisi ' + this.sensors[i]);
      const sensor = this.sensors[i];
      console.log('sensor ' + sensor);
      const value = { sensor, selected: false };
      console.log(value);
      this.checkValue.push(value);
      console.log('valeur ajoutee de plus' + this.checkValue);
    }*/

    // tslint:disable-next-line: forin
    for (const item in this.sensors) {
      console.log('item ' + item)
      const value = { sensor: item, selected: false };
      this.checkValue.push(item);

    }

    console.log(this.checkValue);

  }
  autoCompletInit() {
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.sensors.slice())
      );
  }

  displayFn(user?: any): string | undefined {
    return user ? user.name : undefined;
  }

  private _filter(name: string): any {
    const filterValue = name.toLowerCase();
    return this.sensors.filter(
      option => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  selectedSensor(value: Sensor, check: boolean) {
    console.log('selected Sensor Action ' + check + ' ' + value.name);
    // console.log('checkvalue ' + this.checkValue);
    if (check) {
      /*for (const item of this.checkValue) {
        if (item.sensor.name === value.name) {
          item.selected = !item.selected;
        }
      }*/
      this.checkValue.push(value);
    } else {
      /* Ca doit etre supprimer du tableau */
      /*for (const item of this.checkValue) {
        if (item.sensor.name === value.name) {
          item.selected = !item.selected;
        }
      }*/
      this.onDeleteOnTable(value);
    }
  }

  onAddSensor() {
    let tabValue;
    let val: any;
    let i;
    console.log('Add Sensor');
    const value = this.myControl.value;
    // console.log(value);
    tabValue = value.split(' ');
    // console.log(tabValue[0]);
    // console.log(tabValue[1]);
    // console.log(value.version);
    for (const sensorItem of this.sensorTypes) {
      if (sensorItem.name === tabValue[0] && sensorItem.version === tabValue[1]) {
        val = sensorItem;
        // this.checkValue.push(val);
      }
    }

    for (const item of this.checkValue) {
      if (item.name === val.name && item.version === val.version) {
        i = 0;
      } else {
        i = 1;
      }
    }

    if (i === 0) {
      console.log('Valeur deja ajoutee dans le tableau');
    } else {
      this.checkValue.push(val);
    }
  }

  onChooseSensorType() {
    let val;
    let receivedValue;
    let i = 0;
    const value = this.myControl.value;
    receivedValue = value.split(' ').join(' -- ');
    console.log(receivedValue);
    console.log(this.sensors);
    for (const sensorItem of this.sensors) {
      if (sensorItem.sensorMetadataName === receivedValue) {
        val = sensorItem;
        /*if (val in this.sensorChoosed) {
         console.log('Valeur deja ajoutee dans le tableau');
        } else {
         this.sensorChoosed.push(val);
        }*/
        for (const item of this.sensorChoosed) {
          if (val === item) {
            i = 1;
          }
        }
        if (i === 1) {
          console.log('Valeur deja ajoutee dans le tableau');
        } else {
          this.sensorChoosed.push(val);
        }
      }
    }
    console.log(this.sensorChoosed);
  }

  onDeleteOnTable(item) {
    let i;
    for (let l = 0; l < this.checkValue.length; l++) {
      if (item === this.checkValue[l]) {
        i = l;
      }
    }
    this.checkValue.splice(i, 1);
  }

  ngOnInit() {
    this.sensorTypes = this.sensorService.loadSensorTypes();
    this.sensors = this.sensorService.loadSensors();
    console.log(this.sensorTypes);
    this.autoCompletInit();
    // this.mapSensor.getsensorChecked();
    // this.initValueChecked();


  }


}
