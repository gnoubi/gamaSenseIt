package ummisco.gamaSenseIt.springServer.data.services;

import java.util.Date;

public interface ISensorManagment {
	public final static String DEFAULT_SENSOR_TYPE_NAME = "UNKNOWN_SENSOR_TYPE";	
	public final static String DEFAULT_SENSOR_VERSION = "UNKNOWN_SENSOR_VERSION";	
	public final static String DEFAULT_SENSOR_NAME = "UNKNOWN_SENSOR";	
	
	
	public void saveDefaultSensorInit();
	public void saveData(String message, Date date);
}
