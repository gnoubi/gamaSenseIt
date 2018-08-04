package ummisco.gamaSenseIt.springServer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ImportResource;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.transaction.annotation.EnableTransactionManagement;


@SpringBootApplication//(scanBasePackages= {"pam.tp3", "pam.tp1","pam.tp2"})
@EnableWebSecurity
@EnableTransactionManagement
//@ImportResource(value = "classpath:spring/application-config.xml")
public class Application {
	public static void main(String[] args) throws Exception {
		SpringApplication.run(Application.class, args);
		
		
	}
	

}