import { userAppt } from '../services/API';
import AppointmentsList from './AppointmentsList';

function MyAppointments(){
    return(
        <div className='masterContainer flexColumn'>
            <AppointmentsList 
                roleAppt={userAppt} 
            />
        </div>
    )
}
export default MyAppointments;