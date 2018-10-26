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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import ummisco.gamaSenseIt.springServer.data.model.DisplayableData;
import ummisco.gamaSenseIt.springServer.data.model.DisplayableParameterMetaData;
import ummisco.gamaSenseIt.springServer.data.model.DisplayableSensor;
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
	
	private Sensor findSensor(long id)
	{
    	Long lid = null;
    	Sensor s = null;
    	try {
    		lid = Long.valueOf(id);
    		 s = sensors.findById(lid).get();
    	} catch(NumberFormatException e)
    	{
    		return null;
    	}
    	return s;
	}
	
    @CrossOrigin
	@RequestMapping(IDataController.ADD_SENSOR)
    public DisplayableSensor addSensor(@RequestParam(value=IDataController.NAME, required=true, defaultValue=NIL_VALUE) String name, 
			@RequestParam(value=IDataController.LONGITUDE, required=true, defaultValue="0") double longi,
			@RequestParam(value=IDataController.LATITUDE, required=true, defaultValue="0") double lat,
			@RequestParam(value=IDataController.SENSOR_METADATA, required=true) long idSensorType){
		
		Optional<SensorMetadata> type = sensorTypeRepo.findById(idSensorType);
		
		if(!type.isPresent())
			return null;
		
		List<Sensor> selectedSensor = sensors.findByName(name);
		if(!selectedSensor.isEmpty())
			return new DisplayableSensor(selectedSensor.get(0));
	
		Optional<SensorMetadata> st= sensorTypeRepo.findById(idSensorType);
		//if(sensorManagmentService.)
		if(!st.isPresent())
			return null;
		
		Sensor s = new Sensor(name, longi,lat, st.get());
		sensors.save(s);
		return new DisplayableSensor(s);
	}
	
    @CrossOrigin	
    @RequestMapping(IDataController.UPDATE_SENSOR)
    public DisplayableSensor updateSensor(@RequestParam(value=IDataController.SENSOR_ID, required=true) long id,
    			@RequestParam(value=IDataController.NAME, required=false, defaultValue=NIL_VALUE) String name, 
    			@RequestParam(value=IDataController.LONGITUDE, required=false, defaultValue=NIL_VALUE) String longi,
    			@RequestParam(value=IDataController.LATITUDE, required=false, defaultValue=NIL_VALUE) String lat ){
    	
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
        return new DisplayableSensor(s);
    }
    @CrossOrigin	
    @RequestMapping(IDataController.ADD_SENSOR_METADATA)
    public SensorMetadata addSensorMetaData(
    		@RequestParam(value=IDataController.NAME, required=true) String varName,
    		@RequestParam(value=IDataController.VERSION, required=true) String version,
    		@RequestParam(value=IDataController.DATA_SEPARATOR, required=false, defaultValue=SensorMetadata.DEFAULT_DATA_SEPARATOR) String sep)
    {
    	List<SensorMetadata> lsm = sensorMetadata.findByNameAndVersion(varName, version);
    	SensorMetadata st = null;
    	if(lsm.size()==0) {
    		st = new SensorMetadata(varName, version,sep);
    		st= this.sensorMetadata.save(st);
    	}
    	
    	return st;
    }
    
    
    @CrossOrigin
    @RequestMapping(IDataController.ADD_PARAMETER_META_DATA)
    public DisplayableParameterMetaData addParameterMetadata(
    		@RequestParam(value=IDataController.METADATA_ID, required=true, defaultValue="nil") long id,
    		@RequestParam(value=IDataController.NAME, required=true, defaultValue="nil") String varName,
    		@RequestParam(value=IDataController.UNIT, required=true, defaultValue="nil") String varUnit,
    		@RequestParam(value=IDataController.DATA_FORMAT, required=true, defaultValue="nil") String varFormat,
    		@RequestParam(value=IDataController.MEASURED_PARAMETER, required=true, defaultValue="nil") String mesuredParameter
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
    	return new DisplayableParameterMetaData(smd);
    }
	
    @CrossOrigin
    @RequestMapping(value=IDataController.SENSOR_DATA_SINCE_DATE,  method= {RequestMethod.POST,RequestMethod.GET, RequestMethod.OPTIONS},produces = MediaType.APPLICATION_JSON_VALUE )
    public List<DisplayableData> getDataAfter(    		
    		@RequestParam(value=IDataController.SENSOR_ID, required=true) long id,
    		@RequestParam(value=IDataController.PARAMETER_ID, required=true) long idParam,
    		@RequestParam(value=IDataController.BEGIN_DATE) @DateTimeFormat(pattern=IDataController.DATE_PATTERN) Date start)

    {
    	Calendar dte = Calendar.getInstance();
    	dte.add(Calendar.DAY_OF_MONTH, 1);
    	return getDataBetween(id, idParam,start,dte.getTime() );
    }
    
    @CrossOrigin
    @RequestMapping(value=IDataController.SENSOR_DATA_BETWEEN_DATES)
    public List<DisplayableData> getDataBetween(
    		
    		@RequestParam(value=IDataController.SENSOR_ID, required=true) long id,
    		@RequestParam(value=IDataController.PARAMETER_ID, required=true) long idParam,
    		@RequestParam(value=IDataController.BEGIN_DATE) @DateTimeFormat(pattern=IDataController.DATE_PATTERN) Date start,
    		@RequestParam(value=IDataController.END_DATE) @DateTimeFormat(pattern=IDataController.DATE_PATTERN) Date enddate)
    {
    	
    	List<DisplayableData> dpl = new ArrayList<DisplayableData>();
    	List<SensorData> dts = this.sensorData.findAllByDate(id,idParam,start, enddate);
    	return buildList(dts);
    }
 
    @CrossOrigin
    @RequestMapping(value=IDataController.SENSOR_DATA)
    public List<DisplayableData> getDataBetween()
    {
    	Iterable<SensorData> dts = this.sensorData.findAll();
    	return buildList(dts);
    	
    }
    
    private List<DisplayableData> buildList(Iterable<SensorData> dts)
    {
    	List<DisplayableData> dpl = new ArrayList<DisplayableData>();
    	for(SensorData dt: dts)
    	{
    		DisplayableData data = new DisplayableData(dt.getDataObject(), 
    									dt.getCaptureDate(),
    									dt.getParameter().getUnit(),
    									dt.getSensor().getName(),
    									dt.getSensor().getLatitude(),
    									dt.getSensor().getLongitude(),
    									dt.getParameter().getParameter().toString());

    		dpl.add(data);
    		
    	}
    	return dpl;
    }
    

}