import { MesuredParameter } from "./MesuredParameter";
import { version } from 'punycode';

export class SensorVersion{
  id : number;
  name: string;
  version: string;
  measuredDataOrder: string;
  documentation : string;
  mesuredParameters : Array<MesuredParameter>;

  constructor(pid: number, n: string, v : string, d:string, mp:Array<MesuredParameter>)
  {
    this.id = pid;
    this.version = v;
    this.name= n;
    this.documentation = d;
    this.mesuredParameters = mp;
    this.mesuredParameters.forEach(function (value) {
      this.measuredDataOrder = this.measuredDataOrder + value.id+":";
    })
    
  }
  

}
