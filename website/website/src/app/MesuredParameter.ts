import {DataFormat} from './Enums';

export class MesuredParameter{
  id: number;
  varName: string;
  unit: string;
  dataFormat: DataFormat;
  parameter: string;
  sensorMetadata: number
  icon: string;

  constructor(
    pid: number,
    name: string,
    u : string,
    f:DataFormat,
    mp:string,
    smd: number,
    ic: string)
  {
    this.id=pid;
    this.varName = name;
    this.unit = u;
    this.dataFormat =f;
    this.parameter = mp;
    this.sensorMetadata = smd;
    this.icon = ic;
  }
}
