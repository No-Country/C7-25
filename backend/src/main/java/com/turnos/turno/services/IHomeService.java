package com.turnos.turno.services;

import com.turnos.turno.models.appt.ApptSettings;
import com.turnos.turno.models.home.Categorie;
import com.turnos.turno.models.home.Home;
import com.turnos.turno.models.home.Service;

import java.util.List;

public interface IHomeService {
    Home getHome(String route);

    Home saveHome(Home home);

    List<Categorie> getCategories();

    Categorie savetegories(Categorie categorie);

    Service getService (Long id);

    ApptSettings saveApptSettings(ApptSettings apptSettings);

}
