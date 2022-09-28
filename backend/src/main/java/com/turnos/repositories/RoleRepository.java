package com.turnos.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.turnos.models.auth.Role;

public interface RoleRepository extends JpaRepository<Role,Long>{
	Role findByName(String name);
}