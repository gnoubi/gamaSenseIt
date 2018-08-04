package ummisco.gamaSenseIt.springServer.data.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;

import com.vividsolutions.jts.geom.Point;

@Entity 
public class Sensor {

	@Id
	private Long idSensor;
	@Column(columnDefinition = "geometry")
	private Point location;
	private String sensorName;
	
	public Sensor()
	{}
	
	public Long getIdSensor() {
		return idSensor;
	}
	public void setIdSensor(Long idSensor) {
		this.idSensor = idSensor;
	}
	public Point getLocation() {
		return location;
	}
	public void setLocation(Point location) {
		this.location = location;
	}
	public String getSensorName() {
		return sensorName;
	}
	public void setSensorName(String sensorName) {
		this.sensorName = sensorName;
	}

	
	
}
