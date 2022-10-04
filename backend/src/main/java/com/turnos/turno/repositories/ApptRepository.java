package com.turnos.turno.repositories;

import com.turnos.turno.models.appt.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ApptRepository extends JpaRepository<Appointment,Long> {

    List<Appointment> findAllByIniBetween(LocalDateTime apptStart, LocalDateTime apptStartEnd);
}
