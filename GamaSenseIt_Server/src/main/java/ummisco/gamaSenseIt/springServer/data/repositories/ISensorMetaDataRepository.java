package ummisco.gamaSenseIt.springServer.data.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import ummisco.gamaSenseIt.springServer.data.model.SensorMetaData;

@Repository
public interface ISensorMetaDataRepository extends CrudRepository<SensorMetaData, Long>{

}
