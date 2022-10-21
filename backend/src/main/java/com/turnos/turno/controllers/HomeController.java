package com.turnos.turno.controllers;

import com.turnos.turno.models.auth.User;
import com.turnos.turno.models.home.Home;
import com.turnos.turno.models.home.HomeDTO;
import com.turnos.turno.models.home.Service;
import com.turnos.turno.services.IHomeService;
import com.turnos.turno.services.IUserService;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.turnos.turno.models.home.Category;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/home")
@RequiredArgsConstructor
public class HomeController {

  private final IHomeService homeService;

  private final IUserService userService;

  @GetMapping("/")
  public HomeDTO getHome() {
    Home home = homeService.getHome("carola");
    ModelMapper modelMapper = new ModelMapper();
    HomeDTO homeDTO = modelMapper.map(home, HomeDTO.class);
    return homeDTO;
  }

  @GetMapping("/categories")
  public List<Category> getCategories() {
    return homeService.getCategories();
  }

  @PostMapping("/savehome")
  public ResponseEntity<HomeDTO> editHome(@RequestBody Home home){
    Home homedb = homeService.getHome("carola");
    homedb.setAdress(home.getAdress());
    homedb.setName(home.getName());
    homedb.setDescription(home.getDescription());
    homedb.setTelephone(home.getTelephone());
    homedb.setPalette(home.getPalette());
    homedb.setBgimg(home.getBgimg());
    ModelMapper modelMapper = new ModelMapper();
    HomeDTO homeDTO = modelMapper.map(homeService.saveHome(homedb), HomeDTO.class);
    URI uri=URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/home/savehome").toUriString());
    return ResponseEntity.created(uri).body(homeDTO);
  }

  @PostMapping("/savecategory")
  public ResponseEntity<HomeDTO> editCategory(@RequestBody Category category){
    Home home = homeService.getHome("carola");
    if (category.getId() == null) {//Nueva categoria
      home.getCategories().add(category);
    }else{//Categoria existente
      for(Category category1 : home.getCategories()) {
        if(category1.getId().equals(category.getId())) {
          category1.setCategory(category.getCategory());
          category1.setPhoto(category.getPhoto());
        }
      }
    }
    ModelMapper modelMapper = new ModelMapper();
    HomeDTO homeDTO = modelMapper.map(homeService.saveHome(home), HomeDTO.class);
    URI uri=URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/home/savecategory").toUriString());
    return ResponseEntity.created(uri).body(homeDTO);
  }

  @PostMapping("/saveservice/{idCategory}")
  public ResponseEntity<HomeDTO> editService(@PathVariable Long idCategory,@RequestBody Service service){
    Home home = homeService.getHome("carola");
    for (Category category : home.getCategories()) {
      if (category.getId().equals(idCategory)) {//Categoria en la que va el servicio
        if (service.getId() == null) {//Nuevo servicio
          category.getServices().add(service);
        }else {//Servicio existente
          for(Service service1 : category.getServices()){
            if(service1.getId().equals(service.getId())){
              service1.setName(service.getName());
              service1.setDescription(service.getDescription());
              service1.setPhoto(service.getPhoto());
              service1.setDuration(service.getDuration());
              service1.setPrice(service.getPrice());
            }
          }
        }
      }
    }
    ModelMapper modelMapper = new ModelMapper();
    HomeDTO homeDTO = modelMapper.map(homeService.saveHome(home), HomeDTO.class);
    URI uri=URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/home/saveservice").toUriString());
    return ResponseEntity.created(uri).body(homeDTO);
  }

  @DeleteMapping ("/deletecategory/{id}")
  public ResponseEntity<HomeDTO> deleteCategory (@PathVariable Long id){
    homeService.deleteCategory(id);
    ModelMapper modelMapper = new ModelMapper();
    HomeDTO homeDTO = modelMapper.map(homeService.getHome("carola"), HomeDTO.class);
    URI uri=URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/home/deletecategory").toUriString());
    return ResponseEntity.created(uri).body(homeDTO);
  }

  @DeleteMapping ("/deleteservice/{id}")
  public ResponseEntity<HomeDTO> deleteService (@PathVariable Long id){
    homeService.deleteService(id);
    ModelMapper modelMapper = new ModelMapper();
    HomeDTO homeDTO = modelMapper.map(homeService.getHome("carola"), HomeDTO.class);
    URI uri=URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/home/deleteservice").toUriString());
    return ResponseEntity.created(uri).body(homeDTO);
  }

  @PutMapping("/addprofessional/{id}")
  public ResponseEntity<HomeDTO> addProfessional (@PathVariable Long id){
    Home home = homeService.getHome("carola");
    User newProf = userService.getUserById(id);
    userService.addRoleToUser(newProf.getUsername(),"ROLE_MANAGER");
    home.getProfessionals().add(newProf);
    Home home1=homeService.saveHome(home);
    ModelMapper modelMapper = new ModelMapper();
    HomeDTO homeDTO = modelMapper.map(home1, HomeDTO.class);
    URI uri=URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/home/addrofessional").toUriString());
    return ResponseEntity.created(uri).body(homeDTO);
  }

  @DeleteMapping ("/deleprofessional/{id}")
  public ResponseEntity<HomeDTO> deleteProfesional (@PathVariable Long id){
    System.out.println("Estoy en eliminar professional");
    Home home = homeService.getHome("carola");
    int index=-1;
    for(User prof : home.getProfessionals()){
      if(prof.getId().equals(id)){
        index=home.getProfessionals().indexOf(prof);
      }
    }
    URI uri=URI.create(ServletUriComponentsBuilder.fromCurrentContextPath().path("/home/deleprofessional").toUriString());
    if(index<0){ //Si no se encontro
      return ResponseEntity.notFound().build();
    }else{
      userService.removeRoleToUser(id,"ROLE_MANAGER");
      home.getProfessionals().remove(index);
      Home home1=homeService.saveHome(home);
      ModelMapper modelMapper = new ModelMapper();
      HomeDTO homeDTO = modelMapper.map(home1, HomeDTO.class);
      return ResponseEntity.created(uri).body(homeDTO);
    }
  }
}
