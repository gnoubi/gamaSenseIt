import {DataFormat, DataParameter} from './Enums'
export class MesuredParameter{
  id : number;
  varName: string;
  unit: string;
  dataFormat: DataFormat;
  parameter: DataParameter;
  sensorMetadata: number

  constructor(pid: number, name: string, u : string, f:DataFormat,mp:DataParameter, smd: number)
  {
    this.id=pid;
    this.varName = name;
    this.unit = u;
    this.dataFormat =f;
    this.parameter = mp;
    this.sensorMetadata = smd;
  }
}
