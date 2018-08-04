package ummisco.gamaSenseIt.springServer.data.model;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class SensoredBulkData {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	Long idData;
	
	@ManyToOne
	private Sensor sensor;
	
	long token;
	Date captureDate;
	String contents;
	public Long getIdData() {
		return idData;
	}
	public void setIdData(Long idData) {
		this.idData = idData;
	}
	public Sensor getSensor() {
		return sensor;
	}
	public void setSensor(Sensor sensor) {
		this.sensor = sensor;
	}
	public long getToken() {
		return token;
	}
	public void setToken(long tocken) {
		this.token = tocken;
	}
	public Date getCaptureDate() {
		return captureDate;
	}
	public void setCaptureDate(Date captureDate) {
		this.captureDate = captureDate;
	}
	public String getContents() {
		return contents;
	}
	public void setContents(String contents) {
		this.contents = contents;
	}

	
	
}
