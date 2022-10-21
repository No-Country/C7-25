package com.turnos.turno.repositories;

import com.turnos.turno.models.home.Home;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HomeRepository extends JpaRepository<Home,Long> {
    Home getByRoute(String route);
}
