let PRIVATE = 'http://localhost:8080/private/';
let PUBLIC = 'http://localhost:8080/public/';

export const API_URLS = {
    TEST: '',
    DEFAULT_DATA_SEPARATOR: PUBLIC + 'getDefaultDataSeparator',
    SENSOR_META_DATA: PUBLIC + 'getSensorMetaData',
    SENSOR_META_DATA_FULLNAMES: PUBLIC + 'getSensorTypeNames',
    SENSOR_DATA_SINCE_DATE: PUBLIC + 'getDataOfSensorSinceDate',// sensorid,paramid,begindate POST-GET
    SENSOR_DATA_BETWEEN_DATES: PUBLIC + 'getDataOfSensorBetweenDate',//sensorid,paramid,begindate,EndDate POST-GET
    SENSOR_DATA: PUBLIC + 'getData', //GET- JSON
    SENSOR: PUBLIC + "getSensorById",
    SENSORS: PUBLIC + 'getSensors',
    META_DATA: PUBLIC + 'getMetaData',
    META_DATA_ID: PUBLIC + 'getMetaDataById',
    META_DATA_SENSOR_META_DATA_ID: PUBLIC + 'getMetaDataBySensorMetadataId',
    SENSORS_NAMES: PUBLIC + 'getSensorsNames',
    ADD_SENSOR: PRIVATE + 'addSensor',// name,lat,long,metadata
    UPDATE_SENSOR: PRIVATE + 'updateSensor',// sensorid,nom, lat,long
    ADD_SENSOR_METADATA: PRIVATE + 'addSensorMetadata',// name,version,separator
    ADD_PARAMETER_META_DATA: PRIVATE + 'addParameterMetaData',// idMeta,name,unit,dataformat,measuredparam
}
