import React, { useEffect, useState } from 'react';
import '../styles/BookAppointment.css';
import {BookAppointmentSaveAppt} from '../services/API'
import {jsDateToHsMin, jsDateToText} from '../services/DateTime'

export default function ModalAppt({workday, apptDay, apptReserved}) {
  const [apptDisp, setApptDisp] = useState([]);//Lista de turnos a mostrar

  useEffect(()=>
    setApptDisp(appt(apptReserved))
    //eslint-disable-next-line react-hooks/exhaustive-deps
  ,[apptDay])

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

  //Guarda el turno en la db
  async function saveAppt(apptm,index) {
    let resp = await BookAppointmentSaveAppt(apptm,workday);
    if(resp.status===201){ //Si la operacion se realizo con exito
      let aux = [...apptDisp];
      aux[index].disp=false;
      setApptDisp(aux);
    }
  }


  return (
    <div>
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
