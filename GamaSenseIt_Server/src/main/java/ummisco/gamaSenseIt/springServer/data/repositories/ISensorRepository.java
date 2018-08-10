package ummisco.gamaSenseIt.springServer.data.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import ummisco.gamaSenseIt.springServer.data.model.Sensor;

@Repository
public interface ISensorRepository extends CrudRepository<Sensor, Long>{
	List<Sensor> findByName(String name);
}
