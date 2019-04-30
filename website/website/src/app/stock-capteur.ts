import { SensorVersion } from './SensorVersion';
import { MesuredParameter } from './MesuredParameter';
import {DataFormat, DataParameter} from './Enums' 

export  const metatData1: Array<MesuredParameter> = [
    {varName:"p1", id:1,parameter : DataParameter.PRESSURE, dataFormat:DataFormat.INTEGER,unit:"cb"},
    {varName:"p1", id:1,parameter : DataParameter.PRESSURE, dataFormat:DataFormat.INTEGER,unit:"cb"}
];

export  const StockCapteur: SensorVersion = {name: 'paris', version: "V1", documentation: "fdsfqdqsfddqs 1111", id:1, mesuredParameters: metatData1, measuredDataOrder:""};   
export  const StockCapteurArr: Array<SensorVersion> = [StockCapteur,{name: 'vegas', version: "V1", documentation: "fdsfqdqsfddqs 1111", id:1, mesuredParameters: metatData1, measuredDataOrder:""}];   
//{nom: 'cam1', version: 1, longitude: 23, latitude: 52},
//{nom: 'cam2', version: 1, longitude: 22, latitude: 54}