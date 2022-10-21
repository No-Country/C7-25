package com.turnos.turno.services;

import java.util.List;

import com.turnos.turno.models.auth.Role;
import com.turnos.turno.models.auth.User;

public interface IUserService {
	
	User saveUser(User user);
	
	Role saveRole(Role role);
	
	void addRoleToUser(String username,String roleName);//Evitar usuarios duplicados

	void removeRoleToUser(Long userid,String roleName);
	
	User getUser(String username);

	User getUserById(Long id);
	
	List<User>getUsers();
	
	boolean existeUsername(String username);

	boolean existeEmail(String email);

}
