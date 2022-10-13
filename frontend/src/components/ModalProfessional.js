import React from 'react'
import { jsDateToText } from '../services/DateTime';
import UseHomeContext from '../services/UseHomeContext';

export default function ModalProfessional({apptDay,setModalWindow,setIdProfessional}) {
  const {home} = UseHomeContext();
  let professionals=home.professionals || [];//Vacio para cuando home es indefined hasta que responda el sv

  function setProf(index) {
    setIdProfessional(professionals[index].id);
    setModalWindow(2);
  }
  return (
    <div className='flexRow'>
      <div className='dayCalendarContainer'>
        <div className='head flexRow'>Elije un profesional</div>
        {/*<div className='date flexRow'>{jsDateToText(apptDay)}</div>*/}
        <div className='apptsContainer'>
        {
            professionals.map((prof,index)=>
              <div  className='clickList  flexRow' key={index}>
                <div>{prof.name+ ' ' +prof.lastname}</div>

                <div onClick={()=>setProf(index)} className='profBtn'>Elegir</div>
                
              </div>
            )
          }
        </div>
      </div>
    </div>
  )
}
