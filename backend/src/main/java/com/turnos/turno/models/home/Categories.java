package com.turnos.turno.models.home;

import com.turnos.turno.models.home.Service;
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
public class Categories implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(unique = true, nullable = false)
  private Long id;

  private String category;
  private String photo;

  @ManyToMany(fetch = FetchType.EAGER, cascade= CascadeType.ALL)
  private List<Service> services = new ArrayList<>();


}
