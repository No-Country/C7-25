import React, { useEffect, useState } from 'react';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { jsDateToText, jsDateToYearMonth} from '../services/DateTime';

export default function BookApptCalendar({appt,setApptDay,setModalWindow}) {

  const [currentView, setCurrentView] = useState((new Date()).getTime());//Mes actual en el calendario
  const [days, setDays] = useState([]);//Lista con los divs de los dias del calendario

  //Cambia el calendario cuando currentview cambia
  useEffect(()=>{
    //Se dispara cuando se guarda la promesa del UseHomeContext por lo que se ignora verificando si posee contenido
    if(appt){
      renderCalendar(appt);
    }
  //eslint-disable-next-line react-hooks/exhaustive-deps
  },[currentView,appt])

  function renderCalendar (app1) {
    console.log('En render calendar');
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
      let find = app.appointments.find(ap=>ap.timestamp===cal.time);//Se traen los turnos del dia si existen
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
  )
}
