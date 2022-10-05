package com.turnos.turno.controllers;

import com.turnos.turno.services.IHomeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.turnos.turno.models.home.Categories;

import java.util.List;

@RestController
@RequestMapping("/home")
@RequiredArgsConstructor
public class HomeController {

  private final IHomeService homeService;

  @GetMapping("/categories")
  public List<Categories> saveAppt() {
    return homeService.getCategories();
  }
}
