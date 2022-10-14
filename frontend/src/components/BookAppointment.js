import React, { useEffect, useState } from 'react';
import '../styles/BookAppointment.css';
import '../styles/Modal.css';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { BookAppointmentGetApptSettings, BookAppointmentGetReserved} from '../services/API'
import { jsDateToText, jsDateToYearMonth} from '../services/DateTime'
import ModalAppt from './ModalAppt';
import ModalProfessional from './ModalProfessional';
import UseHomeContext from '../services/UseHomeContext';
import { useNavigate } from 'react-router-dom';

export default function BookAppointment() {

  const navigate= useNavigate();
  const {home} = UseHomeContext();
  const [days, setDays] = useState([]);//Lista con los divs de los dias del calendario
  const [currentView, setCurrentView] = useState((new Date()).getTime());//Mes actual en el calendario
  const [apptDay, setApptDay] = useState((new Date()).getTime());//Dia seleccionado en el calendario
  const [apptReserved, setApptReserved] = useState([]); //Lista de turnos reservados
  const [apptSettings, setApptSettings] = useState([]); //Lista de configuraciones para los turnos
  const [masterAppt, setMasterAppt] = useState([]); //Lista de profesionales con sus respectivos turnos
  const [appt, setAppt] = useState([]); //Lista de turnos de un profesional en particular
  const [modalWindow, setModalWindow] = useState(0); //0:Sin modal, 1:Modal profesionales, 2:Modal turnos
  const [idService, setIdService] = useState(); //Id del servicio seleccionado
  const [idProfessional, setIdProfessional] = useState() //Id del profesional

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

  //Cambia el calendario cuando currentview cambia
  useEffect(()=>{
    //Se dispara cuando se guarda la promesa del UseHomeContext por lo que se ignora verificando si posee contenido
    if(home[0]){
      renderCalendar()
    }
  //eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentView])

  //Trae la informacion del back y la almacena
  async function main(idService) {
    let settings = await BookAppointmentGetApptSettings(idService);
    //Si el servicio no tiene turnos no se continua
    if(settings.length===0){
      return
    }
    const maxDays = settings.reduce((acc,cur)=>Math.max(acc.daysAhead?acc.daysAhead:acc,cur.daysAhead));//Cantidad de dias con turnos
    let reserved = await BookAppointmentGetReserved(maxDays);
    setApptSettings(settings);
    setApptReserved(reserved);
    let app = getAppts(settings,reserved,maxDays);
    //Si el servicio tiene un solo profesional se lo selecciona automaticamente
    if(app.length===1){
      setAppt(app[0]);
      renderCalendar(app);
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
      time.setHours(sett.workdayInit.slice(0,2),sett.workdayInit.slice(3,5),0,0);
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

  const renderCalendar = (app1) => {
    let app = app1 || appt;
    let calendar = [];

    const date = new Date(currentView);//Mes a vizualizar
    date.setDate(1);//Setea la fecha al dia uno del mes
  
    //Trae el ultimo dia del mes actual
    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0 //si se le da el dia 0 trae el ultimo dia del mes anterior
    );
  
    //Trae el ultimo dia del mes anterior
    const prevLastDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      0
    );

    //Dias del mes anterior
    let number;
    let month=-1;//-1: Mes anterior, 0: Mes actual, 1: Mes siguiente
    if(prevLastDay.getDay() !== 6){
      number = prevLastDay.getDate();
      let date2 = new Date(prevLastDay.getTime());
      for (let i = prevLastDay.getDay(); i >= 0; i--) {//Recorre desde el ultimo dia del mes anterior
        let time = date2.getTime();//Guardo el tiempo en ms
        calendar.unshift({number,month,time});
        date2.setDate(date2.getDate()-1);//Resto un dia para la celda anterior
        number--;//Resto una unidad para el numero anterior
      }      
    }

    //Dias del mes actual y siguiente
    number = 0;
    let length = 42-calendar.length; //El calendario va a ser de 7x6
    month = 0;
    let date3 = new Date(date.getFullYear(),date.getMonth(),1);//Prmer dia del mes a hs 00:00
    for (let i = 0; i < length; i++) {
      if(number<lastDay.getDate()){//En el ultimo dia del mes reseteo la cuenta para el mes siguiente
        number++;
      }else{
        number=1;
        month=1
      };
      let time = date3.getTime();
      calendar.push({number,month,time});
      date3.setDate(date3.getDate()+1);
    }

    //Se hace el merge entre apps y calendar
    let calendarAppt = calendar.map((cal,index)=>{
      let find = app[0].appointments.find(ap=>ap.timestamp===cal.time);//Se traen los turnos del dia si existen
      if(find){
        let {timestamp,...complement}=find;
        return {...cal,...complement}
      }else{
        return {...cal}
      }
      
    });

    //Se agregan los divs correspondiente al mes pasado
    let today=new Date();
    today.setHours(0,0,0,0);
    const msToday=today.getTime();

    let daysCalendar=calendarAppt.map((day,index)=>
      <div 
        key={index} 
        className={
          (day.month!==0?'out-month ':'' )
          +(day.apptAvalNumer?'on ':'')
          +(msToday===day.time?'today ':'')
        }
        onClick={day.apptAvalNumer?()=>apptModal(day):undefined}
      >
        {day.number}
      </div>
    );
    setDays(daysCalendar);
  };

  //Cambia el mes del calendario
  function changeMonth(add) {
    const date = new Date(currentView);
    date.setMonth(date.getMonth() + add);
    setCurrentView(date.getTime());
  }

  function apptModal(day) {
    if(day.month>0){//Si es el mes siguiente
      setCurrentView(day.time);
    }
    setApptDay(day.time);
    setModalWindow(2); //Activa el modal de los profesionales
  }

  return (
    <div className='masterContainer'>
      <ModalProfessional 
        masterAppt={masterAppt}
        setAppt={setAppt}
        setModalWindow={setModalWindow}
        setIdProfessional={setIdProfessional}
        professionals={masterAppt.map(pro=>pro.professional)}
      />
      {
        (apptSettings[0] && (modalWindow>0))?
          <div className="calendar">
            <div className="month">
              <AiFillCaretLeft onClick={()=>changeMonth(-1)}/>
              <div>
                <h1>{jsDateToYearMonth(currentView)}</h1>
                <p>{jsDateToText((new Date()).getTime())}</p>
              </div>
              <AiFillCaretRight onClick={()=>changeMonth(1)}/>
            </div>
            <div className="weekdays">
              <div>Dom</div>
              <div>Lun</div>
              <div>Mar</div>
              <div>Mié</div>
              <div>Jue</div>
              <div>Vie</div>
              <div>Sáb</div>
            </div>
            <div className="days">
              {days.map((day)=>
                day
              )}
            </div>
          </div>
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