import { MesuredParameter } from "./MesuredParameter";
import { version } from 'punycode';

export class SensorVersion{
  idType: number;
  name: string;
  version: string;
  dataSeparator: string;
  measuredDataOrder: string;
  // parameterMetaData : Array<MesuredParameter>;

  constructor(pid: number, n: string, v : string, sep: string, ord: string)
  {
    this.idType = pid;
    this.version = v;
    this.name= n;
    this.dataSeparator = sep;
    this.measuredDataOrder = ord;
    // this.parameterMetaData = mp;
    // this.parameterMetaData.forEach(function (value) {
    //   this.parameterMetaData = this.measuredDataOrder + value.id+this.dataSeparator;
    // })

  }


}
