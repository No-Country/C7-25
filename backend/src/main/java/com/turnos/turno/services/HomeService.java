package com.turnos.turno.services;

import com.turnos.turno.models.appt.ApptSettings;
import com.turnos.turno.models.auth.User;
import com.turnos.turno.models.home.Category;
import com.turnos.turno.models.home.Home;
import com.turnos.turno.repositories.*;
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

    @Autowired
    private UserRepository userRepository;

    @Override
    public Home getHome(String route) {
        return homeRepository.getByRoute(route);
    }

    @Override
    public Home saveHome(Home home) {
        return homeRepository.save(home);
    }

    @Override
    public void addProfessional(String route, String email) {
        Home home = getHome(route);
        User user = userRepository.findByUsername(email);
        home.getProfessionals().add(user);
    }

    @Override
    public List<Category> getCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Category getCategorie(Long id){
        return categoryRepository.getReferenceById(id);
    }

    @Override
    public Category savetegories(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public com.turnos.turno.models.home.Service getService(Long id) {
        return servicesRepository.getReferenceById(id);
    }

    @Override
    public ApptSettings saveApptSettings(ApptSettings apptSettings) {
        return null;
    }

    @Override
    public void deleteCategory(Long id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public void deleteService(Long id) {
        servicesRepository.deleteById(id);
    }


}
