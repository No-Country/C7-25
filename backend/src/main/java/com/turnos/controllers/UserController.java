package com.turnos.controllers;

import java.net.URI;
import java.util.List;
import java.util.regex.Pattern;

import com.turnos.models.entities.Role;
import com.turnos.models.entities.RoleToUserForm;
import com.turnos.models.entities.User;
import com.turnos.security.CreateJWT;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.turnos.services.IUserService;

import lombok.RequiredArgsConstructor;


@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class UserController {
	private final IUserService userService;

	@Autowired
	private CreateJWT createJWT;

	//Solo para admin
	@GetMapping("/users")
	public ResponseEntity<List<User>>getUsers(){
		return ResponseEntity.ok().body(userService.getUsers());
	}

	@GetMapping("/user/{username}")
	public User traerUsername(@PathVariable String username){
		System.out.println("usuarioController - traerUsername");
		return userService.getUser(username);
	}

	@GetMapping("/usernamelibre/{username}")
	public boolean existeUsername(@PathVariable String username){
		System.out.println("usuarioController - existeUsername");
		return userService.existeUsername(username);
	}

	@GetMapping("/emaillibre/{email}")
	public boolean existeEmail(@PathVariable String email){
		System.out.println("usuarioController - existeEmail");
		return userService.existeEmail(email);
	}
	
	@PostMapping("/singup")
	public ResponseEntity<User>saveUser(@RequestBody User user){//
		System.out.println("usuarioController - saveUser");
		System.out.println(user);

		user.setUsername(user.getEmail());
		URI uri=URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/user/save").toUriString());
		if(existeUsername(user.getEmail()) ){// || existeEmail(user.getEmail())
			System.out.println("Se detecto un problea de seguridad - usuarioController - saveUser 84");
			return null;
		}

		//Verifica el formato
		if( !( /*Pattern.compile("^[a-zA-Z0-9_-]{4,20}$").matcher(user.getUsername()).matches()
				&& */Pattern.compile("^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$").matcher(user.getEmail()).matches()
				&& Pattern.compile("^[a-zA-Z0-9_\\-!@#$%^&*]{4,128}$").matcher(user.getPassword()).matches() )){
			System.out.println("Se detecto un problea de seguridad - usuarioController - saveUser 92");
			return null;
		}

		User usuario = userService.saveUser(user);
		System.out.println(usuario);
		userService.addRoleToUser(usuario.getUsername(),"ROLE_USER");

		return ResponseEntity.created(uri).body(userService.getUser(user.getUsername()));
	}
	
	@PostMapping("/role/save")
	public ResponseEntity<Role>saveRole(@RequestBody Role role){
		System.out.println("usuarioController - saveRole");
		URI uri=URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/api/role/save").toUriString());
		return ResponseEntity.created(uri).body(userService.saveRole(role));
	}
	
	@PostMapping("/role/addtouser")
	public ResponseEntity<?>addRoleToUser(@RequestBody RoleToUserForm form){
		System.out.println("usuarioController - addRoleToUser");
		userService.addRoleToUser(form.getUsername(),form.getRolename());
		return ResponseEntity.ok().build();
	}
}




