import '../styles/Forms.css';
import { DeleteApptSetting, EditApptSetting, getApptSettingsByProfessionalId } from '../services/API';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UseHomeContext from '../services/UseHomeContext';

function FormSettingsAppt(e){

    const [WorkdayInit, setWorkdayInit] = useState('');
    const [WorkdayDuration, setWorkdayDuration] = useState('');
    const [ApptDuration, setApptDuration] = useState('');
    const [DaysAhead, setDaysAhead] = useState('');
    const [daysAvailable, setDaysAvailable] = useState([]);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [apptSettingsId, setApptSettingsId] = useState();
    const [serviceId, setServiceId] = useState();

    
    const [settings, setSettings] = useState([]);
    const {home} = UseHomeContext();
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
        setWorkdayInit(minToStr(settings[index].workdayInit));
        setWorkdayDuration(minToStr(settings[index].workdayDuration));
        setApptDuration(minToStr(settings[index].apptDuration));
        setDaysAhead(settings[index].daysAhead);
        setServiceId(settings[index].serviceId);
        const prime=[2,3,5,7,11,13,17];
        let daysAvailable = prime.map(num=>settings[index].daysAvailable%num===0);
        setDaysAvailable(daysAvailable);
        setMostrarForm(true)
    }
    function add(){
        setApptSettingsId(null);
        setWorkdayInit('00:00');
        setWorkdayDuration('00:00');
        setApptDuration('00:00');
        setDaysAhead(0);
        setServiceId(null);
        setMostrarForm(true);
    }

    async function del(id){

        let resolve = await DeleteApptSetting(id);

        if( resolve.status === 201){
            alert('Los datos han sido modificados')
            existingapptSettings()
        }
    }
    
    let handleEditForm = async (e) =>{
        
        e.preventDefault();

        const sId = apptSettingsId || e.target.inputService.value;

        const data={
            id: apptSettingsId,
            workdayInit: strToMin(e.target.inputWorkdayInit.value), 
            workdayDuration: strToMin(e.target.inputWorkdayDuration.value), 
            apptDuration: strToMin(e.target.inputApptDuration.value), 
            daysAvailable: primeCod(e.target),
            daysAhead: e.target.inputDaysAhead.value,
            serviceId: sId
        }
        
        const response= await EditApptSetting(data);

        if(response.status===201){ //Si la operacion se realizo con exito
            setMostrarForm(false);
            alert('Los datos han sido editados');
        }
    }
 
    return(
        <div className='masterContainer'>

            {
                (!mostrarForm)?
                    <div>
                        <button className='btnNewSetting' style={{width:'15rem'}} onClick={()=>add()}>
                            Crear configuración nueva
                        </button>
                        <div className='flexRow'>
                            {
                                settings.map((sett,index)=>
                                    <div className='tarjetaAppt' key={index}>
                                        <div className='divItemsToEdit'>
                                            <p>Servicio: {sett.serviceId}</p>
                                            <p>Duración del truno: {sett.apptDuration}</p>
                                            <p>Dias de la semana con turnos: {sett.daysAvailable}</p>
                                            <p>Horas de atención: {sett.workdayDuration}</p>
                                            <p>Hora de inicio de la jornada: {sett.workdayInit}</p>
                                            <p>Dias corridos con turnos disponibles: {sett.daysAhead}</p>                                            
                                        </div>
                                        <div className='flexRow'>
                                            <div className='btnFrente' onClick={()=>edit(index)}>Editar</div>
                                            <div className='btnFrente' onClick={()=>del(sett.id)}>Eliminar</div>                                            
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>                
                :
                    <div className='divContainerForms'>
                        <h1 className='FormsTitle'>Editar</h1>
                        <form className='formForms' onSubmit={handleEditForm}>

                            {
                                (apptSettingsId)?
                                    <><div>El set tiene id:</div><br/></>
                                :
                                    <>
                                        <label htmlFor="inputService">Seleccione un servicio:</label><br/>
                                        <select name="inputService">
                                            {home.categories.map((category)=>
                                                <optgroup label={category.category}>
                                                    {category.services.map((service)=>
                                                        <option value={service.id}>{service.name}</option>
                                                    )}
                                                </optgroup>                                                
                                            )}
                                        </select><br/>
                                    </>
                            }
                            <label>Hora de inicio de la jornada laboral:</label><br/>
                            <input type='time' name='inputWorkdayInit' value={WorkdayInit} onChange={e => setWorkdayInit(e.target.value)}/><br/>

                            <label>Horas de atención durante el día:</label><br/>
                            <input type='time' name='inputWorkdayDuration' value={WorkdayDuration} onChange={e => setWorkdayDuration(e.target.value)}/><br/>

                            <label>Duración del turno:</label><br/>
                            <input type='time' name='inputApptDuration' value={ApptDuration} onChange={e => setApptDuration(e.target.value)}/><br/>

                            <label>Días de la semana que desea atender</label><br/>
                            <div className='divCheckbox'>
                                <label><input type='checkbox' name='inputDaysAvailable0' defaultChecked={daysAvailable[0]}/>Domingo</label><br/>
                                <label><input type='checkbox' name='inputDaysAvailable1' defaultChecked={daysAvailable[1]}/>Lunes</label><br/>
                                <label><input type='checkbox' name='inputDaysAvailable2' defaultChecked={daysAvailable[2]}/>Martes</label><br/>
                                <label><input type='checkbox' name='inputDaysAvailable3' defaultChecked={daysAvailable[3]}/>Miércoles</label><br/>
                                <label><input type='checkbox' name='inputDaysAvailable4' defaultChecked={daysAvailable[4]}/>Jueves</label><br/>
                                <label><input type='checkbox' name='inputDaysAvailable5' defaultChecked={daysAvailable[5]}/>Viernes</label><br/>
                                <label><input type='checkbox' name='inputDaysAvailable6' defaultChecked={daysAvailable[6]}/>Sábado</label><br/>
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