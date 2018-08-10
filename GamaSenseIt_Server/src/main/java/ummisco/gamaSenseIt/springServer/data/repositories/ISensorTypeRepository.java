package ummisco.gamaSenseIt.springServer.data.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import ummisco.gamaSenseIt.springServer.data.model.SensorType;


@Repository
public interface ISensorTypeRepository extends CrudRepository<SensorType, Long>{
	List<SensorType> findByNameAndVersion(String name, String version);
}
