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
import javax.persistence.OneToMany;

@Entity
public class SensorMetadata {
	public final static String MEASURE_ORDER_SEPARATOR = ":";
	public final static String DEFAULT_DATA_SEPARATOR =":";
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long idType;
	private String version;
	private String name;
	private String measuredDataOrder;
	private String dataSeparator = ":";
 
	@OneToMany(cascade = CascadeType.ALL,
			fetch = FetchType.EAGER,
	        mappedBy="sensorMetadata")
	private Set<ParameterMetadata> parameterMetaData = new HashSet<>();


	public SensorMetadata() {
	super();
	measuredDataOrder = "";
	this.dataSeparator=DEFAULT_DATA_SEPARATOR;
	
	}
	public SensorMetadata(String name,String version ) {
		this();
		this.version = version;
		this.name = name;
	}
	public SensorMetadata(String name,String version,String sep ) {
		this();
		this.version = version;
		this.name = name;
		this.dataSeparator= sep;
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
	public String getName() {
		return name;
	}
	public void setName(String typeName) {
		this.name = typeName;
	}
	public Long getIdType() {
		return idType;
	}
	public void setIdType(Long idType) {
		this.idType = idType;
	}
	public Set<ParameterMetadata> getParameterMetaData() {
		return parameterMetaData;
	}
	public void setParameterMetaData(Set<ParameterMetadata> parameterMetaData) {
		this.parameterMetaData = parameterMetaData;
	}
	public String getMeasuredDataOrder() {
		return measuredDataOrder;
	}
	public void setMeasuredDataOrder(String measuredDataOrder) {
		this.measuredDataOrder = measuredDataOrder;
	}
	public String getDataSeparator() {
		return dataSeparator;
	}
	public void setDataSeparator(String dataSeparator) {
		this.dataSeparator = dataSeparator;
	}
	public void addmeasuredData(ParameterMetadata md)
	{
		md.setSensorMetadata(this);
		this.measuredDataOrder = this.measuredDataOrder + md.getId()+MEASURE_ORDER_SEPARATOR;
		this.parameterMetaData.add(md);
	}

	public Optional<ParameterMetadata> getParameterMetadata(long id)
	{
		ParameterMetadata res = null;
		for(ParameterMetadata md:this.parameterMetaData){
			if(md.getId()==id)
			{
				res=md;
				break;
			}
		}
		return Optional.ofNullable(res);
	}
}
