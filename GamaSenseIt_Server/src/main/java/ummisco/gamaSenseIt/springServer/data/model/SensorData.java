package ummisco.gamaSenseIt.springServer.data.model;


import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;

@Entity
public class SensorData {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	long id;
	double data;
	Date captureDate;
	
	@ManyToOne
	SensorMetaData metaData;
	
	public SensorData() {}

	public SensorData(double data, Date captureDate, SensorMetaData metaData) {
		super();
		this.data = data;
		this.captureDate = captureDate;
		this.metaData=metaData;
	}

	public double getData() {
		return data;
	}

	public void setData(double data) {
		this.data = data;
	}

	public Date getCaptureDate() {
		return captureDate;
	}

	public void setCaptureDate(Date captureDate) {
		this.captureDate = captureDate;
	}

	public SensorMetaData getMetaData() {
		return metaData;
	}

	public void setMetaData(SensorMetaData metaData) {
		this.metaData = metaData;
	}
	
	
/*	void setBlob() throws SerialException, SQLException
	{
		SerialBlob sb = new SerialBlob((new String("tioti")).getBytes());
	}
	
	void loadData()
	{
		Blob blob = rs.getBlob(cloumnName[i]);
		byte[] bdata = blob.getBytes(1, (int) blob.length());
		String s = new String(bdata);
	}
*/	
}
