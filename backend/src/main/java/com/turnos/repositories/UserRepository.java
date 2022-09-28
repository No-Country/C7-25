package com.turnos.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.turnos.models.auth.User;

public interface UserRepository extends JpaRepository<User,Long>{
	
	User findByUsername(String username);

	Boolean existsByUsername(String username);

	Boolean existsByEmail(String email);

	@Query(value = "SELECT username FROM usuario WHERE email=?1", nativeQuery = true)
	String getUsernamebyEmail(String email);

}