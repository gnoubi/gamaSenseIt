package ummisco.gamaSenseIt.springServer.data.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class SensorMetaData {
	public enum DataFormat{
		INTEGER,
		DOUBLE
	}
	public enum DataParameter{
		TEMPERATURE,
		CO2,
		PM10,
		PM2_5,
		PM1
	}
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	long id;
	
	String varName;
	String unit;
	
	@ManyToOne
	Sensor sensor;
	
	DataFormat dataFormat;
	DataParameter typeOfSensor;
	
	public SensorMetaData(String varName, String unit, DataFormat typeOfData, DataParameter typeOfSensor) {
		super();
		this.varName = varName;
		this.unit = unit;
		this.dataFormat = typeOfData;
		this.typeOfSensor = typeOfSensor;
	}

	public SensorMetaData() {
		super();
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getVarName() {
		return varName;
	}

	public void setVarName(String varName) {
		this.varName = varName;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public DataFormat getTypeOfData() {
		return dataFormat;
	}

	public void setTypeOfData(DataFormat typeOfData) {
		this.dataFormat = typeOfData;
	}

	public DataParameter getTypeOfSensor() {
		return typeOfSensor;
	}

	public void setTypeOfSensor(DataParameter typeOfSensor) {
		this.typeOfSensor = typeOfSensor;
	}
	
	
	
}
