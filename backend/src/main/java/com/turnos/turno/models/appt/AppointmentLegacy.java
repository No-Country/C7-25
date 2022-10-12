package com.turnos.turno.models.appt;

import com.turnos.turno.models.auth.User;
import com.turnos.turno.models.home.Service;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDateTime;

//@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AppointmentLegacy {

    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;
    private LocalDateTime ini;
    private LocalDateTime end;
    private byte state; //undefined:Sin cambios, 1:Cancelado por el usuario, 2:Cancelado por el profesional

    @ManyToOne
    private Service service;

    @ManyToOne
    private ApptSettings apptSettings;

    @ManyToOne
    private User professional;

    @ManyToOne
    private User user;
}
