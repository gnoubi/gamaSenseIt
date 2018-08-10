package ummisco.gamaSenseIt.springServer.data.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.stereotype.Repository;

import ummisco.gamaSenseIt.springServer.data.model.SensoredBulkData;

@RepositoryRestResource(collectionResourceRel = "bulkData", path = "bulkData")
public interface ISensoredBulkDataRepository extends CrudRepository<SensoredBulkData, Long>{

}
