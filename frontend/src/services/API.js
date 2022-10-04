import axios from 'axios';

let aux = new Date();
aux.toISOString()

const domain = 'http://localhost:8080';

//Agregar a la lista de turnos tomados
export async function BookAppointmentSaveAppt(apptm,workday) {

  //Devido a que Springboot 
  const jsDate= new Date(apptm.ini);
  console.log(apptm,jsDate,jsDate.getTimezoneOffset())
  let ini = jsDate.toISOString();
  jsDate.setTime(jsDate.getTime() + workday.apptDuration*60*1000);
  let end = jsDate.toISOString();
  const turn={ ini,end}

  try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization : `Bearer ${token}`
        } 
      }
      const UserusedUrlAPI=`${domain}/appt/save`;
      const resp = await axios.post(UserusedUrlAPI,turn,config);
      return resp;
  } catch (error) {
      console.log('Error: '+ error);
  }
}

export async function BookAppointmentGetReserved(workday) {
  //Obtengo el periodo de turnos activos
  const day=new Date();
  day.setHours(0,0,0,0);
  const T1=day.toISOString();
  day.setDate(day.getDate()+workday.daysAHead);
  //day.setHours(23,59,59,0);
  const T2=day.toISOString();
  try {
    const urlAPI=`${domain}/appt/getapptday/${T1}/${T2}`;
    console.log(urlAPI)
    const resp = await axios.get(urlAPI);
    console.log('resp.data',resp.data)
    return resp.data.map(elem=>new Date(`${elem.ini}Z`));//La Z es para decirle que los datos estan en el timezone 0UTC
  } catch (error) {
      //Tarea: en caso de error hay que evitar que salga la ventana porque vana a estar todos los turnos disponibles
      console.log('Error: '+ error);
  }
}

export function logIn(bodyAPI){
  
  const urlAPI= `${domain}/auth/login`;
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  
  axios
  .post(urlAPI, bodyAPI, config)
  
  .then( resolve =>{
      console.log(resolve);
      console.log(resolve.data);
      localStorage.setItem('token',resolve.data.token)
      return resolve.data;
  })
  .catch( error => {
    console.log('Error: '+ error)
    alert('El email o la contraseña es incorrecta');
  } );
}

export async function SignUpIsEmailNotAvailable(inputEmail) {
  try {
    const urlAPI=`${domain}/auth/useravailability/${inputEmail}`;
    const resp = await axios.get(urlAPI);
    return resp.data;
  }

  catch (error) {
      console.log('Error: '+ error);
  }
}

export async function signUp(bodyAPI) {
  const urlAPI= `${domain}/auth/singup`;
  
  axios
  .post(urlAPI, bodyAPI)
  
  .then( resolve =>{
      console.log(resolve.data);
      console.log(resolve);
      return resolve.data;
  })

  .then( resolve =>{

      if(resolve.length > 0){
          alert('Ya existe una cuenta con este correo electrónico')
      }
      else{
          //redirect('/home');
          alert('Registrado exitosamente');
          return 'home';
      };     
  })
  .catch( error => console.log('Error: '+ error));
}