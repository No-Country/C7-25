package com.turnos.turno.controllers;

import com.turnos.turno.models.appt.Appointment;
import com.turnos.turno.services.IApptService;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
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
    @GetMapping("/getapptday/{date1}/{date2}")//
    public ResponseEntity<List<Appointment>> getApptTime(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime date1, @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime date2){//
        System.out.println("en getApptTime");
        System.out.println(date1);
        System.out.println(date2);
        URI uri=URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/appt/getapptday").toUriString());
        return ResponseEntity.created(uri).body(iApptService.getApptTime(date1,date2));
    }

    @GetMapping("/userappt")
    public ResponseEntity<List<Appointment>> getUserAppt(){
        URI uri=URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/appt/userappt").toUriString());
        return ResponseEntity.created(uri).body(iApptService.getAppt());
    }
}