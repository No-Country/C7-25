import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {BookAppointmentSaveAppt} from '../services/API';
import {jsDateToHsMin, jsDateToText} from '../services/DateTime';
import Modal from './Modal';
import { AiOutlineClose } from 'react-icons/ai';


export default function ModalAppt({appt, apptDay, idService, setModalWindow}) {
  const [apptDisp, setApptDisp] = useState([]);//Lista de turnos a mostrar
  const [modalData, setModalData] = useState({});
  let navigate = useNavigate();
  
  useEffect(()=>{
    let arr=appt.appointments;
    let resp = arr.find(day=>day.timestamp===apptDay);
    setApptDisp(resp.appts);
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[apptDay])

  //Guarda el turno en la db
  async function saveAppt(apptm) {
    const idProfessional =appt.professional.id
    console.log('idProfessional',)

    let resp = await BookAppointmentSaveAppt(apptm,idService,idProfessional);
    if(resp.status===201){ //Si la operacion se realizo con exito
      let data = { 
        msj:'Turno confirmado',
        showBtn:false,
        modal:true
      }
      setModalData(data);
      setTimeout(() => {
        navigate('/misturnos');
      }, 2000);
    }
  }

  function modalJson(turn) {
    let data = { 
      func:saveAppt,
      msj:'Desea confirmar este turno?',
      showBtn:true,
      params:turn,
      modal:true
    }
    setModalData(data);
  }

  console.log('apptDispapptDisp',apptDisp,apptDay);

  return (
    <div>
      <div className='modal flexColumn'>
        <Modal props={modalData}/>
        <div className='closeMA' onClick={()=>setModalWindow(1)}>
          <AiOutlineClose/>
        </div>
        <div className='dayCalendarContainer'>
          <div className='head flexRow'>Elije un horario</div>
          <div className='date flexRow'>{jsDateToText(apptDay)}</div>
          <div className='scrollContainer'>
          {
              apptDisp.map((turn,index)=>
                <div  className='clickList  flexRow' key={index}>
                  <div>{jsDateToHsMin(turn.ini)+ ' a ' +jsDateToHsMin(turn.end)}</div>
                  {
                    turn.disp?
                      <div className='apptBtn' onClick={()=>modalJson(turn)}>Reservar</div>
                      :
                      <div className='ghostBtn'></div>
                  }
                </div>
              )
            }
          </div>
        </div>
      </div>
      
    </div>
  )
}
