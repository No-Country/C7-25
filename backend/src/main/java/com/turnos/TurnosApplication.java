package com.turnos;

import com.turnos.models.auth.User;
import com.turnos.services.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.turnos.models.auth.Role;

import java.util.ArrayList;

@SpringBootApplication
public class TurnosApplication {

	public static void main(String[] args) {
		SpringApplication.run(TurnosApplication.class, args);
	}
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}


	@Bean
	CommandLineRunner run(UserService userService) {
		return args -> {
			if (!userService.existeUsername("admin@gmail.com")) {
				System.out.println("IntegradorApplication - Creando admin");

				String masterPass = "1234";
				userService.saveRole(new Role(null, "ROLE_USER"));
				userService.saveRole(new Role(null, "ROLE_MANAGER"));
				userService.saveRole(new Role(null, "ROLE_ADMIN"));
				userService.saveRole(new Role(null, "ROLE_SUPER_ADMIN"));

				userService.saveUser(
					new User(
						null,
						"admin@gmail.com",
						"admin@gmail.com",
						masterPass,
						"Nombre",
						"Apellido",
						12345678L,
						"",
						new ArrayList<>()
					)
				);

				userService.addRoleToUser("admin@gmail.com","ROLE_USER");
				userService.addRoleToUser("admin@gmail.com","ROLE_MANAGER");
				userService.addRoleToUser("admin@gmail.com","ROLE_ADMIN");
				userService.addRoleToUser("admin@gmail.com","ROLE_SUPER_ADMIN");
			} else {
				System.out.println("TurnosApplication - Admin ya creado");
			}
		};
	}
}
