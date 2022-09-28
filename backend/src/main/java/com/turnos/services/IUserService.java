package com.turnos.services;

import java.util.List;

import com.turnos.models.auth.Role;
import com.turnos.models.auth.User;

public interface IUserService {
	
	User saveUser(User user);
	
	Role saveRole(Role role);
	
	void addRoleToUser(String username,String roleName);//Evitar usuarios duplicados
	
	User getUser(String username);
	
	List<User>getUsers();
	
	boolean existeUsername(String username);

	boolean existeEmail(String email);

	String traerUsernamebyEmail(String email);
}
