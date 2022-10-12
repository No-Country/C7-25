package com.turnos.turno.controllers;

import com.turnos.turno.models.home.Home;
import com.turnos.turno.models.home.HomeDTO;
import com.turnos.turno.services.IHomeService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.turnos.turno.models.home.Categorie;

import java.util.List;

@RestController
@RequestMapping("/home")
@RequiredArgsConstructor
public class HomeController {

  private final IHomeService homeService;

  /*@GetMapping("/")
  public Home getHome() {
    return homeService.getHome("carola");
  }*/
  @GetMapping("/")
  public HomeDTO getHome() {
    Home home = homeService.getHome("carola");

    ModelMapper modelMapper = new ModelMapper();
    HomeDTO homeDTO = modelMapper.map(home, HomeDTO.class);
    return homeDTO;
  }

  @GetMapping("/categories")
  public List<Categorie> getCategories() {
    return homeService.getCategories();
  }

}
