package com.turnos.turno.models.home;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.turnos.turno.models.auth.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Home {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String route;
    private String adress;
    private String telephone;
    private String email;
    private String presentation;

    @ManyToOne
    private User admin;

    @ManyToMany (fetch = FetchType.EAGER, cascade= CascadeType.ALL)//targetEntity = User.class,
    private List<User> professionals;

    @OneToMany (fetch = FetchType.LAZY, cascade= CascadeType.ALL)//targetEntity = User.class,
    @JoinColumn(name = "fk_Categorie", referencedColumnName ="id")
    private List<Categorie> categories;
}
