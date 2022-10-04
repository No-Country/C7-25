package com.turnos.turno.services;

import com.turnos.turno.models.appt.Appointment;

import java.time.LocalDateTime;
import java.util.List;

public interface IApptService {

    List<Appointment> getAppt();

    List<Appointment> getApptTime(LocalDateTime ini,LocalDateTime end);

    Appointment saveAppt(Appointment appointment);

    void deleteAppt(Long id);

    Appointment findAppt(Long id);

}
