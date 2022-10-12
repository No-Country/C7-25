package com.turnos.turno.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.turnos.turno.models.home.Categorie;

public interface CategoryRepository extends JpaRepository<Categorie, Long> {

}
