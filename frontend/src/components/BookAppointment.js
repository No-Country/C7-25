import React, { useEffect, useState } from 'react';
import '../styles/BookAppointment.css';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
import { BookAppointmentGetReserved} from '../services/API'
import { jsDateToText, jsDateToYearMonth} from '../services/DateTime'
import ModalAppt from './ModalAppt';

export default function BookAppointment() {

  ////////////////////////Calendario////////////////////////
  const [days, setDays] = useState([]);//Lista con los divs de los dias del calendario
  const [currentView, setCurrentView] = useState((new Date()).getTime());//Mes actual en el calendario
  const [apptDay, setApptDay] = useState((new Date()).getTime());//Dia seleccionado en el calendario
  const [apptReserved, setApptReserved] = useState([]); //Lista de turnos reservados

  //Los pedidos al back solo se realizan en la primera carga
  useEffect(() => {
    main();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  //Esto se debe traer del back
  const workday={
    workdayInit:'08:00', //inicio de la jornada
    workdayDuration:720, //duracion de la jornada en minutos
    apptDuration:18, //duracion del turno en minutos
    daysAvailable:[], //Por lo general de lunes a viernes [1,2,3,4,5]
    daysAHead:14, //Numeros de dias con turnos habilitados
    daysNotAvailable:[] //Feriados, licencia etc
  }

  //Trae la informacion del back y la almacena
  async function main() {
    renderCalendar();
    let reserved = await BookAppointmentGetReserved(workday);
    //setApptDisp(appt(reserved));
    setApptReserved(reserved);
    console.log('setFirstRender');
  }

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




  //Fijate como actualizar la vista
  /*///setApptDisp(appt(apptReserved));
  useEffect(()=>
    setApptDisp(appt(apptReserved))
    //eslint-disable-next-line react-hooks/exhaustive-deps
  ,[apptDay])*/

  //Cambia el calendario cuando currentview cambia
  useEffect(()=>
    renderCalendar()
    //eslint-disable-next-line react-hooks/exhaustive-deps
  ,[currentView])



  
  console.log('BookAppointment se esta renderizando')
  return (
    <div>
      <div>
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
      </div>

      <ModalAppt workday={workday} apptDay={apptDay} apptReserved={apptReserved}/>

    </div>
  )
}
