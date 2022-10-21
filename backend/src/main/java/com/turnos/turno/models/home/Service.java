package com.turnos.turno.models.home;

import javax.persistence.*;

import com.turnos.turno.models.appt.ApptSettings;
import com.turnos.turno.models.auth.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Service {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;
  private String name;
  @Column(length = 1024)
  private String description;
  private String photo;
  private Long price;
  private int duration;
}
