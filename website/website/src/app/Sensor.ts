export class Sensor{
  idSensor: number;
  name: string;
  displayName: string;
  place: string;
  longitude: number;
  latitude: number;
  sensorMetadata: number;
  sensorMetadataName: string;
  description: string;
 
  constructor(
    idSensor: number,
    name: string,
    displayName: string,
    place: string,
    longitude: number,
    latitude: number,
    sensorMetadata: number,
    sensorMetadataName: string,
    description: string)
  {
    this.idSensor = idSensor;
    this.name= name;
    this.displayName = displayName;
    this.place = place;
    this.longitude = longitude;
    this.latitude = latitude;
    this.sensorMetadata = sensorMetadata;
    this.sensorMetadataName = sensorMetadataName;
    this.description = description;
  }
}
