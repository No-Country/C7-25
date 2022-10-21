import axios from 'axios';
import {domain} from './Domain';

function Config(){
  const token = localStorage.getItem('token');
  return {
    headers: {
      Authorization : `Bearer ${token}`
    } 
  }
}


export async function getHome() {
  try {
    const urlAPI=`${domain}/home/`;
    const resp = await axios.get(urlAPI);
    return resp.data;
  } catch (error) {
      console.log('Error: '+ error);
  }
}

export async function BookAppointmentSaveAppt(apptm,serviceId,professionalId) {

  const ini = (new Date(apptm.ini)).toISOString();
  const end = (new Date(apptm.end)).toISOString();
  const apptSettingsId = apptm.apptSettingsId
  const turn={ini,end,serviceId,apptSettingsId,professionalId}

  try {
      const UserusedUrlAPI=`${domain}/appt/save`;
      const resp = await axios.post(UserusedUrlAPI,turn,Config());
      return resp;
  } catch (error) {
      console.log('Error: '+ error);
  }
}

export async function BookAppointmentGetReserved(maxDays) {
  //Obtengo el periodo de turnos activos
  const day=new Date();
  day.setHours(0,0,0,0);
  const T1=day.toISOString();
  day.setDate(day.getDate()+maxDays);
  const T2=day.toISOString();
  try {
    const urlAPI=`${domain}/appt/getapptday/${T1}/${T2}`;
    const resp = await axios.get(urlAPI,Config());
    return resp.data.map(elem=>{
      return {
        ini:new Date(`${elem.ini}Z`),
        state:elem.state
      }
    });//La Z es para decirle que los datos estan en el timezone 0UTC
  } catch (error) {
      //Tarea: en caso de error hay que evitar que salga la ventana porque van a a estar todos los turnos disponibles
      console.log('Error: '+ error);
  }
}

export async function getApptSettingsByServiceId(idService) {
  try {
    const urlAPI=`${domain}/appt/apptsettingsservice/${idService}`;
    const resp = await axios.get(urlAPI,Config());
    return resp.data;//Necesitara la z?
  } catch (error) {
      //Tarea: en caso de error hay que evitar que salga la ventana porque van a a estar todos los turnos disponibles
      console.log('Error: '+ error);
  }
}

export async function getApptSettingsByProfessionalId() {
  try {
    const urlAPI=`${domain}/appt/apptsettingsprofessional`;
    const resp = await axios.get(urlAPI,Config());
    return resp.data;//Necesitara la z?
  } catch (error) {
      //Tarea: en caso de error hay que evitar que salga la ventana porque van a a estar todos los turnos disponibles
      console.log('Error: '+ error);
  }
}

export async function userAppt() {
  try {
    const urlAPI=`${domain}/appt/userappt`;
    const resp = await axios.get(urlAPI,Config());
    return resp.data;
  }

  catch (error) {
      console.log('Error: '+ error);
  }
}

export async function profAppt() {
  try {
    const urlAPI=`${domain}/appt/profappt`;
    const resp = await axios.get(urlAPI,Config());
    return resp.data;
  }

  catch (error) {
      console.log('Error: '+ error);
  }
}

export async function logIn(bodyAPI){
  
  const urlAPI= `${domain}/auth/login`;
  const config = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }
  
  try {
    const resp = await axios.post(urlAPI, bodyAPI, config);
    localStorage.setItem('token',resp.data.token);
    localStorage.setItem('email',resp.data.email);
    return resp.data;
  } catch (error) {
    console.log('Error: '+ error)
    alert('El email o la contraseña es incorrecta');
  }
}

export async function signUp(bodyAPI) {
  const urlAPI= `${domain}/auth/signup`;
  try {
    const resp = await axios.post(urlAPI, bodyAPI);
    return resp.data;
  } catch (error) {
    console.log('Error: '+ error);
  }
}

export async function MyAppointmentsCancelAppt(id) {
  try {
    const urlAPI=`${domain}/appt/apptstate/${id}`;
    const resp = await axios.put(urlAPI,{},Config());//Requiere un body aun que sea vacio
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


export async function EditApptSetting(data){
  
  try {
    const urlAPI = `${domain}/appt/savesettings`;
    const resp = await axios.post(urlAPI,data,Config());
    return resp;
  }

  catch (error) {
    console.log('Error: '+ error);
  }
}

export async function EditHome(dataHome){

  try{
    const urlAPI = `${domain}/home/savehome`;
    const resolve = await axios.post(urlAPI, dataHome, Config());
    return(resolve)
  }
  catch (error){
    console.log('Error: ' + error)
  }
}

export async function EditCategory(dataCateg){
  try{

    const urlAPI = `${domain}/home/savecategory`;
    const resolve = await axios.post(urlAPI, dataCateg, Config());
    return(resolve)
  }
  catch (error){
    console.log('Error: ' + error)
  }
}

export async function EditServices(idCategory,dataServices){

  try{
    const urlAPI = `${domain}/home/saveservice/${idCategory}`;
    const resolve = await axios.post(urlAPI, dataServices, Config());
    return(resolve)
  }
  catch (error){
    console.log('Error: ' + error)
  }
}

export async function DeleteApptSetting(id){
  try{
    const urlAPI = `${domain}/appt/deleteapptsetting/${id}`;
    const resolve = await axios.delete(urlAPI,Config());
    return(resolve);
  }
  catch (error){
    console.log('Error: ' + error)
  }
}

export async function DeleteCategory(id){
  try{
    const urlAPI = `${domain}/home/deletecategory/${id}`;
    const resolve = await axios.delete(urlAPI,Config());
    return(resolve);
  }
  catch (error){
    console.log('Error: ' + error)
  }
}

export async function DeleteService(id){
  try{
    const urlAPI = `${domain}/home/deleteservice/${id}`;
    const resolve = await axios.delete(urlAPI,Config());
    return(resolve);
  }
  catch (error){
    console.log('Error: ' + error)
  }
}

export async function getUserByEmail(email){
  try{
    const urlAPI = `${domain}/auth/userbyemail/${email}`;
    const resolve = await axios.get(urlAPI,Config());
    return(resolve);
  }
  catch (error){
    console.log('Error: ' + error)
  }
}

export async function addProfessional(id){
  try{
    const urlAPI = `${domain}/home/addprofessional/${id}`;
    const resolve = await axios.put(urlAPI,{},Config());
    return(resolve);
  }
  catch (error){
    console.log('Error: ' + error)
  }
}

export async function deleteProfessional(id){
  try{
    const urlAPI = `${domain}/home/deleprofessional/${id}`;
    const resolve = await axios.delete(urlAPI,Config());
    return(resolve);
  }
  catch (error){
    console.log('Error: ' + error)
  }
}