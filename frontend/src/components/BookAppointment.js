import React, { useEffect, useState } from 'react';
import '../styles/BookAppointment.css';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import {BookAppointmentSaveAppt, BookAppointmentGetReserved} from '../services/API'
import {jsDateToHsMin, jsDateToText} from '../services/dateTime'

export default function BookAppointment() {

  ////////////////////////Calendario////////////////////////
  const [days, setDays] = useState([]);
  const [currentView, setCurrentView] = useState((new Date()).getTime());

  const renderCalendar = () => {
    const date = new Date(currentView);//Fecha y hora actual
    date.setDate(1);//Setea la fecha al dia uno del mes
  
    //Trae el numero del ultimo dia del mes actual
    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0 //si se le da el dia 0 trae el ultimo dia del mes anterior
    ).getDate();
  
    //Trae el numero del ultimo dia del mes anterior
    const prevLastDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      0
    ).getDate();
  
    //Dia de la semana del primer dia del mes 
    //segun su orden en el calendario domingo=0, lunes=1...
    const firstDayIndex = date.getDay();
  
    //Dia de la semana del ultimo dia del mes 
    const lastDayIndex = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDay();
  
    //Dias de la ultima semana que son del mes siguiente
    const nextDays = 7 - lastDayIndex - 1;
  
    const months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
  
    document.querySelector(".date h1").innerHTML = months[date.getMonth()];
    document.querySelector(".date p").innerHTML = new Date().toDateString();
    
    //Se agregan los divs correspondiente al mes pasado
    let daysCalendar=[];
    for (let x = firstDayIndex; x > 0; x--) {
      daysCalendar.push(<div className='prev-date' key={x - 1 - prevLastDay}>{prevLastDay - x + 1}</div>);
    }
  
    //Se agregan los divs correspondiente al mes actual
    for (let i = 1; i <= lastDay; i++) {
      if (
        i === new Date().getDate() &&
        date.getMonth() === new Date().getMonth()
      ) {
        daysCalendar.push(<div onClick={()=>apptModal(i)} className='today' key={i}>{i}</div>);
      } else {
        daysCalendar.push(<div onClick={()=>apptModal(i)} key={i}>{i}</div>);
      }
    }
  
    //Se agregan los divs correspondiente al mes siguiente
    for (let j = 1; j <= nextDays; j++) {
      daysCalendar.push(<div onClick={()=>apptModal(-j)} className='next-date' key={-j}>{j}</div>);
    }
    setDays(daysCalendar);
  };

  //Cambia el mes del calendario
  function changeMonth(add) {
    console.log('asda1',currentView)
    const date = new Date(currentView);
    date.setMonth(date.getMonth() + add);
    console.log('asdasd2',date.getTime())
    setCurrentView(date.getTime());
  }
  /////////////////////////////////////////////////////
  function apptModal(modalDate) {
    let aux = new Date(currentView);
    if(modalDate<0){
      aux.setMonth(aux.getMonth()+1);
      setCurrentView(aux.getTime());
    }
    aux.setDate(Math.abs(modalDate));//Cambio el dia en valor absoluto par si es del mes siguiente
    console.log('aux',aux);
    setApptDay(aux.getTime());
  }
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////

  const [apptDisp, setApptDisp] = useState([]);
  const [apptDay, setApptDay] = useState((new Date()).getTime());
  const [apptReserved, setApptReserved] = useState([]);

  const workday={
    workdayInit:'08:00', //inicio de la jornada
    workdayDuration:720, //duracion de la jornada en minutos
    apptDuration:18, //duracion del turno en minutos
    daysAvailable:[], //Por lo general de lunes a viernes [1,2,3,4,5]
    daysAHead:14, //Numeros de dias con turnos habilitados
    daysNotAvailable:[] //Feriados, licencia etc
  }


  //usar usestate para la fecha
  //Para crear el rango de hs de cada turno
  function appt(reserved){ 
    let time=new Date(apptDay);//Tue Sep 27 2022 08:00:00 GMT-0300 (hora estándar de Argentina)
    console.log('time',time);
    //Mejorar esto
    time.setHours(workday.workdayInit.slice(0,2),workday.workdayInit.slice(3,5),0,0);
    console.log('time',time);
    console.log('timereserv',reserved);
    let appts=[];
    let ini='';
    let end='';
    ini=time.getTime();//time es un objeto por lo que el = crea una referencia, gettime es un literal
    for (let index = 1; index <= (workday.workdayDuration/workday.apptDuration); index++) {
  
      const disp = !reserved.some(obj=> obj.getTime()===time.getTime());//Devuelvo true si el turno no se encuentra reservado

      time.setTime(time.getTime() + workday.apptDuration*60*1000);//Sumo el tiempo de un turno
      end=time.getTime();//hr min para el fin del turno

      //const disp = !reserved.some(obj=> aux===obj.init.slice(11,16)); //comparo los turnos reservados con los turnos del dia

      appts.push({ini,end,disp});//Vector con todos los turnos
      ini=end;//El fin del turno actual es el inicio del turno siguiente
    }   
    return appts;  
  }

  async function main() {
    /*renderCalendar();
    ///////////////////////////////////
    setApptReserved(await BookAppointmentGetReserved(workday));
    console.log('setFirstRender',apptReserved);
    setApptDisp(appt(apptReserved));
    */
    renderCalendar();
    ///////////////////////////////////
    let reserved = await BookAppointmentGetReserved(workday);
    setApptDisp(appt(reserved));
    setApptReserved(reserved);
    console.log('setFirstRender');
  }

  ///setApptDisp(appt(apptReserved));
  useEffect(()=>
    setApptDisp(appt(apptReserved))
    //eslint-disable-next-line react-hooks/exhaustive-deps
  ,[apptDay])

  useEffect(()=>
    renderCalendar()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  ,[currentView])

  useEffect(() => {
    main();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  //Guarda el turno en la db
  async function saveAppt(apptm,index) {
    let resp = await BookAppointmentSaveAppt(apptm,workday);
    if(resp.status===201){ //Si la operacion se realizo con exito
      let aux = [...apptDisp];
      aux[index].disp=false;
      setApptDisp(aux);
    }
  }
  
  console.log('BookAppointment se esta renderizando')
  return (
    <div>
      <div>
        <div className="calendar">
          <div className="month">
            <AiFillCaretLeft onClick={()=>changeMonth(-1)} className="fas fa-angle-left prev"/>
            <div className="date">
              <h1> </h1>
              <p></p>
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
      </div>

      {/*Poner en un modal y componente*/}
      <div className='dayCalendarContainer'>
        <div className='head flexRow'>Elije un horario</div>
        <div className='date flexRow'>{jsDateToText(apptDay)}</div>
        <div className='apptsContainer'>
        {
            apptDisp.map((turn,index)=>
              <div  className='appt  flexRow' key={index}>
                <div className='time'>{jsDateToHsMin(turn.ini)+ ' a ' +jsDateToHsMin(turn.end)}</div>
                {
                  turn.disp?
                    <div className='apptBtn' onClick={()=>saveAppt(turn, index)}>Reservar</div>
                    :
                    <div className='ghostBtn'></div>
                }
              </div>
            )
          }
        </div>
      </div>

    </div>
  )
}
