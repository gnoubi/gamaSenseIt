package ummisco.gamaSenseIt.springServer.data.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

import org.springframework.beans.factory.annotation.Autowired;

import com.vividsolutions.jts.geom.Geometry;
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
	private SensorType sensorType;
	
	@OneToMany
	private SensoredBulkData bulkData;
	
	public Sensor()
	{}
	public Sensor( String sensorName, Point location, SensorType sensorType) {
		super();
		this.longitude = location.getX();
		this.latitude = location.getY();
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

	public SensorType getSensorType() {
		return sensorType;
	}
	public void setSensorType(SensorType sensorType) {
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
	
}
