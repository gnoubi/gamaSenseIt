package ummisco.gamaSenseIt.springServer.data.controller;

public interface IDataController {
	String ADD_SENSOR 					= "addSensor";
	String UPDATE_SENSOR				= "updateSensor";
	String ADD_SENSOR_METADATA			= "addSensorMetadata";
	String UPDATE_SENSOR_METADATA		= "updateSensorMetadata";
	String ADD_PARAMETER_META_DATA 		= "addParameterMetadata";
	String UPDATE_PARAMETER_META_DATA 	= "updateParameterMetadata";
	String SENSOR_META_DATA				= "getSensorMetaData";
	String SENSOR_META_DATA_FULLNAMES	= "getSensorTypeNames";
	String SENSOR_DATA					= "getData";
	String SENSOR_DATA_SINCE_DATE		= "getDataOfSensorSinceDate";
	String SENSOR_DATA_BETWEEN_DATES	= "getDataOfSensorBetweenDate";
	String SERVER_DATE					= "serverDateTime";
	String SENSORS_NAMES				= "getSensorsNames";
	String SENSORS						= "getSensors";
	String META_DATA					= "getMetaData";
	String META_DATA_ID					= "getMetaDataById";
	String META_DATA_SENSOR_META_DATA_ID= "getMetaDataBySensorMetadataId";
	String DEFAULT_DATA_SEPARATOR		= "getDefaultDataSeparator";

	
	String SENSOR_ID					= "sensorId";
	String PARAMETER_ID					= "parameterId";
	String METADATA_ID					= "metadataId";
	
	
	String NAME 						= "name";
	String UNIT 						= "unit";
	String VERSION 						= "version";
	String DATA_SEPARATOR				= "dataSeparator";
	String LONGITUDE 					= "longitude";
	String LATITUDE 					= "latitude";
	String SENSOR_METADATA 				= "sensormetadata";
	String BEGIN_DATE					= "beginDate";
	String END_DATE						= "endDate";
	String DATA_FORMAT					= "dataFormat";
	String MEASURED_PARAMETER			= "measuredParameter";
	String MEASURED_DATA_ORDER			= "measuredDataOrder";
	
	String DATE_PATTERN					= "MMddyyyy";
	
	
}
