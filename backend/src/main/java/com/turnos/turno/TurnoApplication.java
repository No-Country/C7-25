package com.turnos.turno;

import com.turnos.turno.models.appt.ApptSettings;
import com.turnos.turno.models.home.Category;
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
						"Carola",
						"Moyano",
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
				userService.saveUser(
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
					)
				);
				userService.saveUser(
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
					)
				);
				userService.saveUser(
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
				);

				homeService.saveHome(new Home(
					null,
					"Carola Est??tica",
					"carola",
					"P.sherman calle wallaby 42 sydney ",
					"+54987654321",
					"carolaestetica@gmail.com",
					"",
					"",
					"",
					userService.getUser("admin@gmail.com"),
					new ArrayList<>(),
					new ArrayList<>(Arrays.asList(
						new Category(
							null,
							"Manicura y Pedicura",
							"./multimedia/manicuria_y_pedicura.jpg",
							new ArrayList<>(Arrays.asList(
								new Service(
									null,
									"Esmaltado semipermanente",
									"El esmaltado semipermanente es un sistema de esmaltado con secado inmediato y de larga duraci??n, que mantiene un resultado reluciente. Este efecto se consigue con la aplicaci??n de esmaltes especiales y con secado de una luz UV o LED. Los colores y dise??os son variados y a elecci??n. Adem??s, es de f??cil eliminaci??n, ya que basta con un removedor como la acetona. ",
									"",
									123L,
									15
								),
								new Service(
									null,
									"Kapping",
									"El kapping es un tipo de manicura que consiste en aplicar acr??lico o gel fortificador para que act??e como una barrera protectora sobre la u??a.Esta t??cnica permite acompa??ar el crecimiento de la u??a para que crezca fuerte y sana.",
									"",
									123L,
									30
								),
								new Service(
									null,
									"U??as acrilicas",
									"Las u??as acr??licas se realizan con un polvo acr??lico llamado pol??mero, que se seca r??pidamente cuando se mezcla con un un agente l??quido llamado mon??mero. Este acr??lico no requiere de una l??mpara para secarse y son excelentes para cambiar la forma de las u??as o para extenderlas. Para terminar, se le da la forma deseada y se endurece el material para agregar fuerza, longitud y grosor a la u??a.",
									"",
									123L,
									60
								),
								new Service(
									null,
									"U??as esculpidas",
									"Las u??as esculpidas son extensiones que se construyen a partir de la u??a natural con material acr??lico o gel. Estas permiten restaurar y reconstruir u??as da??adas y lucir u??as m??s largas y atractivas. La forma y la longitud se pueden moldear a elecci??n pudiendo as?? obtener varios estilos seg??n se desee.",
									"",
									123L,
									60
								)
							))
						),

						new Category(
							null,
							"Tratamientos Faciales",
							"./multimedia/Tratamientos-faciales.jpg",
							new ArrayList<>(Arrays.asList(
								new Service(
									null,
									"Dermoabraci??n",
									"La dermoabrasi??n es un procedimiento de rejuvenecimiento de la piel que utiliza un dispositivo de rotaci??n r??pida para pulir las capas externas de la piel. La piel que crece nuevamente suele ser m??s lisa, ya que este procedimiento mejora el flujo del ox??geno y nutrientes aumentando la microcirculaci??n en los capilares. Adem??s, elimina c??lulas muertas y regenera nuevas c??lulas, elimina y suaviza las arrugas y l??neas de expresi??n, y elimina cicatrices de acn?? y menores.",
									"",
									123L,
									30
								),
								new Service(
									null,
									"Peeling",
									"El peeling es un tratamiento dermatol??gico basado en la exfoliaci??n de las capas m??s superficiales de la piel con el objetivo de  eliminar las c??lulas muertas para favorecer su sustituci??n por otras de mejor calidad y textura, induciendo a la creaci??n de nuevas capas de la dermis y la epidermis.",
									"",
									123L,
									30
								),
								new Service(
									null,
									"Luz pulsada",
									"La luz pulsada facial es un sistema para tratar el proceso de envejecimiento de la piel. Permite difuminar y mejorar paulatinamente la textura y tonalidad que manifiesta la piel, eliminando manchas, poros dilatados, vello, arrugas y rojeces derivados del paso del tiempo y la exposici??n al sol.",
									"",
									123L,
									50
								),
								new Service(
									null,
									"Exfoliaci??n",
									"La exfoliaci??n facial consiste en limpiar la piel del rostro en profundidad, \n" +
											"liber??ndola de c??lulas muertas e impurezas para as?? potenciar su belleza natural. Adem??s, gracias al masaje que se realiza junto con la aplicaci??n de la crema exfoliante, se consiguen m??s beneficios como la activaci??n de la circulaci??n sangu??nea.\n",
									"",
									123L,
									20
								)
							))
						),

						new Category(
							null,
							"Depilaci??n Definitiva",
							"./multimedia/Depilacion-laser.jpg",
							new ArrayList<>(Arrays.asList(
								new Service(
									null,
									"Una Zona",
									"La depilaci??n l??ser es una t??cnica de depilaci??n que utiliza un rayo de luz l??ser para eliminar el vello que se encuentra en las zonas no deseadas. El l??ser emite una luz que el pigmento (melanina) del vello absorbe, y luego esta luz se convierte en calor y da??a los sacos tubulares en la piel en donde nacen los vellos. Esto resulta en que el vello se vuelva paulatinamente m??s delgado hasta que deja de crecer. La depilaci??n con l??ser tambi??n tiene otros beneficios adem??s de eliminar el vello, ya que tambi??n mejora la textura de la piel y reduce manchas, sobre todo en la zona de las axilas. \n" +
											"Es un m??todo de depilaci??n indoloro, preciso y r??pido.\n",
									"",
									123L,
									15
								),
								new Service(
									null,
									"Dos Zonas",
									"La depilaci??n l??ser es una t??cnica de depilaci??n que utiliza un rayo de luz l??ser para eliminar el vello que se encuentra en las zonas no deseadas. El l??ser emite una luz que el pigmento (melanina) del vello absorbe, y luego esta luz se convierte en calor y da??a los sacos tubulares en la piel en donde nacen los vellos. Esto resulta en que el vello se vuelva paulatinamente m??s delgado hasta que deja de crecer. La depilaci??n con l??ser tambi??n tiene otros beneficios adem??s de eliminar el vello, ya que tambi??n mejora la textura de la piel y reduce manchas, sobre todo en la zona de las axilas. \n" +
											"Es un m??todo de depilaci??n indoloro, preciso y r??pido.\n",
									"",
									123L,
									30
								),
								new Service(
									null,
									"Tres Zonas",
									"La depilaci??n l??ser es una t??cnica de depilaci??n que utiliza un rayo de luz l??ser para eliminar el vello que se encuentra en las zonas no deseadas. El l??ser emite una luz que el pigmento (melanina) del vello absorbe, y luego esta luz se convierte en calor y da??a los sacos tubulares en la piel en donde nacen los vellos. Esto resulta en que el vello se vuelva paulatinamente m??s delgado hasta que deja de crecer. La depilaci??n con l??ser tambi??n tiene otros beneficios adem??s de eliminar el vello, ya que tambi??n mejora la textura de la piel y reduce manchas, sobre todo en la zona de las axilas. \n" +
											"Es un m??todo de depilaci??n indoloro, preciso y r??pido.\n",
									"",
									123L,
									45
								),
								new Service(
									null,
									"Cuatro Zonas",
									"La depilaci??n l??ser es una t??cnica de depilaci??n que utiliza un rayo de luz l??ser para eliminar el vello que se encuentra en las zonas no deseadas. El l??ser emite una luz que el pigmento (melanina) del vello absorbe, y luego esta luz se convierte en calor y da??a los sacos tubulares en la piel en donde nacen los vellos. Esto resulta en que el vello se vuelva paulatinamente m??s delgado hasta que deja de crecer. La depilaci??n con l??ser tambi??n tiene otros beneficios adem??s de eliminar el vello, ya que tambi??n mejora la textura de la piel y reduce manchas, sobre todo en la zona de las axilas. \n" +
											"Es un m??todo de depilaci??n indoloro, preciso y r??pido.\n",
									"",
									123L,
									60
								),
								new Service(
									null,
									"Cinco Zonas",
									"La depilaci??n l??ser es una t??cnica de depilaci??n que utiliza un rayo de luz l??ser para eliminar el vello que se encuentra en las zonas no deseadas. El l??ser emite una luz que el pigmento (melanina) del vello absorbe, y luego esta luz se convierte en calor y da??a los sacos tubulares en la piel en donde nacen los vellos. Esto resulta en que el vello se vuelva paulatinamente m??s delgado hasta que deja de crecer. La depilaci??n con l??ser tambi??n tiene otros beneficios adem??s de eliminar el vello, ya que tambi??n mejora la textura de la piel y reduce manchas, sobre todo en la zona de las axilas. \n" +
											"Es un m??todo de depilaci??n indoloro, preciso y r??pido.\n",
									"",
									123L,
									75
								)
							))
						),

						new Category(
							null,
							"Cejas y Pesta??as",
							"./multimedia/cejas_y_pestanias.jpg",
							new ArrayList<>(Arrays.asList(
								new Service(
									null,
									"Perfilado de cejas",
									"El perfilado de cejas consiste en dise??ar y modelar  las cejas gui??ndose por l??neas de referencia que se trazan seg??n la estructura del rostro, ojos y nariz. El objetivo del perfilado es perfeccionar la forma natural de la ceja.",
									"",
									123L,
									45
								),
								new Service(
									null,
									"Lifting de pesta??as",
									"El lifting de pesta??as es un tratamiento que alarga las pesta??as y crea una ligera curva hacia arriba de manera natural y duradera, generando as?? una mayor longitud y espesor de todos los pelos, y de forma inmediata. Esto permite agrandar y profundizar la mirada.",
									"",
									123L,
									45
								),
								new Service(
									null,
									"Microblanding para cejas",
									"El microblading es un tratamiento en el que se realiza un tatuaje semipermanente en las cejas: se inyecta color en la capa m??s superficial de las cejas. Su dise??o es pelo a pelo (l??neas finas), lo cual aporta un factor extremadamente natural. Con el microblading se obtienen unas cejas naturales y acordes al tama??o y la forma del rostro, gracias a que previamente se realiza un dise??o de cejas acorde a la forma del rostro.",
									"",
									123L,
									120
								),
								new Service(
									null,
									"Microshading para cejas",
									"El microshading de cejas es un m??todo totalmente manual, en el que no se utilizan m??quinas. El objetivo es conseguir un efecto sombreado y m??s intenso en las cejas. En primer lugar se analizan los rasgos y caracter??sticas de la mirada y luego se dise??a la forma de las cejas. Luego se realiza el pixelado, aplicando un pigmento org??nico, dibujando puntitos peque??os para conseguir el sombreado de cejas deseado.",
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
				professionals.add(userService.getUser("admin@gmail.com"));
				professionals.add(userService.getUser("manager1@gmail.com"));
				professionals.add(userService.getUser("manager2@gmail.com"));
				professionals.add(userService.getUser("manager3@gmail.com"));
				homeService.saveHome(home);


				apptService.saveApptSettings(
					new ApptSettings(
						null,
						480,
						480,
						20,
						273,
						14,
						new ArrayList<>(),
						4L,
						3L
					)
				);
				apptService.saveApptSettings(
					new ApptSettings(
						null,
						480,
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
						480,
						240,
						20,
						273,
						14,
						new ArrayList<>(),
						5L,
						6L
					)
				);
				apptService.saveApptSettings(
						new ApptSettings(
								null,
								960,
								180,
								20,
								273,
								14,
								new ArrayList<>(),
								5L,
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
