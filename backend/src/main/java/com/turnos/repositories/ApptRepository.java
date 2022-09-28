package com.turnos.repositories;

import com.turnos.models.appt.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ApptRepository extends JpaRepository<Appointment,Long> {

}
