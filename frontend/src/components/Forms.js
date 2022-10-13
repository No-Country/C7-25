import '../styles/Forms.css';

function Forms(){

    return(
        <div className='divContainerForms'>
            <form className='formForms'>
                <label>Hora de inicio de la jornada laboral:</label><br/>
                <input type='time' name='workDayInit'/><br/>

                <label>Horas de atención durante el día:</label><br/>
                <input type='time' name='workdayDuration'/><br/>

                <label>Duración del turno:</label><br/>
                <input type='time' name='apptDuration'/><br/>

                <label>Días de la semana que desea atender</label><br/>
                <div className='divCheckbox'>
                    <label><input type='checkbox' name='daysAvailable0' value='sunday'/>Domingo</label><br/>
                    <label><input type='checkbox' name='daysAvailable1' value='monday'/>Lunes</label><br/>
                    <label><input type='checkbox' name='daysAvailable2' value='tuesday'/>Martes</label><br/>
                    <label><input type='checkbox' name='daysAvailable3' value='wednesday'/>Miércoles</label><br/>
                    <label><input type='checkbox' name='daysAvailable4' value='thursday'/>Jueves</label><br/>
                    <label><input type='checkbox' name='daysAvailable5' value='friday'/>Viernes</label><br/>
                    <label><input type='checkbox' name='daysAvailable6' value='saturday'/>Sábado</label><br/>
                </div>

                <label>Por cuantos dias desea que se muestren turnos disponibles:</label><br/>
                <input type='number' name='daysAhead'/><br/>

                <div>
                    <button>Editar</button>
                </div>
            </form>
        </div>
    )
}
export default Forms;