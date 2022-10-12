package com.turnos.turno.models.home;

import com.turnos.turno.models.auth.User;
import com.turnos.turno.models.auth.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class HomeDTO {

    private Long id;

    private String name;
    private String route;
    private String adress;
    private String telephone;
    private String email;
    private String presentation;


    private List<UserDTO> professionals;

    private List<Categorie> categories;
}
