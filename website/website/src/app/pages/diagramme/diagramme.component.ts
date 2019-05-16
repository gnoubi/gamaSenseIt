import { Component, OnInit, Input } from '@angular/core';
import Chart from 'chart.js';
import { SensorVersion } from '../../SensorVersion';
import { StockCapteurArr } from '../../stock-capteur';

@Component({
  selector: 'app-diagramme',
  templateUrl: './diagramme.component.html',
  styleUrls: ['./diagramme.component.css']
})
export class DiagrammeComponent implements OnInit {

  @Input() typeGraph = '';

  randomScalingFactor = function () {
    return Math.round(Math.random() * 100);
  };

  sensors: Array<SensorVersion> = StockCapteurArr;
  sensorsCheck; myLine; dataUpdate;
  myLineBar; myLinePie;
  element;canvas;
  displaySensor; j = 0;
  dataMesure: [68, 80, 32, 15, 50, 100, 20];
  ctx: HTMLElement;

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



  typeGraphChange() {
    this.myLine.type = this.typeGraph;
    console.log(this.myLine.type);
    this.myLine.update();
  }


  /* Get Data to Form */

  /* addSensor (displaySensor){
     var dataMesure;
     var $red = this.randomScalingFactor()*255;
     var $green = this.randomScalingFactor()*255;
     var $blue = this.randomScalingFactor()*255;
 
     for( let i of displaySensor.mesuredParameters){
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

    var red = this.randomScalingFactor() * 255 / 100;
    var green = this.randomScalingFactor() * 255 / 100;
    var blue = this.randomScalingFactor() * 255 / 100;

    var dataSensor = {
      label: 'another dataset' + this.j,
      backgroundColor: "rgba(" + red + "," + green + "," + blue + ",0.5)",
      borderColor: "rgba(" + red + "," + green + "," + blue + ",1)",
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
    }
    this.myLine.data.datasets.push(dataSensor);
    this.myLine.update();
    this.j++;

  }

  resetGraph() {
    this.myLine.data.datasets = [];
    this.myLine.update();
    this.j = 0;
  }

  /*Chart JS */


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

  configbar = {
    type: 'bar',
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

  line() {
    this.typeGraph='line';
     this.element = document.getElementById('chart');
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute("id", "myChart");
    this.canvas.className = "chart-canvas";
    this.element.appendChild(this.canvas);
    
    this.ctx = document.getElementById('myChart');

    this.myLine = new Chart(this.ctx, this.config);
  }
  bar() {
    this.typeGraph='bar';
    //this.ctx=null;
    this.element = document.getElementById('chart');
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute("id", "myChart");
    this.canvas.className = "chart-canvas";
    this.element.appendChild(this.canvas);
    
    this.ctx = document.getElementById('myChart');

    this.myLineBar = new Chart(this.ctx, this.configbar);
  }
  pie() {
    this.typeGraph='pie';
    //this.ctx=null;
    this.element = document.getElementById('chart');
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }
    this.canvas = document.createElement('canvas');
    this.canvas.setAttribute("id", "myChart");
    this.canvas.className = "chart-canvas";
    this.element.appendChild(this.canvas);
    
    this.ctx = document.getElementById('myChart');
    this.myLinePie = new Chart(this.ctx, this.configpie);
  }



  constructor() { }

  ngOnInit() {

  }


}
