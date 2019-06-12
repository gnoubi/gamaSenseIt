import { Component, OnInit, Input } from '@angular/core';

import { NgCircleProgressModule } from 'ng-circle-progress';


@Component({
  selector: 'pm-progress-bar',
  templateUrl: './pm-progress-bar.component.html',
  styleUrls: ['./pm-progress-bar.component.css']
})
export class PmProgressBarComponent  implements OnInit {
  DANGER_COLOR: string = "#f5365c";
  WARNING_COLOR: string = "#fb6340";
  OK_COLOR: string = "#2dce89";
  
  
  @Input()
  warmLevel : number = 50;
  @Input()
  dangerLevel : number = 75;
  @Input()
  maxLevel : number = 100;
  @Input()
  title: string = "PM 10";


  @Input()
  value : number;
  constructor() {
    this.title = "PM ?";
    this.warmLevel = 50;
    this.dangerLevel = 75;
    this.maxLevel = 100;
    this.DANGER_COLOR = "#f5365c";
    this.WARNING_COLOR = "#fb6340";
    this.OK_COLOR = "#2dce89";
   }
   getColor() : string
   {
     if(this.value < this.warmLevel)
     {
       return this.OK_COLOR ;
     }
     else if(this.value >= this.warmLevel && this.value < this.dangerLevel)
     {
      return this.WARNING_COLOR ;
     }
     else
     {
      return this.DANGER_COLOR ;
     }
   }
   formatTitle(percent: number) : string{
    if(percent >= 75){
      return "Bad"
    }else if(percent > 50){
      return "Medium";
    }else {
      return "Good"; 
    } 
  }

  ngOnInit() {
   // NgCircleProgressModule.forRoot({});
  }

}
