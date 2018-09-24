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
	public Sensor( String sensorName, Point location, SensorMetadata sensorType) {
		this(sensorName,location.getX(),location.getY(),sensorType);
	}
	
	public Sensor( String sensorName, double locationX,double locationY, SensorMetadata sensorType) {
		this();
		this.longitude = locationX;
		this.latitude = locationY;
		this.name = sensorName;
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
	
	public Optional<ParameterMetadata> getParameterMetadata(long id)
	{
		if(this.sensorType == null)
			return Optional.empty();
		return this.sensorType.getParameterMetadata(id);
	}
	
}
