package com.turnos.turno.services;

import com.turnos.turno.models.appt.Appointment;
import com.turnos.turno.models.appt.ApptSettings;
import com.turnos.turno.repositories.ApptRepository;
import com.turnos.turno.repositories.ApptSettingsRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
@Slf4j
public class ApptService implements IApptService {

    @Autowired
    private ApptRepository apptRepository;

    @Autowired
    private ApptSettingsRepository apptSettingsRepository;

    @Autowired
    private UserService userService;

    @Autowired
    private HomeService homeService;

    @Override
    public List<Appointment> getAppt() {
        List<Appointment> listAppointment = apptRepository.findAll();
        return listAppointment;
    }

    @Override
    public List<Appointment> getApptUser(Long id) {
        List<Appointment> listAppointment = apptRepository.findByUserId(id);
        return listAppointment;
    }

    @Override
    public List<Appointment> getApptProf(Long id) {
        List<Appointment> listAppointment = apptRepository.findByProfessionalId(id);
        return listAppointment;
    }

    @Override
    public List<Appointment> getApptTime(LocalDateTime ini, LocalDateTime end) {
        return apptRepository.findAllByIniBetween(ini, end);
    }

    @Override
    public Appointment saveAppt(Appointment appointment) {
        return apptRepository.save(appointment);
    }

    @Override
    public void deleteAppt(Long id) {
        apptRepository.deleteById(id);
    }

    @Override
    public Appointment findAppt(Long id) {
        Appointment appointment = apptRepository.findById(id).orElse(null);
        return appointment;
    }

    @Override
    public ApptSettings saveApptSettings(ApptSettings apptSettings) {
        return apptSettingsRepository.save(apptSettings);
    }

    @Override
    public List<ApptSettings> getApptSettingsService(Long servId) {
        return apptSettingsRepository.findByServiceId(servId);
        //return apptSettingsRepository.findByProfessionalIdAndServiceId(profId, servId);
    }

    public List<ApptSettings> getApptSettingsProfessional (Long profId){
        return apptSettingsRepository.findByProfessionalId(profId);
        //return apptSettingsRepository.findByProfessionalIdAndServiceId(profId, servId);
    }

    @Override
    public void deleteApptSettings(Long id) {
        apptSettingsRepository.deleteById(id);
    }
}
