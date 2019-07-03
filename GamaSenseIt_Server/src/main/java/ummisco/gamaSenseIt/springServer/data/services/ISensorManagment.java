package ummisco.gamaSenseIt.springServer.data.services;

import java.util.Date;

import ummisco.gamaSenseIt.springServer.data.model.Sensor;
import ummisco.gamaSenseIt.springServer.data.model.ParameterMetadata;
import ummisco.gamaSenseIt.springServer.data.model.SensorMetadata;

public interface ISensorManagment {
	public final static String DEFAULT_SENSOR_TYPE_NAME = "UNKNOWN_SENSOR_TYPE";
	public final static String DEFAULT_SENSOR_VERSION = "UNKNOWN_SENSOR_VERSION";
	public final static String DEFAULT_SENSOR_NAME = "UNKNOWN_SENSOR";
	public final static String DEFAULT_SENSOR_DISPLAY_NAME = "UNKNOWN_DISPLAY";
	
	public Sensor updateSensorInformation(Sensor s);
	public ParameterMetadata addParameterToSensorMetadata(SensorMetadata s, ParameterMetadata md );
	public SensorMetadata addSensorMetadata(SensorMetadata s);
	
	public void saveDefaultSensorInit();
	public void saveData(String message, Date date);
}
