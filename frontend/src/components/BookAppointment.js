import axios from 'axios';
import React from 'react'
import '../styles/BookAppointment.css'

export default function BookAppointment() {



  const workday={
    init:'2022-09-27T08:00', //inicio de la jornada
    workdayDuration:720, //duracion de la jornada en minutos
    apptDuration:18 //duracion del turno en minutos
  }

  //Para crear un array con las hs de atencion
  let hours=[];
  for (let index = 8; index <= 20; index++) {
    hours.push(index);
  }

  const margin = 4;
  const apptHeight = 60+2*margin;//altura en px en el css del boton para pedir turno + margen
  const heightHs = apptHeight*60/workday.apptDuration; //Regla de 3 simple para la altura de 1hr


  //Para crear el rango de hs de cada turno
  //Falta retirar los no disponibles
  let apptDisp=[];
  let time=new Date(workday.init);
  let ini,end;
  ini=('0'+time.getHours()).slice(-2)+':'+('0'+time.getMinutes()).slice(-2);//convierto el date al formato hora minuto 00:00
  for (let index = 1; index <= (workday.workdayDuration/workday.apptDuration); index++) {
    
    time.setTime(time.getTime() + workday.apptDuration*60*1000);//Sumo el tiempo del turno
    end=('0'+time.getHours()).slice(-2)+':'+('0'+time.getMinutes()).slice(-2);//hr min para el fin del turno
    apptDisp.push([ini,end,(index-1)*apptHeight+margin]);//Vector con todos los turnos
    ini=end;//El fin del turno actual es el inicio del turno siguiente

  }  
  console.log(apptDisp);





  //Guarda el turno en la db
  let saveAppt = async (apptm) => {
    const today=workday.init.split('T');//Separa la fecha y hora
    const turn={
      init:today[0]+'T'+apptm[0]+':00',//Une la fecha y hora del turno
      end:today[0]+'T'+apptm[1]+':00'
    }
    try {
        const UserusedUrlAPI='http://localhost:8080/appt/save';
        const resp = await axios.post(UserusedUrlAPI,turn);
        return resp.data;
    } catch (error) {
        console.log('Error: '+ error);
    }
  }

  console.log('BookAppointment se esta renderizando')
  return (
    <div>
      <div className='calendarContainer'>
        <div>
          {
            hours.map((hora,index)=> //Para crear la barra lateral con las horas de atencion
              <div className='horas' style={ { height: heightHs } } key={index}>
                {('0' + hora).slice(-2)+' Hs'}
              </div>
            )
          }
        </div>
        {
          apptDisp.map((turn,index)=>
            <div onClick={()=>saveAppt(turn)} className='appt' style={ { top: turn[2]+'px' } }>
              <span>{turn[0]+ ' a ' +turn[1]}</span>
              <br/>
              Pedir turno
            </div>
          )
        }
      </div>
    </div>
  )
}
