package com.turnos.turno.services;

import com.turnos.turno.models.home.Categories;

import java.util.List;

public interface IHomeService {
    List<Categories> getCategories();

    Categories savetegories(Categories categories);
}
