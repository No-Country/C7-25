package com.turnos.turno.models.appt;

import com.turnos.turno.models.auth.User;
import com.turnos.turno.models.home.Service;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "apptsettings")
public class ApptSettingsLegacy {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private LocalTime workdayInit; //inicio de la jornada
    private int workdayDuration; //duracion de la jornada en minutos
    private int apptDuration; //duracion del turno en minutos
    private int daysAvailable; //Codificacion del vector de dias con turnos [0,1,0,1,0,1,0] con el vector de numeros primos [2,3,5,7,11,13,17] = 3*7*13
    private int daysAHead; //Numeros de dias con turnos habilitados

    @ElementCollection
    @CollectionTable(name = "apptsettings_daysnotavailable")
    private List<LocalDate> daysNotAvailable; //Feriados, licencia etc

    @ManyToOne(fetch = FetchType.EAGER)
    private User professional;

    @ManyToOne(fetch = FetchType.EAGER)
    private Service service;
}
