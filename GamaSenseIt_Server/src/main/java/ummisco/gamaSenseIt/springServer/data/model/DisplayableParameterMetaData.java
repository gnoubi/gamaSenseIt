package ummisco.gamaSenseIt.springServer.data.model;

import ummisco.gamaSenseIt.springServer.data.model.ParameterMetadata.DataFormat;
import ummisco.gamaSenseIt.springServer.data.model.ParameterMetadata.DataParameter;

public class DisplayableParameterMetaData {
  private long id;
  private String varName;
  private String unit;
  private DataFormat dataFormat;
  private DataParameter parameter;
  private long sensorMetadata;
  private String icon;

  public DisplayableParameterMetaData(long id, String varName, String unit, DataFormat dataFormat,
      DataParameter parameter, long sensorMetadata, String icon) {
    super();
    this.id = id;
    this.varName = varName;
    this.unit = unit;
    this.dataFormat = dataFormat;
    this.parameter = parameter;
    this.sensorMetadata = sensorMetadata;
    this.icon = icon;
  }

  public DisplayableParameterMetaData(ParameterMetadata mt) {
    this(mt.getId(), mt.getVarName(), mt.getUnit(), mt.getDataFormat(), mt.getParameter(),
        mt.getSensorMetadata().getIdType(), mt.getIcon());
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

  public DataFormat getDataFormat() {
    return dataFormat;
  }

  public void setDataFormat(DataFormat dataFormat) {
    this.dataFormat = dataFormat;
  }

  public DataParameter getParameter() {
    return parameter;
  }

  public void setParameter(DataParameter parameter) {
    this.parameter = parameter;
  }

  public long getSensorMetadata() {
    return sensorMetadata;
  }

  public void setSensorMetadata(long sensorMetadata) {
    this.sensorMetadata = sensorMetadata;
  }

  public String getIcon() {
    return icon;
  }

  public void setIcon(String icon) {
    this.icon = icon;
  }
}
