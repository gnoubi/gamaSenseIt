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
@RequestMapping("/public/")
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
    @RequestMapping(IDataController.SENSOR_METATA_DATA_FULLNAMES)
    public List<String> getSensorMetaDataName() {
    		ArrayList<String> res = new ArrayList<>();
    		Iterable<SensorMetadata> mt = sensorMetadata.findAll();
    		for(SensorMetadata s:mt)
    		{
    			res.add(s.getName()+" -- "+s.getVersion());
    		}
    		return res;
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
