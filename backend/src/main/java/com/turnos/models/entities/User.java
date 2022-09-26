package com.turnos.models.entities;

import java.util.ArrayList;
import java.util.Collection;

import javax.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity @Data @NoArgsConstructor @AllArgsConstructor
public class User {
	@Id @GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	private String email;
	private String username;
	private String password;
	private String nombre;
	private String apellido;
	private Long dni;

	@ManyToMany(fetch = FetchType.EAGER)
	private Collection<Role> roles = new ArrayList<>();
}
