import React, { useEffect, useState } from 'react';
import '../styles/BookApptProfessional.css'

export default function ModalProfessional({masterAppt,setAppt,setModalWindow,professionals}) {

  const [activeIndex, setActiveIndex] = useState(null);

  useEffect(() => {
    if(masterAppt.length===1){
      setActiveIndex(0);
    }
  }, [masterAppt])
  

  function setProf(index) {
    //setIdProfessional(professionals[index].id);
    setActiveIndex(index);
    setAppt(masterAppt[index]);
    setModalWindow(1);
  }

  return (
    <div className='flexRow'>
      {
        masterAppt.length>0 ?
          <div className='chooseProfessionalDiv'>
            <h1 className='chooseProfessionalTitle'>{masterAppt.length===1?'Profesional disponible':'Elije un profesional'}</h1>
            {/*<div className='date flexRow'>{jsDateToText(apptDay)}</div>*/}
            <div className='apptsContainer'>
            {
                (professionals.length>1)?
                  professionals.map((prof,index)=>
                    <div  className='clickList' key={index}>
                      <p className='listText'>{prof.name+ ' ' +prof.lastname}</p>

                      {
                        (activeIndex!==index)?
                          <button onClick={()=>setProf(index)} className='chooseProfBtn'>Elegir</button>
                        :
                          <div></div>
                      }
                    </div>
                  )
                :
                <div className='oneProf flexRow'>{professionals[0].name+ ' ' +professionals[0].lastname}</div>
              }
            </div>
          </div>
        :
          <div className='apptCero'>Sin turnos disponibles por el momento</div>
      }

    </div>
  )
}
