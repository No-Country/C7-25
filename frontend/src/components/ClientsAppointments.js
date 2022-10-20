import { profAppt } from '../services/API';
import AppointmentsList from './AppointmentsList';

function ClientsAppointments(){
    return(
        <AppointmentsList 
            roleAppt={profAppt} 
        />
    )
}
export default ClientsAppointments;