package ummisco.gamaSenseIt.springServer.data.model;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

public class DisplayableSensorMetaData {
  private Long idType;
  private String name;
  private String version;
  private String dataSeparator;
  private String measuredDataOrder;
  private List<String> parameterMetaData;
  private String description;

  public DisplayableSensorMetaData(Long idType, String name, String version, String dataSeparator,
      String measuredDataOrder, Set<ParameterMetadata> parameterMetaData, String description) {
    super();
    this.idType = idType;
    this.name = name;
    this.version = version;
    this.dataSeparator = dataSeparator;
    this.measuredDataOrder = measuredDataOrder;
    this.parameterMetaData = new ArrayList<String>();
    for (ParameterMetadata pm : parameterMetaData) {
      this.parameterMetaData.add(pm.getVarName());
    }
    this.description = description;
  }

  public DisplayableSensorMetaData(SensorMetadata s) {
    this(s.getIdType(), s.getName(), s.getVersion(), s.getDataSeparator(), s.getMeasuredDataOrder(),
        s.getParameterMetaData(), s.getDescription());
  }

  public Long getIdType() {
    return idType;
  }

  public void setIdType(Long idType) {
    this.idType = idType;
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

  public void setName(String name) {
    this.name = name;
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

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

}
