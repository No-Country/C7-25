import React from 'react'

export default function BookAppointment() {

  const turnos={
    init:'',
    end:'',
    length:''
  }
  for (let index = 0; index < 10; index++) {
    //const element = array[index];
  }


  return (
    <div>
      BookAppointment
      <input type="datetime-local" id="meeting-time"
       name="meeting-time" value="2018-06-12T19:30"
       min="2018-06-07T00:00" max="2018-06-14T00:00"/>
    </div>
  )
}
