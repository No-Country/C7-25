package com.turnos.turno.services;

import com.turnos.turno.models.appt.ApptSettings;
import com.turnos.turno.models.home.Categorie;
import com.turnos.turno.models.home.Home;
import com.turnos.turno.repositories.ApptSettingsRepository;
import com.turnos.turno.repositories.CategoryRepository;
import com.turnos.turno.repositories.HomeRepository;
import com.turnos.turno.repositories.ServicesRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class HomeService implements IHomeService{
    @Autowired
    private HomeRepository homeRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ServicesRepository servicesRepository;

    @Autowired
    private ApptSettingsRepository apptSettingsRepository;

    @Override
    public Home getHome(String route) {
        return homeRepository.getByRoute(route);
    }

    @Override
    public Home saveHome(Home home) {
        return homeRepository.save(home);
    }

    @Override
    public List<Categorie> getCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Categorie savetegories(Categorie categorie) {
        return categoryRepository.save(categorie);
    }

    @Override
    public com.turnos.turno.models.home.Service getService(Long id) {
        //return servicesRepository.getById(id);
        return servicesRepository.getReferenceById(id);
    }

    @Override
    public ApptSettings saveApptSettings(ApptSettings apptSettings) {
        return null;
    }



}
