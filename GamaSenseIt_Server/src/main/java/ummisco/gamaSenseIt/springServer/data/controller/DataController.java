package ummisco.gamaSenseIt.springServer.data.controller;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ummisco.gamaSenseIt.springServer.data.model.SensorMetaData;
import ummisco.gamaSenseIt.springServer.data.model.SensorType;
import ummisco.gamaSenseIt.springServer.data.model.SensorMetaData.DataFormat;
import ummisco.gamaSenseIt.springServer.data.model.SensorMetaData.DataParameter;
import ummisco.gamaSenseIt.springServer.data.model.Sensor;
import ummisco.gamaSenseIt.springServer.data.repositories.ISensorRepository;
import ummisco.gamaSenseIt.springServer.data.repositories.ISensorTypeRepository;
import ummisco.gamaSenseIt.springServer.data.services.ISensorManagment;

@RestController
public class DataController {
	final static String NIL_VALUE = "nil";
	
	
	@Autowired
	ISensorRepository sensors;
	
	@Autowired
	ISensorManagment sensorManagmentService;
	
	@Autowired
	ISensorTypeRepository sensorTypeRepo;
	
	public DataController()
	{
	}
	
	private Sensor findSensor(String id, String name)
	{
		Sensor s = null;
    	if(!id.equals("nil"))
    	{
    		Optional<Sensor>  o=sensors.findById(Long.valueOf(id).longValue());
    		if(o.isPresent())
    			s = o.get();
    	}
    	else
    	{
    		List<Sensor> ls =  sensors.findByName(name);
        	if(ls.size()>0)
        		s = ls.get(0);
    	}
    	return s;
	}
	
	private Sensor findSensor(String id)
	{
    	Long lid = null;
    	Sensor s = null;
    	try {
    		lid = Long.valueOf(id);
    		 s = sensors.findById(lid.longValue()).get();
    	} catch(NumberFormatException e)
    	{
    		return null;
    	}
    	return s;
	}
	
	@RequestMapping("/addSensor")
	public Sensor addSensor(@RequestParam(value="sensorname", required=true, defaultValue=NIL_VALUE) String name, 
			@RequestParam(value="longitude", required=true, defaultValue="0") double longi,
			@RequestParam(value="latitude", required=true, defaultValue="0") double lat,
			@RequestParam(value="sensorType", required=true) long idSensorType){
		
		Optional<SensorType> type = sensorTypeRepo.findById(idSensorType);
		
		if(!type.isPresent())
			return null;
		
		List<Sensor> selectedSensor = sensors.findByName(name);
		if(!selectedSensor.isEmpty())
			return selectedSensor.get(0);
	
		Optional<SensorType> st= sensorTypeRepo.findById(idSensorType);
		//if(sensorManagmentService.)
		if(!st.isPresent())
			return null;
		
		Sensor s = new Sensor(name, longi,lat, st.get());
		sensors.save(s);
		return s;
	}
	
    @RequestMapping("/updateSensor")
    public Sensor updateSensor(@RequestParam(value="id", required=true) String id,
    			@RequestParam(value="sensorname", required=false, defaultValue=NIL_VALUE) String name, 
    			@RequestParam(value="longitude", required=false, defaultValue=NIL_VALUE) String longi,
    			@RequestParam(value="latitude", required=false, defaultValue=NIL_VALUE) String lat ){
    	
    	Sensor s =findSensor(id);
    	if(s == null)
    		return null;
    	
    	if(!name.equals(NIL_VALUE))
    	{
    		s.setName(name);
    	}
    	if(!longi.equals(NIL_VALUE))
    	{
    		double data = Double.valueOf(longi).doubleValue();
    		s.setLongitude(data);
    	}
    	if(!lat.equals(NIL_VALUE))
    	{
    		double data = Double.valueOf(lat).doubleValue();
    		s.setLatitude(data);
    	}
    	sensors.save(s);
        return s;
    }
	
    @RequestMapping("/addMetadata")
    public SensorMetaData addSensorMetaData(@RequestParam(value="id",required=true, defaultValue="nil") String id,
    		@RequestParam(value="varname", required=true, defaultValue="nil") String varName,
    		@RequestParam(value="varunit", required=true, defaultValue="nil") String varUnit,
    		@RequestParam(value="varFormat", required=true, defaultValue="nil") String varFormat,
    		@RequestParam(value="mesuredParameter", required=true, defaultValue="nil") String mesuredParameter
			)
    {
    	Sensor s = findSensor(id);
    	if(s == null)
    		return null;
    	
    	DataFormat df = null;
    	DataParameter dp = null;
    	try {
    			df = DataFormat.valueOf(varFormat);
    			dp = DataParameter.valueOf(mesuredParameter);
    	}catch(IllegalArgumentException e)
    	{
    		return null;
    	}
    	SensorMetaData smd = new SensorMetaData(varName, varUnit, df, dp);
    	sensorManagmentService.addSensorMetaData(s, smd);
    	return smd;
    }
	

}
