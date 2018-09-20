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
	public final static String measureOrderSeparator = ":";
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idSensor;
	private String name;
	private double longitude;
	private double latitude;
	private String measuredDataOrder;
	private String dataSeparator = ":";
	
	

	@ManyToOne
	private SensorType sensorType;
	
	@OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy="sensor")
	private Set<SensoredBulkData> bulkData = new HashSet<>();
	
	@OneToMany(cascade = CascadeType.ALL,
            fetch = FetchType.LAZY,
            mappedBy="sensor")
	private Set<SensorMetaData> metaData = new HashSet<>();
	
	public Sensor()
	{
		measuredDataOrder = "";
		name = "";
	}
	public Sensor( String sensorName, Point location, SensorType sensorType) {
		this(sensorName,location.getX(),location.getY(),sensorType);
	}
	
	public Sensor( String sensorName, double locationX,double locationY, SensorType sensorType) {
		super();
		this.longitude = locationX;
		this.latitude = locationY;
		this.name = sensorName;
		this.sensorType = sensorType;
		measuredDataOrder = "";
	}
	
	public Long getIdSensor() {
		return idSensor;
	}
	public void setIdSensor(Long idSensor) {
		this.idSensor = idSensor;
	}
	
	public Optional<SensorMetaData> getMetadata(long id)
	{
		SensorMetaData res = null;
		for(SensorMetaData md:this.metaData){
			if(md.getId()==id)
			{
				res=md;
				break;
			}
		}
		return Optional.ofNullable(res);
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
	
	public Set<SensorMetaData> getMetaData() {
		return metaData;
	}
	public void setMetaData(Set<SensorMetaData> metaData) {
		this.metaData = metaData;
	}
	public String getMeasuredDataOrder() {
		return measuredDataOrder;
	}
	public void setMeasuredDataOrder(String measuredData) {
		this.measuredDataOrder = measuredData;
	}
	
	public String getDataSeparator() {
		return dataSeparator;
	}
	public void setDataSeparator(String metadataSeparator) {
		this.dataSeparator = metadataSeparator;
	}
	public void addmeasuredData(SensorMetaData md)
	{
		this.measuredDataOrder = this.measuredDataOrder + md.getId()+measureOrderSeparator;
		this.metaData.add(md);
	}
	
	
}
