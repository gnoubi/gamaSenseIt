package ummisco.gamaSenseIt.springServer;

import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties(prefix = "gamaSenseIt")
public class GamaSenseItProperties {
  public String brokerUrl;
  public String brokerUsername;
  public String brokerPassword;
  public String brokerTopic;

  public String getBrokerTopic() {
    return brokerTopic;
  }

  public void setBrokerTopic(String brokerTopic) {
    this.brokerTopic = brokerTopic;
  }

  public String getBrokerUrl() {
    return brokerUrl;
  }

  public void setBrokerUrl(String brokerUrl) {
    this.brokerUrl = brokerUrl;
  }

  public String getBrokerUsername() {
    return brokerUsername;
  }

  public void setBrokerUsername(String brokerUsername) {
    this.brokerUsername = brokerUsername;
  }

  public String getBrokerPassword() {
    return brokerPassword;
  }

  public void setBrokerPassword(String brokerPassword) {
    this.brokerPassword = brokerPassword;
  }
}