package com.turnos.security;

import java.util.List;

import com.turnos.repositories.UserRepository;
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
		/*http.authorizeRequests().antMatchers(
				"/auth/login",
				"/auth/user/save",
				"/auth/usernamelibre/**",
				"/auth/emaillibre/**",
				"/auth/token/refresh"
		).permitAll();
		http.authorizeRequests().antMatchers(
				"/auth/users"
		).hasAnyAuthority("ROLE_ADMIN");
		http.authorizeRequests().antMatchers(
				"/auth/foto",
				"/auth/user/**",
				"/auth/user/save/**"
		).hasAnyAuthority("ROLE_USER");*/
		//http.authorizeRequests().anyRequest().authenticated();
		http.authorizeRequests().anyRequest().permitAll();//permite todo
		//Si no se cambia la url del login
		//http.addFilter(new CustomAuthenticationFilter(authenticationManagerBean()));
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
