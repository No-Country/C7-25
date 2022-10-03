import axios from 'axios';

const domain = 'http://localhost:8080';

export async function BookAppointmentSaveAppt(apptm,index,workday) {
  console.log('Holaaaaaaaaaaaaaaaaa');
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
      const UserusedUrlAPI=`${domain}/appt/save`;
      const resp = 
      await axios.post(UserusedUrlAPI,turn,config);
      /*let aux = [...apptDisp];
      aux[index].disp=false;
      setApptDisp(aux);*/
      return resp.data;
  } catch (error) {
      console.log('Error: '+ error);
  }
}