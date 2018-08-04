package ummisco.gamaSenseIt.springServer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.ImportResource;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.vividsolutions.jts.geom.GeometryFactory;

import ummisco.gamaSenseIt.springServer.data.services.ISensorManagment;


@SpringBootApplication(scanBasePackages= {"ummisco.gamaSenseIt.springServer.data.model", "ummisco.gamaSenseIt.springServer.data.repositories","ummisco.gamaSenseIt.springServer.data.services"})
@EnableAutoConfiguration
@EnableWebSecurity

@EnableTransactionManagement
@ImportResource(value = "classpath:application-config.xml")
public class Application {
	public static void main(String[] args) throws Exception {
	System.out.println("start server");
	
	//GeometryFactory gf=new GeometryFactory();
	//ApplicationContext context = new ClassPathXmlApplicationContext("classpath:application-config.xml");

	
	ApplicationContext context = SpringApplication.run(Application.class, args);
		//Question 1
		ISensorManagment saver = (ISensorManagment) context.getBean("SensorManagment");
		saver.saveData();
	//	System.out.println(formater.formatMessage(initialMessage));
	       
		
	}
	

}