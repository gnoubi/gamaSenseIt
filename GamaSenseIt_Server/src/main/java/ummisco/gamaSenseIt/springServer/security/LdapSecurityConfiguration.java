package ummisco.gamaSenseIt.springServer.security;

import java.util.Arrays;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.LdapShaPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.ldap.DefaultSpringSecurityContextSource;


@Configuration
public class LdapSecurityConfiguration  extends WebSecurityConfigurerAdapter {

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		 http.authorizeRequests().antMatchers("/","/public/**","/qameleo/**","/private/**").permitAll()
         .anyRequest().authenticated()
         .and()
         .formLogin()
         .and()
         .logout().permitAll();
		 
		
//	http
//			.authorizeRequests()
//				.anyRequest().fullyAuthenticated()
//				.and()
//			.formLogin();
	}

	
	
	@Override
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth
			.ldapAuthentication()
				.userDnPatterns("uid={0},ou=people")
				.groupSearchBase("ou=groups")
				.contextSource(contextSource())
				.passwordCompare()
					.passwordEncoder(new LdapShaPasswordEncoder())
					.passwordAttribute("userPassword");
	}

	@Bean
	public DefaultSpringSecurityContextSource contextSource() {
		return  new DefaultSpringSecurityContextSource(Arrays.asList("ldap://localhost:8389/"), "dc=springframework,dc=org");
	}
	
	@Bean(name = "passwordEncoder")
	public PasswordEncoder getPasswordEncoder(){
	    return new BCryptPasswordEncoder();     
	 }
	
//     http.authorizeRequests().antMatchers("/", "/home").permitAll().anyRequest().authenticated();
 //    http.formLogin().loginPage("/login").permitAll().and().logout().logoutSuccessUrl("/");
 

}