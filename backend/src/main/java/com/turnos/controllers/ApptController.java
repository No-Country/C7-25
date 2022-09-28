package com.turnos.controllers;

import com.turnos.models.appt.Appointment;
import com.turnos.models.auth.Role;
import com.turnos.services.IApptService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.time.LocalDateTime;

@RestController
@RequestMapping("/appt")
@RequiredArgsConstructor
public class ApptController {
    private final IApptService iApptService;

    @PostMapping("/save")
    public ResponseEntity<Appointment> saveAppt(@RequestBody Appointment appt){
        System.out.println("ApptController - saveAppt");
        URI uri=URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/appt/save").toUriString());
        return ResponseEntity.created(uri).body(iApptService.saveAppt(appt));
    }
}