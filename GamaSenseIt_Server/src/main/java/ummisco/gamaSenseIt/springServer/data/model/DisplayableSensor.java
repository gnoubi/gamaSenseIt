package ummisco.gamaSenseIt.springServer.data.model;

public class DisplayableSensor {
	private long idSensor;
	private String name;
	private double longitude;
	private double latitude;
	private long sensorMetadata;
	public DisplayableSensor(long idSensor, String name, double longitude, double latitude, long sensorMetadata) {
		super();
		this.idSensor = idSensor;
		this.name = name;
		this.longitude = longitude;
		this.latitude = latitude;
		this.sensorMetadata = sensorMetadata;
	}
	public DisplayableSensor(Sensor s)
	{
		this(s.getIdSensor(), s.getName(), s.getLongitude(), s.getLatitude(), s.getMetadata().getIdType());
	}
	public long getIdSensor() {
		return idSensor;
	}
	public void setIdSensor(long idSensor) {
		this.idSensor = idSensor;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public double getLongitude() {
		return longitude;
	}
	public void setLongitude(double longitude) {
		this.longitude = longitude;
	}
	public double getLatitude() {
		return latitude;
	}
	public void setLatitude(double latitude) {
		this.latitude = latitude;
	}
	public long getSensorMetadata() {
		return sensorMetadata;
	}
	public void setSensorMetadata(long sensorMetadata) {
		this.sensorMetadata = sensorMetadata;
	}
	
	
}
