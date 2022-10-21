package com.turnos.turno.models.home;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.turnos.turno.models.auth.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
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
    @Column(length = 2048)
    private String description;
    private String palette;
    private String bgimg;

    @ManyToOne
    private User admin;

    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    @ManyToMany (fetch = FetchType.EAGER, cascade={ CascadeType.MERGE, CascadeType.PERSIST })
    private List<User> professionals = new ArrayList<>();

    @OneToMany (fetch = FetchType.LAZY, cascade= CascadeType.ALL)
    @JoinColumn(name = "fk_categorie", referencedColumnName ="id")
    private List<Category> categories = new ArrayList<>();
}
