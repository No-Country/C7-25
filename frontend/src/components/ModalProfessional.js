import React from 'react'

export default function ModalProfessional() {
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
