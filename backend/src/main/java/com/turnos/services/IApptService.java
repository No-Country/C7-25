package com.turnos.services;

import com.turnos.models.appt.Appointment;

import java.time.LocalDateTime;
import java.util.List;

public interface IApptService {

    List<Appointment> getAppt();

    List<Appointment> getApptDay();

    Appointment saveAppt(Appointment appointment);

    void deleteAppt(Long id);

    Appointment findAppt(Long id);

}
