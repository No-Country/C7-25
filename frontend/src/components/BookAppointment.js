import React, { useEffect, useState } from 'react';
import '../styles/BookApptCalendar.css';
import '../styles/Modal.css';
import { getApptSettingsByServiceId, BookAppointmentGetReserved} from '../services/API';
import ModalAppt from './BookApptModalAppt';
import ModalProfessional from './BookApptProfessional';
import UseHomeContext from '../services/UseHomeContext';
import { useNavigate } from 'react-router-dom';
import BookApptCalendar from './BookApptCalendar';

export default function BookAppointment() {

  const navigate= useNavigate();
  const {home} = UseHomeContext();
  const [apptDay, setApptDay] = useState((new Date()).getTime());//Dia seleccionado en el calendario
  const [apptSettings, setApptSettings] = useState([]); //Lista de configuraciones para los turnos
  const [masterAppt, setMasterAppt] = useState([]); //Lista de profesionales con sus respectivos turnos
  const [appt, setAppt] = useState([]); //Lista de turnos de un profesional en particular
  const [modalWindow, setModalWindow] = useState(0); //0:Sin modal, 1:Modal profesionales, 2:Modal turnos
  const [idService, setIdService] = useState(); //Id del servicio seleccionado

  useEffect(()=>{
    if(!localStorage.getItem('token')){
      navigate('/login');
    }
    if(home.categories){
      let getUrl= new URLSearchParams (window.location.search);
      let indexCategory = getUrl.get('indexCategory');
      let indexService= getUrl.get('indexService');
      let id=home.categories[indexCategory].services[indexService].id;
      setIdService(id);
      main(id);//Una vez que se tiene el home se consulta la API
    }
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[home])

  //Trae la informacion del back y la almacena
  async function main(idService) {
    let settings = await getApptSettingsByServiceId(idService);
    //Si el servicio no tiene turnos no se continua
    if(settings.length===0){
      return
    }
    const maxDays = settings.reduce((acc,cur)=>Math.max(acc.daysAhead?acc.daysAhead:acc,cur.daysAhead));//Cantidad de dias con turnos
    let reserved = await BookAppointmentGetReserved(maxDays);
    setApptSettings(settings);
    //setApptReserved(reserved);
    let app = getAppts(settings,reserved,maxDays);
    //Si el servicio tiene un solo profesional se lo selecciona automaticamente
    if(app.length===1){
      setAppt(app[0]);
      //renderCalendar(app);
      setModalWindow(1);
    }
  }

  function getAppts(settings,reserved,maxDays) {

    function getDays(){
      let daysSettings=[];
      const today = new Date();
      today.setHours(0,0,0,0);

      for (let i = 0; i < maxDays; i++) {
        //Para el campo del dia
        today.setDate(today.getDate()+1);
        const time = today.getTime();
        daysSettings.push(time);
      }
      return daysSettings;
    }

    function apptsOfTheDay(sett,reserved,day){ 
      const apptSettingsId = sett.id;
      let time=new Date(day);//Tue Sep 27 2022 08:00:00 GMT-0300 (hora estándar de Argentina)
      //Mejorar esto
      time.setHours(Math.floor(sett.workdayInit/60),Math.floor(sett.workdayInit%60),0,0);
      let appts=[];
      let ini='';
      let end='';
      ini=time.getTime();//time es un objeto por lo que el = crea una referencia, gettime es un literal
      for (let index = 1; index <= (sett.workdayDuration/sett.apptDuration); index++) {
    
        const disp = !reserved.some(obj=> obj.getTime()===time.getTime());//Devuelvo true si el turno no se encuentra reservado
  
        time.setTime(time.getTime() + sett.apptDuration*60*1000);//Sumo el tiempo de un turno
        end=time.getTime();//hr min para el fin del turno
  
        //const disp = !reserved.some(obj=> aux===obj.init.slice(11,16)); //comparo los turnos reservados con los turnos del dia
  
        appts.push({apptSettingsId,ini,end,disp});//Vector con todos los turnos
        ini=end;//El fin del turno actual es el inicio del turno siguiente
      }   
      return appts;  
    }
    

    function processApptSettings(professionalsList,daysSettings){
      return settings.map((currentSetting,index)=>{
        //Decodifico los dias habilitados
        const prime=[2,3,5,7,11,13,17];
        let daysAvailable = prime.map(num=>currentSetting.daysAvailable%num===0);
        //Por cada setting agrego los dias con turnos
        //Matriz con los dias con turnos x los turnos de cada dia
        let appOfCurrentSetting=[];
        for (let i = 0; i < currentSetting.daysAhead ; i++) {
          let currentDay = new Date(daysSettings[i]);
          if(daysAvailable[currentDay.getDay()]){//Si el dia esta configurado para tener turnos
            //Array de turnos del dia
            appOfCurrentSetting.push( apptsOfTheDay(currentSetting,reserved,daysSettings[i]) );
          }else{
            appOfCurrentSetting.push([]);
          }
        }
        //Agrego el id al array externo profesionalsList
        professionalsList.push(currentSetting.professionalId);
        return {currentSetting,appOfCurrentSetting};
      });
    }

    function filterProfesionals(profesionalsId,rawApptBySetting){

      return profesionalsId.map(id=>rawApptBySetting.filter(apptSeting=>
        apptSeting.currentSetting.professionalId===id
      ));

    }

    function mergeSettings(abPaS){
      //Itera entre todos los profesionales
      return abPaS.map(prof=>{
        const professionalId = prof[0].currentSetting.professionalId;
        //Una matriz de turnos para cada profesional
        let matrix=[];
        for (let i = 0; i < maxDays; i++) {
          matrix.push([]);
        }
        //Itera entre todas las settings
        prof.map(sett=>{
          //Itera entre todos los dias 
          sett.appOfCurrentSetting.forEach((element,index) => {
            //Como element es un array de turnos necesito disperzarlo para unirlo con los otros
            matrix[index].push(...element);
          });
        });
        return {professionalId,matrix};
      });
    }

    function addDataForRender(rAbPaD,daysSettings,professionals){
      //Itera los profesionales
      return rAbPaD.map((prof,index0)=>{
        const {professionalId}=prof;
        //Itera los dias
        let appointments = prof.matrix.map((day,index)=>{
          const apptAvalNumer = (day.length>0)?
            day.reduce((count, appt, index) => 
              (appt.disp) ?
                count + 1 
              : 
                count
            ,0) //Valor inicial, de otro modo lo toma al objeto intero como primer valor
          :
            0;
          
          return {appts:day,apptAvalNumer,timestamp:daysSettings[index]}
        })
        if(appointments.length!==daysSettings.length){
          alert('problema en la logica de turnos');
        }
        return {professional:professionals[index0],appointments}
      })
    }

    //Obtengo los dias corridos en ms segun lo indicado en apptSeting
    const daysSettings = getDays();
    //Este array es editado por referencia en processApptSettings, posee los id del profesional de cada setting
    let professionalsList=[];
    //Obtengo los turnos encapsulados en su setting generadora
    const apptBySetting = processApptSettings(professionalsList,daysSettings);
    //Con set se filtra todos los ids repetidos
    let professionals=Array.from(new Set(professionalsList));
    //Junta todos los appt y setings con su respectivo profesional
    let apptByProfessionalsAndSettings = filterProfesionals(professionals,apptBySetting);
    //convierte el array de ids en array de profesionales
    professionals = professionals.map(id=>home.professionals.find(pro=> pro.id===id));
    //Elimina la agrupacion por settings uniendo todos los turnos de un mismo dia
    let rawApptByProfessionalsAndDays = mergeSettings(apptByProfessionalsAndSettings);
    //Agrega informacion necesaria para renderizar la vista
    let apptByProfessionalsAndDays = addDataForRender(rawApptByProfessionalsAndDays,daysSettings,professionals);
    setMasterAppt(apptByProfessionalsAndDays);
    console.log('APP',apptByProfessionalsAndDays);
    return apptByProfessionalsAndDays;
  }

  return (
    <div className='masterContainer'>
      <ModalProfessional 
        masterAppt={masterAppt}
        setAppt={setAppt}
        setModalWindow={setModalWindow}
        professionals={masterAppt.map(pro=>pro.professional)}
      />
      {
        (apptSettings[0] && (modalWindow>0))?
          <BookApptCalendar
            appt={appt}
            setApptDay={setApptDay}
            setModalWindow={setModalWindow}
          />
        :
          <></>
      }
      {
        (modalWindow===2)?
          <ModalAppt 
            appt={appt}
            apptDay={apptDay} 
            idService={idService}
            setModalWindow={setModalWindow}
          />
        :
          <></>
      }

    </div>
  )
}