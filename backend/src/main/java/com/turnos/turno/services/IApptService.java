package com.turnos.turno.services;

import com.turnos.turno.models.appt.Appointment;
import com.turnos.turno.models.appt.ApptSettings;

import java.time.LocalDateTime;
import java.util.List;

public interface IApptService {

    List<Appointment> getAppt();

    List<Appointment> getApptUser(Long id);

    List<Appointment> getApptProf(Long id);

    List<Appointment> getApptTime(LocalDateTime ini, LocalDateTime end);

    Appointment saveAppt(Appointment appointment);

    void deleteAppt(Long id);

    Appointment findAppt(Long id);

    ApptSettings saveApptSettings (ApptSettings apptSettings);

    List<ApptSettings> getApptSettingsService (Long servId);

    List<ApptSettings> getApptSettingsProfessional (Long profId);

    void deleteApptSettings(Long id);
}
