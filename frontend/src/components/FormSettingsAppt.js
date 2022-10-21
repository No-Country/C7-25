import '../styles/Forms.css';
import { DeleteApptSetting, EditApptSetting, getApptSettingsByProfessionalId } from '../services/API';
import { useEffect, useState } from 'react';
import UseHomeContext from '../services/UseHomeContext';
import { decodeDaysAvailable, encodeDAToString, encodeDaysAvailable, minToHsMin } from '../services/DateTime';
import Modal from './Modal';

function FormSettingsAppt(e){

    const [WorkdayInit, setWorkdayInit] = useState('');
    const [WorkdayDuration, setWorkdayDuration] = useState('');
    const [ApptDuration, setApptDuration] = useState('');
    const [DaysAhead, setDaysAhead] = useState('');
    const [daysAvailable, setDaysAvailable] = useState([]);
    const [mostrarForm, setMostrarForm] = useState(false);
    const [apptSettingsId, setApptSettingsId] = useState();
    const [serviceId, setServiceId] = useState();

    const [modalData, setModalData] = useState({});
    const [settings, setSettings] = useState([]);
    const {home} = UseHomeContext();

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

    
    function edit(index){
        setApptSettingsId(settings[index].id);
        setWorkdayInit(minToStr(settings[index].workdayInit));
        setWorkdayDuration(minToStr(settings[index].workdayDuration));
        setApptDuration(minToStr(settings[index].apptDuration));
        setDaysAhead(settings[index].daysAhead);
        setServiceId(settings[index].serviceId);
        let daysAvailable = decodeDaysAvailable(settings[index].daysAvailable);
        setDaysAvailable(daysAvailable);
        setMostrarForm(true);
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
            let data = { 
                msj:'Los cambios se guardaron correctamente.',
                showBtn:false,
                modal:true
            }
            setModalData(data);
            setTimeout(() => {
                let data = { 
                    modal:false
                }
                setModalData(data);
            }, 2000);
            existingapptSettings();
        }
    }
    
    let handleEditForm = async (e) =>{
        
        e.preventDefault();
        let sId;
        if(serviceId===null){
            sId = e.target.inputService.value;
        }else{
            sId = serviceId;
        }

        const data={
            id: apptSettingsId,
            workdayInit: strToMin(e.target.inputWorkdayInit.value), 
            workdayDuration: strToMin(e.target.inputWorkdayDuration.value), 
            apptDuration: strToMin(e.target.inputApptDuration.value), 
            daysAvailable: encodeDaysAvailable(checkboxArray(e.target)),
            daysAhead: e.target.inputDaysAhead.value,
            serviceId: sId
        }
        
        const response= await EditApptSetting(data);

        if(response.status===201){ //Si la operacion se realizo con exito
            setMostrarForm(false);
            let data = { 
                msj:'Los cambios se guardaron correctamente.',
                showBtn:false,
                modal:true
            }
            setModalData(data);
            setTimeout(() => {
                let data = { 
                    modal:false
                }
                setModalData(data);
            }, 2000);
            existingapptSettings();
        }
    }

    function serviceName(id){
        let name;
        home.categories.forEach(category => {
            category.services.forEach(service =>{
                if(service.id===id){
                    name=service.name;
                }
            })
        });
        return name;
    }
 
    function modalJson(idApptSettings) {
        const msj = 'Desea eliminar esta configuracion de turnos?';
        let data = { 
          func:del,
          msj,
          showBtn:true,
          params:idApptSettings,
          modal:true
        }
        setModalData(data);
    }  
    return(
        <div>

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
                                            <h3 style={{textAlign:'center'}}>{serviceName(sett.serviceId)}</h3>
                                            <p>Hora de inicio de la jornada: {minToHsMin(sett.workdayInit)}</p>
                                            <p>Horas de atención: {minToHsMin(sett.workdayDuration)}</p>
                                            <p>Duración del turno: {minToHsMin(sett.apptDuration)}</p>
                                            <p>Dias de la semana con turnos: {encodeDAToString(sett.daysAvailable)}</p>
                                            <p>Dias corridos con turnos disponibles: {sett.daysAhead}</p>                                            
                                        </div>
                                        <div className='flexRow'>
                                            <div className='btnFrente' onClick={()=>edit(index)}>Editar</div>
                                            <div className='btnFrente' onClick={()=>modalJson(sett.id)}>Eliminar</div>                                            
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>                
                :
                    <div className='divContainerForms'>
                        <h1 className='FormsTitle'>
                            {
                                (apptSettingsId)?
                                    'Editar'
                                :
                                    'Agregar'
                            }
                        </h1>
                        <form className='formForms' onSubmit={handleEditForm}>

                            {
                                (apptSettingsId)?
                                    <><div>El set tiene id:</div><br/></>
                                :
                                    <div className='content-select'>
                                        <label>Seleccione un servicio:</label><br/>
                                        <select name="inputService">
                                            {home.categories.map((category)=>
                                                <optgroup label={category.category}>
                                                    {category.services.map((service)=>
                                                        <option value={service.id}>{service.name}</option>
                                                    )}
                                                </optgroup>                                                
                                            )}
                                        </select>
                                        <i></i>
                                    </div>
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
                                <button type='submit'>
                                    {
                                        (apptSettingsId)?
                                            'Editar'
                                        :
                                            'Agregar'
                                    }
                                </button>
                                <button onClick={()=>setMostrarForm(false)}>Cancelar</button>
                            </div>
                        </form>
                    </div>
            }
            <Modal props={modalData}/>
        </div>

    )
}
export default FormSettingsAppt;