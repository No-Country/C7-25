package com.turnos.turno.services;

import com.turnos.turno.models.home.Categories;
import com.turnos.turno.repositories.CategoryRepository;
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
    private CategoryRepository categoryRepository;

    @Override
    public List<Categories> getCategories() {
        return categoryRepository.findAll();
    }

    @Override
    public Categories savetegories(Categories categories) {
        return categoryRepository.save(categories);
    }


}
