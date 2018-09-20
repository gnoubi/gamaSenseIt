package ummisco.gamaSenseIt.springServer.data.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import ummisco.gamaSenseIt.springServer.data.model.SensorData;

@RepositoryRestResource(collectionResourceRel = "sensorData", path = "sensorData")
public interface ISensorDataRepository extends CrudRepository<SensorData, Long>{

}
