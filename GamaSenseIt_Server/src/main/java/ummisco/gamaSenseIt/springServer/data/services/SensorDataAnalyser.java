package ummisco.gamaSenseIt.springServer.data.services;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import ummisco.gamaSenseIt.springServer.data.model.Sensor;
import ummisco.gamaSenseIt.springServer.data.model.SensorData;
import ummisco.gamaSenseIt.springServer.data.model.SensorMetaData;
import ummisco.gamaSenseIt.springServer.data.repositories.ISensorMetaDataRepository;

@Service
public class SensorDataAnalyser implements ISensorDataAnalyser {

	@Autowired 
	ISensorMetaDataRepository metadataRepo;
	@Override
	public List<SensorData> analyseBulkData(String data, Date captureDate, Sensor s) {
		
		ArrayList<SensorData> res = new ArrayList<SensorData>();
		String sep = s.getDataSeparator();
		int i = 0;
		String[] datas= data.split(sep);
		String[] metaDatas = s.getMeasuredDataOrder().split(Sensor.measureOrderSeparator);
		for(String sid:metaDatas) {
			long metaKey = Long.valueOf(sid).longValue();
			double localData = Double.valueOf(datas[i]).doubleValue();
			Optional<SensorMetaData> md = s.getMetadata(metaKey);
			if(md.isPresent())
			{
				SensorData dt = new SensorData(localData,captureDate,md.get());
				res.add(dt);
			}
		}
		return res;
	}

}
