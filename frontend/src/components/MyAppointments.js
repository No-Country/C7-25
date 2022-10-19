import { useEffect, useState } from 'react';
import { MyAppointmentsCancelAppt, userAppt } from '../services/API';
import '../styles/MyAppointments.css';
import UseHomeContext from '../services/UseHomeContext';
import { jsISODateToTextAndDate } from '../services/DateTime';


function MyAppointments(){
    const {home} = UseHomeContext();
    const [myAppointmentsBooked, setMyAppointmentsBooked] = useState([])

    useEffect(() => {
        if(home.categories){
            getAppt();
        }
    //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [home])
    
    async function getAppt() {
        let apptsRaw = await userAppt();
        let appt = apptsRaw.map(ap=>{
            const id = ap.id;
            const date = jsISODateToTextAndDate(ap.ini);
            const time = ap.ini.slice(11,16);//ARREGLAR
            const state = ap.state;
            //El servicio esta anidado en Home por lo que busco primero la categoria
            const category = home.categories.find(cat=>
                cat.services.find(serv=>serv.id===ap.serviceId)
            );
            //Luego el servicio
            const servi = category.services.find(serv=>serv.id===ap.serviceId);
            const service = servi.name;
            //Busco el profesional en Home
            const prof = home.professionals.find(prof=>prof.id===ap.professionalId);
            const professional = prof.lastname+' '+prof.name;
            return {id,date,time,state,service,professional};
        });
        setMyAppointmentsBooked(appt);
    }

    function cancelAppt(id){
        MyAppointmentsCancelAppt(id);
        console.log('cancelando',id);
    }

    return(
        <div className='masterContainer flexColumn'>
            <h1 className='myAppointmentsTitle'>{
                (myAppointmentsBooked.length>0)?
                    'Turnos Reservados'
                :
                    'No posee turnos reservados'
            }</h1>
            {
                myAppointmentsBooked.map((appt, index) =>
                    <div className='grid' key={index}>
                        <section className='h1'>
                            Dia
                        </section>
                        <p className='d1'>
                            {appt.date}
                        </p>
                        <section className='h2'>
                            Hora
                        </section>
                        <p className='d2'>
                            {appt.time}
                        </p>
                        <section className='h3'>
                            Servicio
                        </section>
                        <p className='d3'>
                            {appt.service}
                        </p>
                        <section className='h4'>
                            Profesional
                        </section>
                        <p className='d4'>
                            {appt.professional}
                        </p>

                        <div  className='b flexRow'></div>
                        <div className='c flexRow'>
                            {
                                appt.state?
                                    appt.state===1?
                                        'Cancelado por el usuario'
                                    :
                                        'Cancelado por el professional'
                                :
                                    <div className='cBtn' onClick={()=>cancelAppt(appt.id)}>Cancelar</div>
                            }
                        </div>
                    </div>
                )
            }

        </div>
    )
}
export default MyAppointments;