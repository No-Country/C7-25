package com.turnos.turno.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.turnos.turno.repositories.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.HashMap;
import java.util.Map;

@Slf4j
public class AuthenticationFilter extends UsernamePasswordAuthenticationFilter{
	
	private final AuthenticationManager authenticationManager;
	private final UserRepository userRepo;
	private final CreateJWT createJWT;

	public AuthenticationFilter(AuthenticationManager authenticationManager, UserRepository userRepo, CreateJWT createJWT) {
		System.out.println("AutenticacionFiltro - AutenticacionFiltro");
		this.authenticationManager=authenticationManager;
		this.userRepo = userRepo;
		this.createJWT = createJWT;
	}

	@Override
	public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response)
			throws AuthenticationException {
		System.out.println("AutenticacionFiltro - attemptAuthentication");
		String username=request.getParameter("email");
		String password=request.getParameter("password");
		log.info("AutenticacionFiltro - attemptAuthentication - Username is: {}", username);
		log.info("AutenticacionFiltro - attemptAuthentication - Password is: {}", password);
		UsernamePasswordAuthenticationToken authenticationToken=new UsernamePasswordAuthenticationToken(username, password);
		return authenticationManager.authenticate(authenticationToken);
	}

	@Override
	protected void successfulAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain chain,
			Authentication authentication) throws IOException, ServletException {
		System.out.println("AutenticacionFiltro - successfulAuthentication");

		String token= createJWT.crearToken(request, authentication);
		log.info("AutenticacionFiltro - successfulAuthentication - token: {}", token);
		Map<String, String> tokens=new HashMap<>();
		tokens.put("token", token);
		String username=request.getParameter("email");
		log.info("AutenticacionFiltro - successfulAuthentication - El user del token es: {}", username);
		tokens.put("email", username);
		
		response.setContentType(MediaType.APPLICATION_JSON_VALUE);
		new ObjectMapper().writeValue(response.getOutputStream(), tokens);
	}
}
