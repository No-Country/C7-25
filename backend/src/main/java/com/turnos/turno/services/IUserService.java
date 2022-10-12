package com.turnos.turno.services;

import java.util.List;

import com.turnos.turno.models.auth.Role;
import com.turnos.turno.models.auth.User;

public interface IUserService {
	
	User saveUser(User user);
	
	Role saveRole(Role role);
	
	void addRoleToUser(String username,String roleName);//Evitar usuarios duplicados
	
	User getUser(String username);
	
	List<User>getUsers();
	
	boolean existeUsername(String username);

	boolean existeEmail(String email);

}
