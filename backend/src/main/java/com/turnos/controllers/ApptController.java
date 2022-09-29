package com.turnos.controllers;

import com.turnos.models.appt.Appointment;
import com.turnos.models.auth.Role;
import com.turnos.services.IApptService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.List;

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

    //Trae los turnos de un periodo del tiempo para el calendario
    @GetMapping("/getapptday/{date}")
    public ResponseEntity<List<Appointment>> getApptDay(){
        URI uri=URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/appt/getapptday").toUriString());
        return ResponseEntity.created(uri).body(iApptService.getAppt());
    }

    @GetMapping("/userappt")
    public ResponseEntity<List<Appointment>> getUserAppt(){
        URI uri=URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/appt/userappt").toUriString());
        return ResponseEntity.created(uri).body(iApptService.getAppt());
    }
}