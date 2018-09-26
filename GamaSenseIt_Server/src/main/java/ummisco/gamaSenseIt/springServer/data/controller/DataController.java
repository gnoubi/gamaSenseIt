package ummisco.gamaSenseIt.springServer.data.controller;

import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import ummisco.gamaSenseIt.springServer.data.model.DisplayedData;
import ummisco.gamaSenseIt.springServer.data.model.DisplayedParameterMetaData;
import ummisco.gamaSenseIt.springServer.data.model.DisplayedSensor;
import ummisco.gamaSenseIt.springServer.data.model.ParameterMetadata;
import ummisco.gamaSenseIt.springServer.data.model.SensorMetadata;
import ummisco.gamaSenseIt.springServer.data.model.ParameterMetadata.DataFormat;
import ummisco.gamaSenseIt.springServer.data.model.ParameterMetadata.DataParameter;
import ummisco.gamaSenseIt.springServer.data.model.Sensor;
import ummisco.gamaSenseIt.springServer.data.model.SensorData;
import ummisco.gamaSenseIt.springServer.data.repositories.ISensorRepository;
import ummisco.gamaSenseIt.springServer.data.repositories.ISensorDataRepository;
import ummisco.gamaSenseIt.springServer.data.repositories.ISensorMetadataRepository;
import ummisco.gamaSenseIt.springServer.data.services.ISensorManagment;

@RestController
public class DataController {
	final static String NIL_VALUE = "nil";
	
	
	@Autowired
	ISensorRepository sensors;
	
	@Autowired
	ISensorMetadataRepository sensorMetadata;
	
	@Autowired
	ISensorManagment sensorManagmentService;
	
	@Autowired
	ISensorMetadataRepository sensorTypeRepo;
	
	@Autowired
	ISensorDataRepository sensorData;
	
	
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
	public DisplayedSensor addSensor(@RequestParam(value="sensorname", required=true, defaultValue=NIL_VALUE) String name, 
			@RequestParam(value="longitude", required=true, defaultValue="0") double longi,
			@RequestParam(value="latitude", required=true, defaultValue="0") double lat,
			@RequestParam(value="sensormetadata", required=true) long idSensorType){
		
		Optional<SensorMetadata> type = sensorTypeRepo.findById(idSensorType);
		
		if(!type.isPresent())
			return null;
		
		List<Sensor> selectedSensor = sensors.findByName(name);
		if(!selectedSensor.isEmpty())
			return new DisplayedSensor(selectedSensor.get(0));
	
		Optional<SensorMetadata> st= sensorTypeRepo.findById(idSensorType);
		//if(sensorManagmentService.)
		if(!st.isPresent())
			return null;
		
		Sensor s = new Sensor(name, longi,lat, st.get());
		sensors.save(s);
		return new DisplayedSensor(s);
	}
	
    @RequestMapping("/updateSensor")
    public DisplayedSensor updateSensor(@RequestParam(value="id", required=true) String id,
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
        return new DisplayedSensor(s);
    }
	
    @RequestMapping("/addSensorMetadata")
    public SensorMetadata addSensorMetaData(
    		@RequestParam(value="name", required=true) String varName,
    		@RequestParam(value="version", required=true) String version,
    		@RequestParam(value="dataseparator", required=false, defaultValue=SensorMetadata.DEFAULT_DATA_SEPARATOR) String sep)
    {
    	List<SensorMetadata> lsm = sensorMetadata.findByNameAndVersion(varName, version);
    	SensorMetadata st = null;
    	if(lsm.size()==0) {
    		st = new SensorMetadata(varName, version,sep);
    		st= this.sensorMetadata.save(st);
    	}
    	
    	return st;
    }
    
    
    
    @RequestMapping("/addParameterMetadata")
    public DisplayedParameterMetaData addParameterMetadata(
    		@RequestParam(value="sensorMetadata", required=true, defaultValue="nil") long id,
    		@RequestParam(value="varname", required=true, defaultValue="nil") String varName,
    		@RequestParam(value="varunit", required=true, defaultValue="nil") String varUnit,
    		@RequestParam(value="varFormat", required=true, defaultValue="nil") String varFormat,
    		@RequestParam(value="mesuredParameter", required=true, defaultValue="nil") String mesuredParameter
    		)
    {
    	Optional<SensorMetadata> md= sensorMetadata.findById(id);
    	if(!md.isPresent())
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
    	ParameterMetadata smd = new ParameterMetadata(varName, varUnit, df, dp);
    	smd = sensorManagmentService.addParameterToSensorMetadata(md.get(), smd);
    	return new DisplayedParameterMetaData(smd);
    }
	
    @CrossOrigin
    @RequestMapping(value="/sensorDataafterDate",  method= {RequestMethod.POST,RequestMethod.GET, RequestMethod.OPTIONS},produces = MediaType.APPLICATION_JSON_VALUE )
    public List<DisplayedData> getDataAfter(    		
    		@RequestParam(value="idsensor", required=true) long id,
    		@RequestParam(value="idparameter", required=true) long idParam,
    		@RequestParam(value="startdate") @DateTimeFormat(pattern="MMddyyyy") Date start)

    {
    	Calendar dte = Calendar.getInstance();
    	dte.add(Calendar.DAY_OF_MONTH, 1);
    	return getDataBetween(id, idParam,start,dte.getTime() );
    }
    
    @CrossOrigin
    @RequestMapping("/sensorDataBetweenDates")
    public List<DisplayedData> getDataBetween(
    		
    		@RequestParam(value="idsensor", required=true) long id,
    		@RequestParam(value="idparameter", required=true) long idParam,
    		@RequestParam(value="startdate") @DateTimeFormat(pattern="MM/dd/yyyy") Date start,
    		@RequestParam(value="enddate") @DateTimeFormat(pattern="MM/dd/yyyy") Date enddate)
    {
    	
    	List<DisplayedData> dpl = new ArrayList<DisplayedData>();
    	List<SensorData> dts = this.sensorData.findAllByDate(id,idParam,start, enddate);
    	
    	for(SensorData dt: dts)
    		dpl.add(new DisplayedData(dt.getDataObject().toString(),dt.getCaptureDate().toString(),dt.getParameter().getUnit()));
    	return dpl;
    }

}
