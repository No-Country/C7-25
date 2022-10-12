package com.turnos.turno;

import com.turnos.turno.models.appt.ApptSettings;
import com.turnos.turno.models.home.Categorie;
import com.turnos.turno.models.home.Home;
import com.turnos.turno.models.home.Service;
import com.turnos.turno.models.auth.User;
import com.turnos.turno.services.ApptService;
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
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
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
	CommandLineRunner run(UserService userService, HomeService homeService, ApptService apptService) {
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
						"",
						"admin@gmail.com",
						masterPass,
						"Nombre",
						"Apellido",
						12345678L,
						"",
						new ArrayList<>()
					)
				);
				userService.saveUser(
						new User(
								null,
								"",
								"user@gmail.com",
								masterPass,
								"UserNom",
								"UserApe",
								12345678L,
								"",
								new ArrayList<>()
						)
				);


				homeService.saveHome(new Home(
					null,
					"Carola",
					"carola",
					"P.sherman calle wallaby 42 sydney ",
					"+54987654321",
					"carolaestetica@gmail.com",
					"",
					userService.getUser("admin@gmail.com"),
					new ArrayList<>(Arrays.asList(
						//userService.getUser("admin@gmail.com"),
						new User(
							null,
							"",
							"manager1@gmail.com",
							masterPass,
							"Sofia",
							"Perez",
							null,
							"",
							new ArrayList<>()
						),
						new User(
							null,
							"",
							"manager2@gmail.com",
							masterPass,
							"Lucia",
							"Gomez",
							null,
							"",
							new ArrayList<>()
						),
						new User(
							null,
							"",
							"manager3@gmail.com",
							masterPass,
							"Maria",
							"Lopez",
							null,
							"",
							new ArrayList<>()
						)
					)),
					new ArrayList<>(Arrays.asList(
						new Categorie(
							null,
							"Manicura y Pedicura",
							"./multimedia/manicuria_y_pedicura.jpg",
							new ArrayList<>(Arrays.asList(
								new Service(
									null,
									"Esmaltado semipermanente",
									"El esmaltado semipermanente es un sistema de esmaltado con secado inmediato y de larga duración, que mantiene un resultado reluciente. Este efecto se consigue con la aplicación de esmaltes especiales y con secado de una luz UV o LED. Los colores y diseños son variados y a elección. Además, es de fácil eliminación, ya que basta con un removedor como la acetona. ",
									"",
									123L,
									15
								),
								new Service(
									null,
									"Kapping",
									"El kapping es un tipo de manicura que consiste en aplicar acrílico o gel fortificador para que actúe como una barrera protectora sobre la uña.Esta técnica permite acompañar el crecimiento de la uña para que crezca fuerte y sana.",
									"",
									123L,
									30
								),
								new Service(
									null,
									"Uñas acrilicas",
									"Las uñas acrílicas se realizan con un polvo acrílico llamado polímero, que se seca rápidamente cuando se mezcla con un un agente líquido llamado monómero. Este acrílico no requiere de una lámpara para secarse y son excelentes para cambiar la forma de las uñas o para extenderlas. Para terminar, se le da la forma deseada y se endurece el material para agregar fuerza, longitud y grosor a la uña.",
									"",
									123L,
									60
								),
								new Service(
									null,
									"Uñas esculpidas",
									"Las uñas esculpidas son extensiones que se construyen a partir de la uña natural con material acrílico o gel. Estas permiten restaurar y reconstruir uñas dañadas y lucir uñas más largas y atractivas. La forma y la longitud se pueden moldear a elección pudiendo así obtener varios estilos según se desee.",
									"",
									123L,
									60
								)
							))
						),

						new Categorie(
							null,
							"Tratamientos Faciales",
							"./multimedia/Tratamientos-faciales.jpg",
							new ArrayList<>(Arrays.asList(
								new Service(
									null,
									"Dermoabración",
									"La dermoabrasión es un procedimiento de rejuvenecimiento de la piel que utiliza un dispositivo de rotación rápida para pulir las capas externas de la piel. La piel que crece nuevamente suele ser más lisa, ya que este procedimiento mejora el flujo del oxígeno y nutrientes aumentando la microcirculación en los capilares. Además, elimina células muertas y regenera nuevas células, elimina y suaviza las arrugas y líneas de expresión, y elimina cicatrices de acné y menores.",
									"",
									123L,
									30
								),
								new Service(
									null,
									"Peeling",
									"El peeling es un tratamiento dermatológico basado en la exfoliación de las capas más superficiales de la piel con el objetivo de  eliminar las células muertas para favorecer su sustitución por otras de mejor calidad y textura, induciendo a la creación de nuevas capas de la dermis y la epidermis.",
									"",
									123L,
									30
								),
								new Service(
									null,
									"Luz pulsada",
									"La luz pulsada facial es un sistema para tratar el proceso de envejecimiento de la piel. Permite difuminar y mejorar paulatinamente la textura y tonalidad que manifiesta la piel, eliminando manchas, poros dilatados, vello, arrugas y rojeces derivados del paso del tiempo y la exposición al sol.",
									"",
									123L,
									50
								),
								new Service(
									null,
									"Exfoliación",
									"La exfoliación facial consiste en limpiar la piel del rostro en profundidad, \n" +
											"liberándola de células muertas e impurezas para así potenciar su belleza natural. Además, gracias al masaje que se realiza junto con la aplicación de la crema exfoliante, se consiguen más beneficios como la activación de la circulación sanguínea.\n",
									"",
									123L,
									20
								)
							))
						),

						new Categorie(
							null,
							"Depilación Definitiva",
							"./multimedia/Depilacion-laser.jpg",
							new ArrayList<>(Arrays.asList(
								new Service(
									null,
									"Una Zona",
									"La depilación láser es una técnica de depilación que utiliza un rayo de luz láser para eliminar el vello que se encuentra en las zonas no deseadas. El láser emite una luz que el pigmento (melanina) del vello absorbe, y luego esta luz se convierte en calor y daña los sacos tubulares en la piel en donde nacen los vellos. Esto resulta en que el vello se vuelva paulatinamente más delgado hasta que deja de crecer. La depilación con láser también tiene otros beneficios además de eliminar el vello, ya que también mejora la textura de la piel y reduce manchas, sobre todo en la zona de las axilas. \n" +
											"Es un método de depilación indoloro, preciso y rápido.\n",
									"",
									123L,
									15
								),
								new Service(
									null,
									"Dos Zonas",
									"La depilación láser es una técnica de depilación que utiliza un rayo de luz láser para eliminar el vello que se encuentra en las zonas no deseadas. El láser emite una luz que el pigmento (melanina) del vello absorbe, y luego esta luz se convierte en calor y daña los sacos tubulares en la piel en donde nacen los vellos. Esto resulta en que el vello se vuelva paulatinamente más delgado hasta que deja de crecer. La depilación con láser también tiene otros beneficios además de eliminar el vello, ya que también mejora la textura de la piel y reduce manchas, sobre todo en la zona de las axilas. \n" +
											"Es un método de depilación indoloro, preciso y rápido.\n",
									"",
									123L,
									30
								),
								new Service(
									null,
									"Tres Zonas",
									"La depilación láser es una técnica de depilación que utiliza un rayo de luz láser para eliminar el vello que se encuentra en las zonas no deseadas. El láser emite una luz que el pigmento (melanina) del vello absorbe, y luego esta luz se convierte en calor y daña los sacos tubulares en la piel en donde nacen los vellos. Esto resulta en que el vello se vuelva paulatinamente más delgado hasta que deja de crecer. La depilación con láser también tiene otros beneficios además de eliminar el vello, ya que también mejora la textura de la piel y reduce manchas, sobre todo en la zona de las axilas. \n" +
											"Es un método de depilación indoloro, preciso y rápido.\n",
									"",
									123L,
									45
								),
								new Service(
									null,
									"Cuatro Zonas",
									"La depilación láser es una técnica de depilación que utiliza un rayo de luz láser para eliminar el vello que se encuentra en las zonas no deseadas. El láser emite una luz que el pigmento (melanina) del vello absorbe, y luego esta luz se convierte en calor y daña los sacos tubulares en la piel en donde nacen los vellos. Esto resulta en que el vello se vuelva paulatinamente más delgado hasta que deja de crecer. La depilación con láser también tiene otros beneficios además de eliminar el vello, ya que también mejora la textura de la piel y reduce manchas, sobre todo en la zona de las axilas. \n" +
											"Es un método de depilación indoloro, preciso y rápido.\n",
									"",
									123L,
									60
								),
								new Service(
									null,
									"Cinco Zonas",
									"La depilación láser es una técnica de depilación que utiliza un rayo de luz láser para eliminar el vello que se encuentra en las zonas no deseadas. El láser emite una luz que el pigmento (melanina) del vello absorbe, y luego esta luz se convierte en calor y daña los sacos tubulares en la piel en donde nacen los vellos. Esto resulta en que el vello se vuelva paulatinamente más delgado hasta que deja de crecer. La depilación con láser también tiene otros beneficios además de eliminar el vello, ya que también mejora la textura de la piel y reduce manchas, sobre todo en la zona de las axilas. \n" +
											"Es un método de depilación indoloro, preciso y rápido.\n",
									"",
									123L,
									75
								)
							))
						),

						new Categorie(
							null,
							"Cejas y Pestañas",
							"./multimedia/cejas_y_pestanias.jpg",
							new ArrayList<>(Arrays.asList(
								new Service(
									null,
									"Perfilado de cejas",
									"El perfilado de cejas consiste en diseñar y modelar  las cejas guiándose por líneas de referencia que se trazan según la estructura del rostro, ojos y nariz. El objetivo del perfilado es perfeccionar la forma natural de la ceja.",
									"",
									123L,
									45
								),
								new Service(
									null,
									"Lifting de pestañas",
									"El lifting de pestañas es un tratamiento que alarga las pestañas y crea una ligera curva hacia arriba de manera natural y duradera, generando así una mayor longitud y espesor de todos los pelos, y de forma inmediata. Esto permite agrandar y profundizar la mirada.",
									"",
									123L,
									45
								),
								new Service(
									null,
									"Microblanding para cejas",
									"El microblading es un tratamiento en el que se realiza un tatuaje semipermanente en las cejas: se inyecta color en la capa más superficial de las cejas. Su diseño es pelo a pelo (líneas finas), lo cual aporta un factor extremadamente natural. Con el microblading se obtienen unas cejas naturales y acordes al tamaño y la forma del rostro, gracias a que previamente se realiza un diseño de cejas acorde a la forma del rostro.",
									"",
									123L,
									120
								),
								new Service(
									null,
									"Microshading para cejas",
									"El microshading de cejas es un método totalmente manual, en el que no se utilizan máquinas. El objetivo es conseguir un efecto sombreado y más intenso en las cejas. En primer lugar se analizan los rasgos y características de la mirada y luego se diseña la forma de las cejas. Luego se realiza el pixelado, aplicando un pigmento orgánico, dibujando puntitos pequeños para conseguir el sombreado de cejas deseado.",
									"",
									123L,
									90
								)
							))
						)
					))
				));

				Home home = homeService.getHome("carola");//professionals
				List<User> professionals=home.getProfessionals();
				//List<User> professionals=home.getCategories().get(0).getServices().get(0).getProfessionals();
				professionals.add(userService.getUser("admin@gmail.com"));
				professionals.add(userService.getUser("manager2@gmail.com"));
				professionals.add(userService.getUser("manager3@gmail.com"));


				apptService.saveApptSettings(
					new ApptSettings(
						null,
						LocalTime.of(8,0,0),
						480,
						20,
						273,
						14,
						new ArrayList<>(),
						4L,
						1L
					)
				);
				apptService.saveApptSettings(
					new ApptSettings(
						null,
						LocalTime.of(8,0,0),
						480,
						20,
						273,
						14,
						new ArrayList<>(),
						3L,
						3L
					)
				);
				apptService.saveApptSettings(
					new ApptSettings(
						null,
						LocalTime.of(8,0,0),
						240,
						20,
						273,
						14,
						new ArrayList<>(),
						1L,
						6L
					)
				);
				apptService.saveApptSettings(
						new ApptSettings(
								null,
								LocalTime.of(16,0,0),
								180,
								20,
								273,
								14,
								new ArrayList<>(),
								1L,
								6L
						)
				);

				userService.addRoleToUser("admin@gmail.com","ROLE_USER");
				userService.addRoleToUser("admin@gmail.com","ROLE_MANAGER");
				userService.addRoleToUser("admin@gmail.com","ROLE_ADMIN");
				userService.addRoleToUser("admin@gmail.com","ROLE_SUPER_ADMIN");

				userService.addRoleToUser("manager1@gmail.com","ROLE_USER");
				userService.addRoleToUser("manager1@gmail.com","ROLE_MANAGER");

				userService.addRoleToUser("manager2@gmail.com","ROLE_USER");
				userService.addRoleToUser("manager2@gmail.com","ROLE_MANAGER");

				userService.addRoleToUser("manager3@gmail.com","ROLE_USER");
				userService.addRoleToUser("manager3@gmail.com","ROLE_MANAGER");

				userService.addRoleToUser("user@gmail.com","ROLE_USER");

			} else {
				System.out.println("TurnosApplication - Admin ya creado");
			}
		};
	}
}
