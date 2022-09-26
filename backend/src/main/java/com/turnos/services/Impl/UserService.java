package com.turnos.services.Impl;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.transaction.Transactional;

import com.turnos.services.IUserService;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.turnos.repositories.RoleRepository;
import com.turnos.repositories.UserRepository;
import com.turnos.models.entities.Role;
import com.turnos.models.entities.User;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service @RequiredArgsConstructor @Transactional @Slf4j
public class UserService implements IUserService, UserDetailsService {
	private final UserRepository userRepo;
	private final RoleRepository roleRepo;
	private final PasswordEncoder passwordEncoder;
	
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		log.info("El parametro de entrada es: {}",username);
		User user=userRepo.findByUsername(username);
		if(user==null) {
			log.error("Usuario no encontrado en la base de datos");
			throw new UsernameNotFoundException("Usuario no encontrado en la base de datos");
		}else {
			log.info("Usuario encontrado en la DB: {}",username);
		}
		Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
		user.getRoles().forEach(role->{
			authorities.add(new SimpleGrantedAuthority(role.getName()));
		});
		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);//Poner la version corta
	}
	
	
	@Override
	public User saveUser(User user) {
		log.info("Guardando nuevo usuario {} en la BD",user.getUsername());
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		return userRepo.save(user);
	}

	@Override
	public Role saveRole(Role role) {
		log.info("Guardando nuevo role {} en la BD",role.getName());
		return roleRepo.save(role);
	}

	@Override
	public void addRoleToUser(String username, String roleName) {
		log.info("Agregando el role {} al usuario {}",roleName,username);
		User user=userRepo.findByUsername(username);
		Role role=roleRepo.findByName(roleName);
		log.info("E usuario {}",user);
		log.info("El role {}",role);
		user.getRoles().add(role);
	}

	@Override
	public User getUser(String username) {
		log.info("Trayendo el usuario {}",username);
		return userRepo.findByUsername(username);
	}

	@Override
	public List<User> getUsers() {
		log.info("Trayendo todos los usuarios");
		return userRepo.findAll();
	}

	@Override
	public boolean existeUsername(String username) {
		return userRepo.existsByUsername(username);
	}

	@Override
	public boolean existeEmail(String email) {
		return userRepo.existsByEmail(email);
	}

	@Override
	public String traerFotobyUsername(String username) {
		return userRepo.getFotobyUsername(username);
	}

	@Override
	public String traerUsernamebyEmail(String email) {
		return userRepo.getUsernamebyEmail(email);
	}


}
