import { SensorVersion } from './SensorVersion';
import { MesuredParameter } from './MesuredParameter';
import {DataFormat, DataParameter} from './Enums' 

export  const metatData1: Array<MesuredParameter> = [
    {varName:"p1", id:1,parameter : DataParameter.PRESSURE, dataFormat:DataFormat.INTEGER,unit:"cb"},
    {varName:"p2", id:1,parameter : DataParameter.PRESSURE, dataFormat:DataFormat.INTEGER,unit:"cb"},
    {varName:"p3", id:1,parameter : DataParameter.PRESSURE, dataFormat:DataFormat.INTEGER,unit:"cb"},
    {varName:"p4", id:1,parameter : DataParameter.PRESSURE, dataFormat:DataFormat.INTEGER,unit:"cb"},
    {varName:"p5", id:1,parameter : DataParameter.PRESSURE, dataFormat:DataFormat.INTEGER,unit:"cb"},
    {varName:"p6", id:1,parameter : DataParameter.PRESSURE, dataFormat:DataFormat.INTEGER,unit:"cb"}
];

export  const metatData2: Array<MesuredParameter> = [
    {varName:"p1", id:2,parameter : DataParameter.PRESSURE, dataFormat:DataFormat.INTEGER,unit:"cb"},
    {varName:"p2", id:2,parameter : DataParameter.PRESSURE, dataFormat:DataFormat.INTEGER,unit:"cb"},
    {varName:"p3", id:2,parameter : DataParameter.PRESSURE, dataFormat:DataFormat.INTEGER,unit:"cb"},
    {varName:"p4", id:2,parameter : DataParameter.PRESSURE, dataFormat:DataFormat.INTEGER,unit:"cb"},
    {varName:"p5", id:2,parameter : DataParameter.PRESSURE, dataFormat:DataFormat.INTEGER,unit:"cb"},
    {varName:"p6", id:2,parameter : DataParameter.PRESSURE, dataFormat:DataFormat.INTEGER,unit:"cb"}
];

export  const StockCapteur: SensorVersion = {name: 'paris', version: "V1", documentation: "fdsfqdqsfddqs 1111", id:1, mesuredParameters: metatData1, measuredDataOrder:""};   
export  const StockCapteurArr: Array<SensorVersion> = [
    StockCapteur,
    {name: 'vegas', version: "V1", documentation: "fdsfqdqsfddxc vlbkba", id:2, mesuredParameters: metatData2, measuredDataOrder:""},
    {name: 'Dakar', version: "V3", documentation: "fdsfqdqsfddqs vbg.abs/mb", id:3, mesuredParameters: metatData1, measuredDataOrder:""},
    {name: 'Sanar', version: "V2", documentation: "fdsfqdqsfddqs vank,b", id:4, mesuredParameters: metatData2, measuredDataOrder:""},
    {name: 'Bondy', version: "V1", documentation: "fdsfqdqsfddqs nbalfhvln", id:5, mesuredParameters: metatData1, measuredDataOrder:""}

];   
//{nom: 'cam1', version: 1, longitude: 23, latitude: 52},
//{nom: 'cam2', version: 1, longitude: 22, latitude: 54}