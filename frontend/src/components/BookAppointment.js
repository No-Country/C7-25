import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../styles/BookAppointment.css';
import { AiFillCaretLeft, AiFillCaretRight } from 'react-icons/ai';
//import {BookAppointmentSaveAppt} from '../services/API'

export default function BookAppointment() {

  const date = new Date();
  const renderCalendar = () => {
    date.setDate(1);
  
    const monthDays = document.querySelector(".days");
  
    const lastDay = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDate();
  
    const prevLastDay = new Date(
      date.getFullYear(),
      date.getMonth(),
      0
    ).getDate();
  
    const firstDayIndex = date.getDay();
  
    const lastDayIndex = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
    ).getDay();
  
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
  
    let days = "";
  
    for (let x = firstDayIndex; x > 0; x--) {
      days += `<div class="prev-date">${prevLastDay - x + 1}</div>`;
    }
  
    for (let i = 1; i <= lastDay; i++) {
      if (
        i === new Date().getDate() &&
        date.getMonth() === new Date().getMonth()
      ) {
        days += `<div class="today">${i}</div>`;
      } else {
        days += `<div>${i}</div>`;
      }
    }
  
    for (let j = 1; j <= nextDays; j++) {
      days += `<div class="next-date">${j}</div>`;
      monthDays.innerHTML = days;
    }
  };

  /////////////////////////////////////////////////////


  const [apptDisp, setApptDisp] = useState([]);

  const workday={
    init:'2022-11-24T08:00', //inicio de la jornada
    workdayDuration:720, //duracion de la jornada en minutos
    apptDuration:18, //duracion del turno en minutos
    daysAvailable:[], //Por lo genral de lunes a viernes []
    daysNotAvailable:[]
  }

  let time=new Date(workday.init);//Tue Sep 27 2022 08:00:00 GMT-0300 (hora estándar de Argentina)

  function dateToText(isoDate){
    //isoDate tiene este formato 2022-09-29T08:18:00
    const months=[
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre'
    ];
    const days=[
      'Domingo',
      'Lunes',
      'Martes',
      'Miercoles',
      'Jueves',
      'Viernes',
      'Sabado'
    ]
    const day=days[isoDate.getDay()];
    const dayNumber=parseInt(isoDate.getDate());
    const month=months[isoDate.getMonth()];

    return `${day} ${dayNumber} de ${month}`;
  }
  const dateString = dateToText(time);
  
  //Trae la lista de turnos reservados en el dia
  async function getReserved() {
    try {
      const urlAPI1='http://192.168.0.7:8080/appt/getapptday/2022-09-29T08:00/2022-09-29T20:00';
      const resp = await axios.get(urlAPI1);
      return resp.data;
    } catch (error) {
        //Tarea: en caso de error hay que evitar que salga la ventana porque vana a estar todos los turnos disponibles
        console.log('Error: '+ error);
    }
  }

  //Para crear el rango de hs de cada turno
  function appt(reserved){
    let appts=[];
    let ini='';
    let end='';
    ini=('0'+time.getHours()).slice(-2)+':'+('0'+time.getMinutes()).slice(-2);//convierto el date al formato hora minuto 00:00
    for (let index = 1; index <= (workday.workdayDuration/workday.apptDuration); index++) {
      
      time.setTime(time.getTime() + workday.apptDuration*60*1000);//Sumo el tiempo del turno
      end=('0'+time.getHours()).slice(-2)+':'+('0'+time.getMinutes()).slice(-2);//hr min para el fin del turno

      const aux=ini;//Me tira warning si pongo la variable ini en el Array.some
      const disp = !reserved.some(obj=> aux===obj.init.slice(11,16)); //comparo los turnos reservados con los turnos del dia

      appts.push({ini,end,disp});//Vector con todos los turnos
      ini=end;//El fin del turno actual es el inicio del turno siguiente
    }   
    return appts;  
  }

  async function main() {
    renderCalendar();
    ///////////////////////////////////
    let reserved = await getReserved();
    console.log('respresp',reserved);
    console.log('setFirstRender');
    setApptDisp(appt(reserved));
  }

  useEffect(() => {
    main();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  //Guarda el turno en la db
  async function saveAppt(apptm,index) {
    /*let resp = await BookAppointmentSaveAppt(apptm,index,workday);
    console.log(resp);*/
    const today=workday.init.split('T');//Separa la fecha y hora
    const turn={
      init:today[0]+'T'+apptm.ini+':00',//Une la fecha y hora del turno
      end:today[0]+'T'+apptm.end+':00'
    }
    try {
        const token = localStorage.getItem('token');
        const config = {
          headers: {
            Authorization : `Bearer ${token}`
          } 
        }
        const UserusedUrlAPI='http://localhost:8080/appt/save';
        //const resp = 
        await axios.post(UserusedUrlAPI,turn,config);
        let aux = [...apptDisp];
        aux[index].disp=false;
        setApptDisp(aux);
        //return resp.data;
    } catch (error) {
        console.log('Error: '+ error);
    }
  }
  
  console.log('BookAppointment se esta renderizando')
  return (
    <div>
      <div>
        <div className="calendar">
          <div className="month">
            <AiFillCaretLeft className="fas fa-angle-left prev"/>
            <div className="date">
              <h1></h1>
              <p></p>
            </div>
            <AiFillCaretRight className="fas fa-angle-right next"/>
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
          <div className="days"></div>
        </div>
      </div>

      {/*Poner en un modal y componente*/}
      <div className='dayCalendarContainer'>
        <div className='head flexRow'>Elije un horario</div>
        <div className='date flexRow'>{dateString}</div>
        <div className='apptsContainer'>
        {
            apptDisp.map((turn,index)=>
              <div  className='appt  flexRow' key={index}>
                <div className='time'>{turn.ini+ ' a ' +turn.end}</div>
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
