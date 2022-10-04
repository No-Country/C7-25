package com.turnos.turno.repositories;

import com.turnos.turno.models.auth.Role;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RoleRepository extends JpaRepository<Role,Long>{
	Role findByName(String name);
}