package ummisco.gamaSenseIt.springServer.qameleo;

import java.util.Map;

import ummisco.gamaSenseIt.springServer.data.model.ParameterMetadata.DataParameter;

public class QameleoData {
  String sensorName;
  double pm1;
  double pm25;
  double pm10;
  double temperature;
  double humidity;
  String displayName;
  String subDisplayName;

  public QameleoData(String sensorName,String dname,String sdname, Map<DataParameter, Double> data) {
    this(sensorName, data.get(DataParameter.PM1), data.get(DataParameter.PM2_5), data.get(DataParameter.PM10),
        data.get(DataParameter.TEMPERATURE), data.get(DataParameter.HUMIDITY),dname,sdname);
  }

  public QameleoData(String sensorName, double pm1, double pm25, double pm10, double temperature, double humidity, String name, String sName) {
    super();
    this.sensorName = sensorName;
    this.pm1 = pm1;
    this.pm25 = pm25;
    this.pm10 = pm10;
    this.temperature = temperature;
    this.humidity = humidity;
    this.displayName = name;
    this.subDisplayName = sName;
  }

  public String getSensorName() {
    return sensorName;
  }

  public void setSensorName(String sensorName) {
    this.sensorName = sensorName;
  }

  public double getPm1() {
    return pm1;
  }

  public void setPm1(double pm1) {
    this.pm1 = pm1;
  }

  public double getPm25() {
    return pm25;
  }

  public void setPm25(double pm25) {
    this.pm25 = pm25;
  }

  public double getPm10() {
    return pm10;
  }

  public void setPm10(double pm10) {
    this.pm10 = pm10;
  }

  public double getTemperature() {
    return temperature;
  }

  public void setTemperature(double temperature) {
    this.temperature = temperature;
  }

  public double getHumidity() {
    return humidity;
  }

  public void setHumidity(double humidity) {
    this.humidity = humidity;
  }

public String getDisplayName() {
	return displayName;
}

public void setDisplayName(String displayName) {
	this.displayName = displayName;
}

public String getSubDisplayName() {
	return subDisplayName;
}

public void setSubDisplayName(String subDisplayName) {
	this.subDisplayName = subDisplayName;
}

}
