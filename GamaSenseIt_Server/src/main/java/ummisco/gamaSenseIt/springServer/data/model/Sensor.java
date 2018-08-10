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
	@Column(columnDefinition = "point")
	private Point location;
	private String name;
	
	@ManyToOne
	private SensorType sensorType;
	
	
	public Sensor()
	{}
	
	
	
	public Sensor( String sensorName, Point location, SensorType sensorType) {
		super();
		this.location = location;
		this.name = sensorName;
		this.sensorType = sensorType;
	}



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

	
	
}
