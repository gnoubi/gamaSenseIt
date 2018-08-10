package ummisco.gamaSenseIt.springServer.data.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class SensorType {

 @Id
 @GeneratedValue(strategy = GenerationType.AUTO)
 Long idType;
 String version;
 String name;
 
 

	public SensorType() {
	super();
}
	public SensorType(String name,String version ) {
		super();
		this.version = version;
		this.name = name;
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
	public String getTypeName() {
		return name;
	}
	public void setTypeName(String typeName) {
		this.name = typeName;
	}
	public Long getIdType() {
		return idType;
	}
	public void setIdType(Long idType) {
		this.idType = idType;
	}
	 
 
}
