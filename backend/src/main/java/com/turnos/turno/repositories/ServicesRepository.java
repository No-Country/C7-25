package com.turnos.turno.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.turnos.turno.models.home.Service;

public interface ServicesRepository extends JpaRepository<Service, Long> {

}
