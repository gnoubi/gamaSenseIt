package ummisco.gamaSenseIt.springServer.data.model;


import java.nio.ByteBuffer;
import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.ManyToOne;

@Entity
public class SensorData {

	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	long id;
	@Lob
	byte[] data;
	Date captureDate;
	
	@ManyToOne
	ParameterMetadata metaData;
	
	public SensorData() {}

	private SensorData( Date captureDate, ParameterMetadata metaData) {
		super();
		this.captureDate = captureDate;
		this.metaData=metaData;
	}
	public SensorData(double data, Date captureDate, ParameterMetadata metaData) {
		this(captureDate, metaData);
		this.data = ByteBuffer.allocate(Double.BYTES).putDouble(data).array();
	}

	public SensorData(long data, Date captureDate, ParameterMetadata metaData) {
		this(captureDate, metaData);
		this.data = ByteBuffer.allocate(Integer.BYTES).putLong(data).array();
	}

	public SensorData(String data, Date captureDate, ParameterMetadata metaData) {
		this(captureDate, metaData);
		this.data = data.getBytes();
	}

	public byte[] getData() {
		return data;
	}
	public Object getDataObject() {
		return metaData.getDataFormat().convertToObject(data);
	}
	public void setData(byte[] data) {
		this.data = data;
	}
	public String toString()
	{
		return this.getDataObject().toString();
	}
	
	public Date getCaptureDate() {
		return captureDate;
	}

	public void setCaptureDate(Date captureDate) {
		this.captureDate = captureDate;
	}

	public ParameterMetadata getMetaData() {
		return metaData;
	}

	public void setMetaData(ParameterMetadata metaData) {
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
