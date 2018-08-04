package ummisco.gamaSenseIt.springServer.data.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vividsolutions.jts.geom.Coordinate;
import com.vividsolutions.jts.geom.GeometryFactory;
import com.vividsolutions.jts.geom.Point;

import ummisco.gamaSenseIt.springServer.data.model.Sensor;
import ummisco.gamaSenseIt.springServer.data.model.SensorType;
import ummisco.gamaSenseIt.springServer.data.repositories.ISensorRepository;
import ummisco.gamaSenseIt.springServer.data.repositories.ISensorTypeRepository;

@Service("SensorManagment")
public class SensorManagment implements ISensorManagment{

	@Autowired
	ISensorTypeRepository sensorTypeRepo;
	@Autowired
	ISensorRepository sensorRepo;
	
	@Override
	public void saveData() {
		
		GeometryFactory gf=new GeometryFactory();
		
		SensorType mtype = new SensorType("V1", "typeName");
		sensorTypeRepo.save(mtype);
		
		Point p = gf.createPoint(new Coordinate(12.3, 5.2));
		Sensor s1 = new Sensor("mySensorName",p,mtype);
		sensorRepo.save(s1);
		
	}

}
