import { userAppt } from '../services/API';
import AppointmentsList from './AppointmentsList';

function MyAppointments(){
    return(
        <AppointmentsList 
            roleAppt={userAppt} 
        />
    )
}
export default MyAppointments;