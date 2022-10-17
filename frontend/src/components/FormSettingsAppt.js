import '../styles/Forms.css';
import { editApptSetting, getApptSettingsByProfessionalId } from '../services/API';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function FormSettingsAppt(e){

    const [WorkdayInit, setWorkdayInit] = useState('');
    const [WorkdayDuration, setWorkdayDuration] = useState('');
    const [ApptDuration, setApptDuration] = useState('');
    const [DaysAhead, setDaysAhead] = useState('');
    const [mostrarForm, setMostrarForm] = useState(false);
    const [apptSettingsId, setApptSettingsId] = useState();

    const [settings, setSettings] = useState([]);
    const location = useLocation();

    useEffect(() => {
        existingapptSettings();
    }, [])
    
    async function existingapptSettings(){
        let apptSettings = await getApptSettingsByProfessionalId();
        setSettings(apptSettings);
    }

    function strToMin(str){
        str=str.split(':');
        return 60*str[0]+1*str[1];
    }
    function minToStr(min){
        let hours = ('0'+Math.floor(min/60)).slice(-2);
        let minutes = ('0'+(min % 60)).slice(-2);
        return `${hours}:${minutes}`;
    }

    function checkboxArray(form){
        return [
            form.inputDaysAvailable0.checked,
            form.inputDaysAvailable1.checked,
            form.inputDaysAvailable2.checked,
            form.inputDaysAvailable3.checked,
            form.inputDaysAvailable4.checked,
            form.inputDaysAvailable5.checked,
            form.inputDaysAvailable6.checked
        ];
    }

    function primeCod(days){
        
        const daysAvailable = checkboxArray(days);
        const prime=[2,3,5,7,11,13,17];
        return daysAvailable.reduce((acc,cur,index)=>(cur)?acc*prime[index]:acc,1);
    }
    




    function edit(index){
        setApptSettingsId(settings[index].id);
        setWorkdayInit(settings[index].workdayInit);
        setWorkdayDuration(settings[index].workdayDuration);
        setApptDuration(settings[index].apptDuration);
        setDaysAhead(settings[index].daysAhead);
        setMostrarForm(true)
    }
    function add(){
        setApptSettingsId(null);
        setWorkdayInit('00:00');
        setWorkdayDuration('00:00');
        setApptDuration('00:00');
        setDaysAhead(0);
        setMostrarForm(true);
    }

    
    let handleEditForm = async (e) =>{
        
        e.preventDefault();

        const data={
            id: apptSettingsId,
            workdayInit: strToMin(e.target.inputWorkdayInit.value), 
            workdayDuration: strToMin(e.target.inputWorkdayDuration.value), 
            apptDuration: strToMin(e.target.inputApptDuration.value), 
            daysAvailable: primeCod(e.target),
            daysAhead: e.target.inputDaysAhead.value
        }
        
        const response= await editApptSetting(data);

        if(response.status===201){ //Si la operacion se realizo con exito
            setMostrarForm(false);
            alert('Los datos han sido editados');
        }
    }
 
    return(
        <div>

            {
                (!mostrarForm)?
                    <div>
                        <div onClick={()=>add()}>
                            Crear turno
                        </div>
                        <div>
                            <div></div>
                            {
                                settings.map((sett,index)=>
                                    <div key={index}>
                                        <div>Servicio: {sett.serviceId}</div>
                                        <div>Duración del truno: {sett.apptDuration}</div>
                                        <div>Dias de la semana con turnos: {sett.daysAvailable}</div>
                                        <div>Horas de atención: {sett.workdayDuration}</div>
                                        <div>Hora de inicio de la jornada: {sett.workdayInit}</div>
                                        <div>Dias corridos con turnos disponibles: {sett.daysAhead}</div>
                                        <div onClick={()=>edit(index)}>Editar</div>
                                        <div>Eliminar</div>
                                    </div>
                                )
                            }
                        </div>
                    </div>                
                :
                    <div className='divContainerForms'>
                        <h1 className='FormsTitle'>Editar</h1>
                        <form className='formForms' onSubmit={handleEditForm}>
                            <label>Hora de inicio de la jornada laboral:</label><br/>
                            <input type='time' name='inputWorkdayInit' value={minToStr(WorkdayInit)} onChange={e => setWorkdayInit(e.target.value)}/><br/>

                            <label>Horas de atención durante el día:</label><br/>
                            <input type='time' name='inputWorkdayDuration' value={minToStr(WorkdayDuration)} onChange={e => setWorkdayDuration(e.target.value)}/><br/>

                            <label>Duración del turno:</label><br/>
                            <input type='time' name='inputApptDuration' value={minToStr(ApptDuration)} onChange={e => setApptDuration(e.target.value)}/><br/>

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
                            <input type='number' name='inputDaysAhead' value={DaysAhead} onChange={e => setDaysAhead(e.target.value)}/><br/>

                            <div className='divEditBtn'>
                                <button type='submit'>Editar</button>
                                <button onClick={()=>setMostrarForm(false)}>Cancelar</button>
                            </div>
                        </form>
                    </div>
            }
            
        </div>

    )
}
export default FormSettingsAppt;