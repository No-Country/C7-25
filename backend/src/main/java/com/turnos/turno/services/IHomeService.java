package com.turnos.turno.services;

import com.turnos.turno.models.appt.ApptSettings;
import com.turnos.turno.models.home.Category;
import com.turnos.turno.models.home.Home;
import com.turnos.turno.models.home.Service;

import java.util.List;

public interface IHomeService {
    Home getHome(String route);

    Home saveHome(Home home);

    void addProfessional(String route, String email);

    List<Category> getCategories();

    Category getCategorie(Long id);

    Category savetegories(Category category);

    Service getService (Long id);

    ApptSettings saveApptSettings(ApptSettings apptSettings);

    void deleteCategory(Long id);

    void deleteService(Long id);

}
