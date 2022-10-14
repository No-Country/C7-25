import axios from 'axios';
import {domain} from './Domain';

let aux = new Date();
aux.toISOString()

export async function getHome() {
  try {
    const urlAPI=`${domain}/home/`;
    const resp = await axios.get(urlAPI);
    return resp.data;
  } catch (error) {
      console.log('Error: '+ error);
  }
}

//Falta agregar a la lista de turnos tomados
export async function BookAppointmentSaveAppt(apptm,serviceId,professionalId) {

  const ini = (new Date(apptm.ini)).toISOString();
  const end = (new Date(apptm.end)).toISOString();
  const apptSettingsId = apptm.apptSettingsId
  const turn={ini,end,serviceId,apptSettingsId,professionalId}

  try {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          Authorization : `Bearer ${token}`
        } 
      }
      const email = localStorage.getItem('email');
      const UserusedUrlAPI=`${domain}/appt/save/${email}`;
      const resp = await axios.post(UserusedUrlAPI,turn,config);
      return resp;
  } catch (error) {
      console.log('Error: '+ error);
  }
}

export async function BookAppointmentGetReserved(maxDays) {
  //Obtengo cuantos dias tienen turnos
  //let daysAhead=settings.reduce((acc,cur)=>Math.max(acc.daysAhead?acc.daysAhead:acc,cur.daysAhead));//cur.daysAhead>acc?cur.daysAhead:acc)
  //***//console.log('acc',daysAhead,settings[0].daysAhead);
  //Obtengo el periodo de turnos activos
  const day=new Date();
  day.setHours(0,0,0,0);
  const T1=day.toISOString();
  //***//console.log('In BookAppointmentGetReserved',settings);
  day.setDate(day.getDate()+maxDays);
  const T2=day.toISOString();
  try {
    const urlAPI=`${domain}/appt/getapptday/${T1}/${T2}`;
    const resp = await axios.get(urlAPI);
    return resp.data.map(elem=>new Date(`${elem.ini}Z`));//La Z es para decirle que los datos estan en el timezone 0UTC
  } catch (error) {
      //Tarea: en caso de error hay que evitar que salga la ventana porque van a a estar todos los turnos disponibles
      console.log('Error: '+ error);
  }
}

export async function BookAppointmentGetApptSettings(idService) {
  try {
    const urlAPI=`${domain}/appt/apptsettings/${idService}`;
    const resp = await axios.get(urlAPI);
    return resp.data;//Necesitara la z?
  } catch (error) {
      //Tarea: en caso de error hay que evitar que salga la ventana porque van a a estar todos los turnos disponibles
      console.log('Error: '+ error);
  }
}

export async function userAppt() {
  try {
    const email = localStorage.getItem('email');
    const urlAPI=`${domain}/appt/userappt/${email}`;
    const resp = await axios.get(urlAPI);
    return resp.data;
  }

  catch (error) {
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
      localStorage.setItem('token',resolve.data.token);
      localStorage.setItem('email',resolve.data.email);
      return resolve.data;
  })
  .catch( error => {
    console.log('Error: '+ error)
    alert('El email o la contraseña es incorrecta');
  } );
}

export async function signUp(bodyAPI) {
  const urlAPI= `${domain}/auth/signup`;
  
  axios
  .post(urlAPI, bodyAPI)
  
  .then( resolve =>{
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

export async function MyAppointmentsCancelAppt(id) {
  try {
    const email = await localStorage.getItem('email');
    const urlAPI=`${domain}/appt/apptstate/${id}/${email}`;
    const resp = await axios.put(urlAPI);
    return resp.data;
  }

  catch (error) {
      console.log('Error: '+ error);
  }
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


export async function EditInfo(data){
  
  try {
    const urlAPI = `${domain}/appt/savesettings`;
    const resp = await axios.post(urlAPI,data);
    return resp;
  }

  catch (error) {
    console.log('Error: '+ error);
  }
}
