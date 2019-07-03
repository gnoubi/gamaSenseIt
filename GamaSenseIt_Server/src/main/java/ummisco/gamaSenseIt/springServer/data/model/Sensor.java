package ummisco.gamaSenseIt.springServer.data.model;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import com.vividsolutions.jts.geom.Point;

@Entity 
public class Sensor {
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idSensor;
	private String name;
	private String displayName;
	private double longitude;
	private double latitude;
	
	@ManyToOne
	private SensorMetadata sensorType;
	
	@OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy="sensor")
	private Set<SensoredBulkData> bulkData = new HashSet<>();
	

	public Sensor()
	{
		name = "";
	}
	public Sensor(String sensorName, String displayName, Point location, SensorMetadata sensorType) {
		this(sensorName, displayName, location.getX(),location.getY(),sensorType);
	}
	
	public Sensor(String sensorName, String displayName, double locationX, double locationY, SensorMetadata sensorType) {
		this();
		this.longitude = locationX;
		this.latitude = locationY;
		this.name = sensorName;
		this.displayName = displayName;
		this.sensorType = sensorType;
	}
	
	public Long getIdSensor() {
		return idSensor;
	}
	public void setIdSensor(Long idSensor) {
		this.idSensor = idSensor;
	}
	public String getName() {
		return name;
	}
	public void setName(String sensorName) {
		this.name = sensorName;
	}
	public String getDisplayName() {
		return displayName;
	}
	public void setDisplayName(String displayName) {
		this.displayName = displayName;
	}
	public SensorMetadata getMetadata() {
		return sensorType;
	}
	public void setMetadata(SensorMetadata sensorType) {
		this.sensorType = sensorType;
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
	
	public Optional<Set<ParameterMetadata>> getParameters()
	{
		if(this.sensorType == null)
			return Optional.empty();
		return  Optional.of(this.sensorType.getParameterMetaData());
	}
	
	public Optional<ParameterMetadata> getParameterMetadata(long id)
	{
		if(this.sensorType == null)
			return Optional.empty();
		return this.sensorType.getParameterMetadata(id);
	}
	
}
