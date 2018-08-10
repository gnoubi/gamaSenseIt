package ummisco.gamaSenseIt.springServer.data.services;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vividsolutions.jts.geom.Coordinate;
import com.vividsolutions.jts.geom.GeometryFactory;
import com.vividsolutions.jts.geom.Point;

import ummisco.gamaSenseIt.springServer.data.model.Sensor;
import ummisco.gamaSenseIt.springServer.data.model.SensorType;
import ummisco.gamaSenseIt.springServer.data.model.SensoredBulkData;
import ummisco.gamaSenseIt.springServer.data.repositories.ISensorRepository;
import ummisco.gamaSenseIt.springServer.data.repositories.ISensorTypeRepository;
import ummisco.gamaSenseIt.springServer.data.repositories.ISensoredBulkDataRepository;

@Service("SensorManagment")
public class SensorManagment implements ISensorManagment{

	@Autowired
	ISensorTypeRepository sensorTypeRepo;
	@Autowired
	ISensorRepository sensorRepo;
	@Autowired
	ISensoredBulkDataRepository bulkDataRepo;
	
	@Override
	public void saveDefaultSensorInit() {
		
		GeometryFactory gf=new GeometryFactory();
		
		SensorType mtype = new SensorType( DEFAULT_SENSOR_TYPE_NAME,DEFAULT_SENSOR_VERSION);
		sensorTypeRepo.save(mtype);
		
		Point p = gf.createPoint(new Coordinate(12.3, 5.2));
		Sensor s1 = new Sensor(DEFAULT_SENSOR_NAME,p,mtype);
		sensorRepo.save(s1);
	}
	@Override
	public void saveData(String message, Date date) {
		
		System.out.println("avant message "+message);
		
	 	String[] data = message.split(";");
		
	 	long capturedateS=Long.valueOf(data[0]).longValue();
	 	String sensorName=data[1];
	 	long token=Long.valueOf(data[2]).longValue();
	 	String contents=data[3];
	 	List<Sensor> foundSensors = sensorRepo.findByName(sensorName);
	 	Sensor selectedSensor = null;
	 	if(foundSensors.isEmpty())
	 	{
			SensorType typeSens = sensorTypeRepo.findByNameAndVersion(DEFAULT_SENSOR_TYPE_NAME,DEFAULT_SENSOR_VERSION).get(0);
	 		GeometryFactory gf=new GeometryFactory();
			Point p = gf.createPoint(new Coordinate(0, 0));
			selectedSensor = new Sensor(sensorName,p,typeSens);
			sensorRepo.save(selectedSensor);
	 	}
	 	else
	 	{
	 		selectedSensor = foundSensors.get(0);
	 	}
		
	 	Date capturedate = new Date(capturedateS);
	 	
	 	System.out.println("Data to store "+ token+" " +capturedate+ " "+contents);
	 	
	 	SensoredBulkData bulkData = new SensoredBulkData(selectedSensor,token,capturedate,date,contents);
	 	bulkDataRepo.save(bulkData);
	}
}
