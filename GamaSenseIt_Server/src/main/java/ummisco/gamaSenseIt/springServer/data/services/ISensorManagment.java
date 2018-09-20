package ummisco.gamaSenseIt.springServer.data.services;

import java.util.Date;

import ummisco.gamaSenseIt.springServer.data.model.Sensor;
import ummisco.gamaSenseIt.springServer.data.model.SensorMetaData;
import ummisco.gamaSenseIt.springServer.data.model.SensorType;

public interface ISensorManagment {
	public final static String DEFAULT_SENSOR_TYPE_NAME = "UNKNOWN_SENSOR_TYPE";	
	public final static String DEFAULT_SENSOR_VERSION = "UNKNOWN_SENSOR_VERSION";	
	public final static String DEFAULT_SENSOR_NAME = "UNKNOWN_SENSOR";	
	
	public Sensor updateSensorInformation(Sensor s);
	public SensorMetaData addSensorMetaData(Sensor s, SensorMetaData md );
	public SensorType addSensorType(SensorType st);
	
	
	public void saveDefaultSensorInit();
	public void saveData(String message, Date date);
}
