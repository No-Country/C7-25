package com.turnos.services;

import com.turnos.models.appt.Appointment;
import com.turnos.repositories.ApptRepository;
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

    @Override
    public List<Appointment> getAppt() {
        List<Appointment> listAppointment = apptRepository.findAll();
        return listAppointment;
    }

    @Override

    public List<Appointment> getApptDay() {
        return null;
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
}
