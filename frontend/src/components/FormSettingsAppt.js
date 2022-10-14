import '../styles/Forms.css';
import {EditInfo} from '../services/API';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function FormSettingsAppt(e){
    const location = useLocation();

    console.log('location',location)


    let handleEditForm = async (e) =>{
        
        e.preventDefaul();
        
        console.log( e.target.inputWorkDayInit.value)
        console.log(e.target.inputApptDuration.value)

        const data={
            workdayInit: e.target.inputWorkDayInit.value, 
            workdayDuration: e.target.inputWorkdayDuration.value, 
            apptDuration: e.target.inputApptDuration.value, 
            daysAvailable: 15,
            daysAhead: e.target.inputDaysAhead.value
        }
        
        const response= await EditInfo(data);

        if(response.status===201){ //Si la operacion se realizo con exito
            alert('Los datos han sido editados');
        }
    }
    
 
    return(
        <div className='divContainerForms'>
            <h1 className='FormsTitle'>Editar</h1>
            <form className='formForms' onSubmit={handleEditForm}>
                <label>Hora de inicio de la jornada laboral:</label><br/>
                <input type='time' name='inputWorkDayInit'/><br/>

                <label>Horas de atención durante el día:</label><br/>
                <input type='time' name='inputWorkdayDuration'/><br/>

                <label>Duración del turno:</label><br/>
                <input type='time' name='inputApptDuration'/><br/>

                <label>Días de la semana que desea atender</label><br/>
                <div className='divCheckbox'>
                    <label><input type='checkbox' name='inputDaysAvailable0' value='sunday'/>Domingo</label><br/>
                    <label><input type='checkbox' name='inputDaysAvailable1' value='monday'/>Lunes</label><br/>
                    <label><input type='checkbox' name='inputDaysAvailable2' value='tuesday'/>Martes</label><br/>
                    <label><input type='checkbox' name='inputDaysAvailable3' value='wednesday'/>Miércoles</label><br/>
                    <label><input type='checkbox' name='inputDaysAvailable4' value='thursday'/>Jueves</label><br/>
                    <label><input type='checkbox' name='inputDaysAvailable5' value='friday'/>Viernes</label><br/>
                    <label><input type='checkbox' name='inputDaysAvailable6' value='saturday'/>Sábado</label><br/>
                </div>

                <label>Por cuantos dias desea que se muestren turnos disponibles:</label><br/>
                <input type='number' name='inputDaysAhead'/><br/>

                <div className='divEditBtn'>
                    <button type='submit'>Editar</button>
                </div>
            </form>
        </div>
    )
}
export default FormSettingsAppt;