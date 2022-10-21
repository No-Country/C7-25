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

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "apptsettings")
public class ApptSettings {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private int workdayInit; //inicio de la jornada en minutos desde las 00
    private int workdayDuration; //duracion de la jornada en minutos
    private int apptDuration; //duracion del turno en minutos
    private int daysAvailable; //Codificacion del vector de dias con turnos [0,1,0,1,0,1,0] con el vector de numeros primos [2,3,5,7,11,13,17] = 3*7*13
    private int daysAhead; //Numeros de dias con turnos habilitados

    @ElementCollection
    @CollectionTable(name = "apptsettings_daysnotavailable")
    private List<LocalDate> daysNotAvailable; //Feriados, licencia etc

    private Long professionalId;
    private Long serviceId;
}
