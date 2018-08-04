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
 String typeName;
 
 

	public SensorType(String version, String typeName) {
		super();
		this.version = version;
		this.typeName = typeName;
	}
	public String getVersion() {
		return version;
	}
	public void setVersion(String version) {
		this.version = version;
	}
	public String getTypeName() {
		return typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	public Long getIdType() {
		return idType;
	}
	public void setIdType(Long idType) {
		this.idType = idType;
	}
	 
 
}
