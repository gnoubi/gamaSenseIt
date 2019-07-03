export class Sensor{
  idSensor: number;
  name: string;
  displayName: string;
  longitude: number;
  latitude: number;
  sensorMetadata: number;
  sensorMetadataName: string;

  constructor(
    id: number,
    n: string,
    display: string,
    long: number,
    lat: number,
    md: number,
    mdn: string)
  {
    this.idSensor = id;
    this.name= n;
    this.displayName = display;
    this.longitude = long;
    this.latitude = lat;
    this.sensorMetadata = md;
    this.sensorMetadataName = mdn;
  }
}
