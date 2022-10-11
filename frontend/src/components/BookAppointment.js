import React, { useEffect, useState } from 'react';
import '../styles/BookAppointment.css';
import '../styles/Modal.css';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { BookAppointmentGetApptSettings, BookAppointmentGetReserved} from '../services/API'
import { jsDateToText, jsDateToYearMonth} from '../services/DateTime'
import ModalAppt from './ModalAppt';
import ModalProfessional from './ModalProfessional';
import UseHomeContext from '../services/UseHomeContext';

export default function BookAppointment() {

  const {home} = UseHomeContext();
  const [days, setDays] = useState([]);//Lista con los divs de los dias del calendario
  const [currentView, setCurrentView] = useState((new Date()).getTime());//Mes actual en el calendario
  const [apptDay, setApptDay] = useState((new Date()).getTime());//Dia seleccionado en el calendario
  const [apptReserved, setApptReserved] = useState([]); //Lista de turnos reservados
  const [apptSettings, setApptSettings] = useState([]); //Lista de configuraciones para los turnos
  const [appt, setAppt] = useState([]); //Lista de turnos
  const [modalWindow, setModalWindow] = useState(0); //0:Sin modal, 1:Modal profesionales, 2:Modal turnos
  const [idService, setIdService] = useState(); //Id del servicio seleccionado
  const [idProfessional, setIdProfessional] = useState() //Id del profesional

  /*//Los pedidos al back solo se realizan en la primera carga
  useEffect(() => {
    main();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[])*//* parece que no hace falta porque home siempre demora mas y se dispara despues */

  useEffect(()=>{
    if(home.categories){
      //console.log('tiene algo parece',home);
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
  useEffect(()=>
    renderCalendar()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  ,[currentView])

  //Trae la informacion del back y la almacena
  async function main(idService) {
    let settings = await BookAppointmentGetApptSettings(idService);
    const maxDays = settings.reduce((acc,cur)=>Math.max(acc.daysAhead?acc.daysAhead:acc,cur.daysAhead));//Cantidad de dias con turnos
    let reserved = await BookAppointmentGetReserved(maxDays);
    setApptSettings(settings);
    setApptReserved(reserved);
    let app = getAppts(settings,maxDays);
    renderCalendar(app); 
  }

  function getAppts(settings,maxDays) {

    let app=[];
    const today = new Date();
    today.setHours(0,0,0,0);
    let quantity;
    //
    for (let i = 0; i < maxDays; i++) {
      //Para el campo del dia
      today.setDate(today.getDate()+1);
      const time = today.getTime();

      //Para el campo de existencia de turnos
      quantity = i%2===0;
      app.push({time,quantity});
    }
    //Tarea: convertir los apptSettings en turnos
    ////Uso el codigo que ya tengo y le agrego el id del serv y del prof que estan en el apptsetting
    //// {...appt,servid,profId}
    //Tarea: agrupar los turnos por dia
    ////Con un array de los dias puedo hacer un map y adentro filtrar los dias
    //Tarea: obtener todos los profesionales del servicio
    ////Puedo crear un array con los profId de cada appset (push) y al final eliminar los repetidos
    ////[1,3,2,6,2,1,3,6,2,1,23,6] -> [1,3,2,6,23]
    //Tarea: obtener los turnos de cada profesional
    ////Con el array de los profid puedo hacer un map, agregarle los datos del prof y hacer un filter interno para reducir el array de turnos
    //Fuera de esto necesito un metodo para que conmute los turnos del profesional
    setAppt(app);
    console.log('APP',app);
    return app;
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

    //console.log(lastDay,prevLastDay.getDate());
    //Dias del mes anterior
    let number;
    let month=-1;//-1: Mes anterior, 0: Mes actual, 1: Mes siguiente
    if(prevLastDay.getDay() !== 6){
      number = prevLastDay.getDate();
      let date2 = new Date(prevLastDay.getTime());
      for (let i = prevLastDay.getDay(); i > 0; i--) {//Recorre desde el ultimo dia del mes anterior
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
      let find = app.find(ap=>ap.time===cal.time);//Se traen los turnos del dia si existen
      if(find){
        let {time,...complement}=find;
        return {...cal,...complement}
      }else{
        return {...cal}
      }
      //console.log('find',find,complement);
      
    });
    //console.log('calendatAppt',calendarAppt);

    //Se agregan los divs correspondiente al mes pasado
    let today=new Date();
    today.setHours(0,0,0,0);
    const msToday=today.getTime();

    let daysCalendar=calendarAppt.map((day,index)=>
      <div 
        key={index} 
        className={
          (day.month!==0?'out-month ':'' )
          +(day.quantity?'on ':'')
          +(msToday===day.time?'today ':'')
        }
        onClick={day.quantity?()=>apptModal(day):undefined}
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
    //let aux = new Date(currentView);
    if(day.month>0){//Si es el mes siguiente
      setCurrentView(day.time);
    }
    console.log(day.time);
    setApptDay(day.time);
    setModalWindow(1); //Activa el modal de los profesionales
  }

  return (
    <div className='masterContainer'>
      <ModalProfessional 
        apptDay={apptDay} 
        setModalWindow={setModalWindow}
        setIdProfessional={setIdProfessional}
      />
      <div className="calendar">
        <div className="month">
          <AiFillCaretLeft onClick={()=>changeMonth(-1)} className="fas fa-angle-left prev"/>
          <div>
            <h1>{jsDateToYearMonth(currentView)}</h1>
            <p>{jsDateToText((new Date()).getTime())}</p>
          </div>
          <AiFillCaretRight onClick={()=>changeMonth(1)} className="fas fa-angle-right next"/>
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
      {
        (apptSettings[0] && modalWindow===2)?
          <ModalAppt 
            apptSettings={apptSettings[0]} 
            apptDay={apptDay} 
            apptReserved={apptReserved}
            idService={idService}
            idProfessional={idProfessional}
          />
        :
          <></>
        
      }

    </div>
  )
}
