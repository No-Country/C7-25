package com.turnos.turno.security;

import java.util.List;

import com.turnos.turno.repositories.UserRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;

import lombok.RequiredArgsConstructor;

@Configuration @EnableWebSecurity @RequiredArgsConstructor
public class SecurityConfig {//Para sobreescribir el usuario a loguear
	private final UserDetailsService userDetailsService;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;
	private final UserRepository userRepo;
	private final CreateJWT createJWT;

	@Bean
	SecurityFilterChain SeguridadConfig(HttpSecurity http, AuthenticationManager authenticationManager) throws Exception {
		System.out.println("SeguridadConfig - configure http");
		http.cors().configurationSource(request -> {
			CorsConfiguration cors = new CorsConfiguration();
			cors.setAllowedOrigins(List.of("*"));//"http://localhost:4200", "http://192.168.0.5:4200", ""
			cors.setAllowedMethods(List.of("*"));//"GET","POST", "PUT", "DELETE", "OPTIONS"
			cors.setAllowedHeaders(List.of("*"));
			return cors;
		});
		AuthenticationFilter customAuthenticationFilter=new AuthenticationFilter(authenticationManager, userRepo, createJWT);
		//Cambia la url en la que se realiza el logueo
		customAuthenticationFilter.setFilterProcessesUrl("/auth/login");
		
		http.csrf().disable();
		http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
		http.authorizeRequests().antMatchers(
				"/home/",
				"/auth/login",
				"/auth/signup",
				"/auth/useravailability/**"
		).permitAll();
		http.authorizeRequests().antMatchers(
				"/appt/save",
				"/appt/getapptday/**/**",
				"/appt/apptsettingsservice/**",
				"/appt/userappt",
				"/appt/apptstate/**"
		).hasAnyAuthority("ROLE_USER");
		http.authorizeRequests().antMatchers(
				"/appt/apptsettingsprofessional",
				"/appt/profappt",
				"/appt/savesettings"
		).hasAnyAuthority("ROLE_MANAGER");
		http.authorizeRequests().antMatchers(
				"/home/savehome",
				"/home/savecategory",
				"/home/saveservice/**",
				"/appt/deleteapptsetting/**",
				"/home/deletecategory/**",
				"/home/deleteservice/**",
				"/home/addprofessional/**",
				"/home/deleprofessional/**",
				"/auth/userbyemail/**"
		).hasAnyAuthority("ROLE_ADMIN");
		http.authorizeRequests().anyRequest().authenticated();
		//http.authorizeRequests().anyRequest().permitAll();//permite todo
		//Si se cambia la url del login
		http.addFilter(customAuthenticationFilter);
		http.addFilterBefore(new AuthorizationFilter(createJWT), UsernamePasswordAuthenticationFilter.class);

		return http.build();
	}

	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
		return authenticationConfiguration.getAuthenticationManager();
	}
}
