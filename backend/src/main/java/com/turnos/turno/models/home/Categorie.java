package com.turnos.turno.models.home;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.*;

@Entity @Data
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "Category")
public class Categorie implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(unique = true, nullable = false)
  private Long id;

  private String category;
  private String photo;

  /*@ManyToMany(fetch = FetchType.EAGER, cascade= CascadeType.ALL)
  private List<Service> services = new ArrayList<>();*/

  @OneToMany(fetch = FetchType.LAZY, cascade= CascadeType.ALL)
  @JoinColumn(name = "fk_services", referencedColumnName ="id")
  private List<Service> services;

}
