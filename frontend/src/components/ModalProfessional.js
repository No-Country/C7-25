import React, { useEffect, useState } from 'react'
import { jsDateToText } from '../services/DateTime';
import UseHomeContext from '../services/UseHomeContext';

export default function ModalProfessional({masterAppt,setAppt,setModalWindow,setIdProfessional,professionals}) {

  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    if(masterAppt.length===1){
      setActiveIndex(0);
    }
  }, [masterAppt])
  

  function setProf(index) {
    //setIdProfessional(professionals[index].id);
    setAppt(masterAppt[index]);
    setModalWindow(1);
  }

  return (
    <div className='flexRow'>
      {
        masterAppt.length>0 ?
          <div className='dayCalendarContainer'>
            <div className='head flexRow'>{masterAppt.length===1?'Profesional disponible':'Elije un profesional'}</div>
            {/*<div className='date flexRow'>{jsDateToText(apptDay)}</div>*/}
            <div className='apptsContainer'>
            {
                professionals.map((prof,index)=>
                  <div  className='clickList  flexRow' key={index}>
                    <div>{prof.name+ ' ' +prof.lastname}</div>

                    {
                      (activeIndex!==index)?
                        <div onClick={()=>setProf(index)} className='profBtn'>Elegir</div>
                      :
                        <div></div>
                    }
                  </div>
                )
              }
            </div>
          </div>
        :
          <div className='apptCero'>Sin turnos disponibles por el momento</div>
      }

    </div>
  )
}
