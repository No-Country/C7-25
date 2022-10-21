import { Link } from 'react-router-dom';
import { profAppt } from '../services/API';
import AppointmentsList from './AppointmentsList';

function ClientsAppointments(){
    return(
        <div className='masterContainer flexColumn'>
            <div className='btnFrente' style={{marginTop:'2rem'}}><Link to='/formsettingsappt'>Editar la configuración de turnos</Link></div>
            <AppointmentsList 
                roleAppt={profAppt} 
            />
        </div>
    )
}
export default ClientsAppointments;