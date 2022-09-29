package com.turnos.repositories;

import com.turnos.models.appt.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ApptRepository extends JpaRepository<Appointment,Long> {

    List<Appointment> findAllByInitBetween(LocalDateTime apptStart, LocalDateTime apptStartEnd);
}
