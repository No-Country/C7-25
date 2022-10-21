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
import org.springframework.security.core.context.SecurityContextHolder;
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
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        User user=userService.getUser(email);
        appt.setUserId(user.getId());
        URI uri=URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/appt/save").toUriString());
        return ResponseEntity.created(uri).body(apptService.saveAppt(appt));
    }

    @PostMapping("/savesettings")
    public ResponseEntity<ApptSettings> editAppt(@RequestBody ApptSettings apptSettings){
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        User user=userService.getUser(email);
        apptSettings.setProfessionalId(user.getId());
        URI uri=URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/appt/savesettings").toUriString());
        return ResponseEntity.created(uri).body(apptService.saveApptSettings(apptSettings));
    }

    //Trae los turnos de un periodo del tiempo para el calendario
    @GetMapping("/getapptday/{date1}/{date2}")
    public ResponseEntity<List<Appointment>> getApptTime(@PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime date1, @PathVariable @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime date2){//
        System.out.println("en getApptTime");
        System.out.println(date1);
        System.out.println(date2);
        URI uri=URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/appt/getapptday").toUriString());
        return ResponseEntity.created(uri).body(apptService.getApptTime(date1,date2));
    }

    @GetMapping("/userappt")
    public ResponseEntity<List<Appointment>> getUserAppt(){
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        User user=userService.getUser(email);
        URI uri=URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/appt/userappt").toUriString());
        return ResponseEntity.created(uri).body(apptService.getApptUser(user.getId()));
    }

    @GetMapping("/profappt")
    public ResponseEntity<List<Appointment>> getProfessionalAppt(){
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        User user=userService.getUser(email);
        URI uri=URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/appt/profappt").toUriString());
        return ResponseEntity.created(uri).body(apptService.getApptProf(user.getId()));
    }

    @GetMapping("/apptsettingsservice/{idServ}")
    public ResponseEntity<List<ApptSettings>> getApptSettingsService(@PathVariable Long idServ){
        URI uri=URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/appt/pptsettingsservice").toUriString());
        List<ApptSettings> resp = apptService.getApptSettingsService(idServ);
        return ResponseEntity.created(uri).body(resp);
    }

    @GetMapping("/apptsettingsprofessional")
    public ResponseEntity<List<ApptSettings>> getApptSettingsProfessional(){
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        User user=userService.getUser(email);
        URI uri=URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/appt/apptsettingsprofessional").toUriString());
        List<ApptSettings> resp = apptService.getApptSettingsProfessional(user.getId());
        return ResponseEntity.created(uri).body(resp);
    }

    @PutMapping("/apptstate/{apptid}")
    public Appointment setApptState (@PathVariable Long apptid){
        String email = SecurityContextHolder.getContext().getAuthentication().getPrincipal().toString();
        User user = userService.getUser(email);
        Appointment appointment = apptService.findAppt(apptid);
        if(user.getId().equals(appointment.getUserId())){
            appointment.setState((byte) 1);
        }else if(user.getId().equals(appointment.getProfessionalId())){
            appointment.setState((byte) 2);
        }else{
            return null;
        }
        return apptService.saveAppt(appointment);
    }

    @DeleteMapping ("/deleteapptsetting/{id}")
    public ResponseEntity<String> deleteAppSettings (@PathVariable Long id){
        apptService.deleteApptSettings(id);
        URI uri=URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/appt/eliminar").toUriString());
        return ResponseEntity.created(uri).body("Se elimino correctamente");
    }
}