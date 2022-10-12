package com.turnos.turno.controllers;

import com.turnos.turno.models.appt.Appointment;
import com.turnos.turno.models.appt.ApptSettings;
import com.turnos.turno.models.auth.User;
import com.turnos.turno.services.IApptService;
import com.turnos.turno.services.IHomeService;
import com.turnos.turno.services.IUserService;
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
    private final IApptService apptService;
    private final IHomeService homeService;
    private final IUserService userService;


    @PostMapping("/save")
    public ResponseEntity<Appointment> saveAppt(@RequestBody Appointment appt){
        System.out.println("ApptController - saveAppt");
        appt.setUserId(2L);//Hardcodeado
        URI uri=URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/appt/save").toUriString());
        return ResponseEntity.created(uri).body(apptService.saveAppt(appt));
    }

    //Trae los turnos de un periodo del tiempo para el calendario
    @GetMapping("/getapptday/{date1}/{date2}")//
    public ResponseEntity<List<Appointment>> getApptTime(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime date1, @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime date2){//
        System.out.println("en getApptTime");
        System.out.println(date1);
        System.out.println(date2);
        URI uri=URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/appt/getapptday").toUriString());
        return ResponseEntity.created(uri).body(apptService.getApptTime(date1,date2));
    }

    @GetMapping("/userappt")
    public ResponseEntity<List<Appointment>> getUserAppt(){
        URI uri=URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/appt/userappt").toUriString());
        return ResponseEntity.created(uri).body(apptService.getAppt());
    }

    @GetMapping("/profappt")
    public ResponseEntity<List<Appointment>> getProfessionalAppt(){
        URI uri=URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/appt/profappt").toUriString());
        return ResponseEntity.created(uri).body(apptService.getAppt());
    }

    @GetMapping("/apptsettings/{idServ}")
    public ResponseEntity<List<ApptSettings>> getApptSettings(@PathVariable Long idServ){
        URI uri=URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/appt/apptsettings").toUriString());
        List<ApptSettings> resp = apptService.getApptSettings(idServ);
        return ResponseEntity.created(uri).body(resp);
    }

    @PutMapping("/apptstate/{apptid}/{username}")
    public Appointment setApptState (@PathVariable Long apptid, @PathVariable String username){
        User user = userService.getUser(username);
        Appointment appointment = apptService.findAppt(apptid);
        if(user.getId().equals(appointment.getUserId())){
            appointment.setState((byte) 1);
        }else if(user.getId().equals(appointment.getProfessionalId())){
            appointment.setState((byte) 2);
        }else{
            return null;
        }
        //Change username to token
        return apptService.saveAppt(appointment);
    }
}