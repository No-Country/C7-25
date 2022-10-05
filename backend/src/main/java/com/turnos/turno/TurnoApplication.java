package com.turnos.turno;

import com.turnos.turno.models.home.Categories;
import com.turnos.turno.models.home.Service;
import com.turnos.turno.models.auth.User;
import com.turnos.turno.services.HomeService;
import com.turnos.turno.services.UserService;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import com.turnos.turno.models.auth.Role;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.TimeZone;

@SpringBootApplication
public class TurnoApplication {

	public static void main(String[] args) {
		SpringApplication.run(TurnoApplication.class, args);
	}
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}

	//Tanto el front como el back transforman el tiempo segun su timezone pero solo
	@PostConstruct
	public void init(){
		TimeZone.setDefault(TimeZone.getTimeZone("UTC"));
	}

	@Bean
	CommandLineRunner run(UserService userService, HomeService homeService) {
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

				homeService.savetegories(new Categories(
					null,
					"Manicura y Pedicura",
					"",
					new ArrayList<>(Arrays.asList(
							new Service(
									null,
									"Esmaltado semipermanente",
									"El esmaltado semipermanente es un sistema de duración corta, entorno 2-3 semanas, sin hacer extensión de la uña, es decir, no se puede alargar la uña con este tipo de esmalte.  Para eliminarlo, basta con un removedor (acetona). Además, lo puedes encontrar en diferentes colores, ya que es un híbrido de esmalte y gel."
							),
							new Service(
									null,
									"Kapping",
									""
							),
							new Service(
									null,
									"Uñas acrilicas",
									""
							),
							new Service(
									null,
									"Esculpido",
									""
							)
					))
				));

				homeService.savetegories(new Categories(
						null,
						"Tratamientos Faciales",
						"",
						new ArrayList<>(Arrays.asList(
								new Service(
										null,
										"Hiperpigmentación",
										""
								),
								new Service(
										null,
										"Dermoabración",
										""
								),
								new Service(
										null,
										"Peeling",
										""
								),
								new Service(
										null,
										"Luz pulsada",
										""
								),
								new Service(
										null,
										"Exfoliación",
										""
								)
						))
				));

				homeService.savetegories(new Categories(
						null,
						"Depilación Definitiva",
						"",
						new ArrayList<>(Arrays.asList(
								new Service(
										null,
										"Axilas",
										""
								),
								new Service(
										null,
										"Brazo",
										""
								),
								new Service(
										null,
										"Dedos",
										""
								),
								new Service(
										null,
										"Espalda",
										""
								),
								new Service(
										null,
										"Pecho",
										""
								),
								new Service(
										null,
										"Semi Cavado",
										""
								),
								new Service(
										null,
										"Cavado Completo",
										""
								),
								new Service(
										null,
										"Media Pierna",
										""
								),
								new Service(
										null,
										"Piernas completas",
										""
								),
								new Service(
										null,
										"Dos zonas",
										""
								),
								new Service(
										null,
										"Tres Zonas",
										""
								),
								new Service(
										null,
										"Cuatro zonas",
										""
								)
						))
				));

				homeService.savetegories(new Categories(
						null,
						"Cejas y Pestañas",
						"",
						new ArrayList<>(Arrays.asList(
								new Service(
										null,
										"Perfilado",
										""
								),
								new Service(
										null,
										"Lifting",
										""
								),
								new Service(
										null,
										"Microblanding",
										""
								),
								new Service(
										null,
										"Microshading",
										""
								)
						))
				));

			} else {
				System.out.println("TurnosApplication - Admin ya creado");
			}
		};
	}
}
