import '../styles/Forms.css';
import {EditServices} from '../services/API';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function FormServices(){

    const location = useLocation();
    
    const [serviceId, setServiceId] = useState('');
    const [serviceName, setServiceName] = useState('');
    const [servicePhoto, setServicePhoto] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');
    const [serviceDuration, setServiceDuration] = useState('');
    const [servicePrice, setServicePrice] = useState('');


    let handleFormServices = (e) =>{
        e.preventDefault();
        const dataServices={
            id: serviceId,
            name: e.target.serviceNameInput.value,
            photo: e.target.servicePhotoInput.value,
            description: e.target.serviceDescriptionInput.value,
            duration: e.target.serviceDurationInput.value,
            price: e.target.servicePriceInput.value,
        }
    };
    
    useEffect(()=>{
    let editOrAddService = ()=>{
        console.log(location)
        setServiceId(location.state.id);
        setServiceName(location.state.name);
        setServicePhoto(location.state.photo);
        setServiceDescription(location.state.description);
        setServiceDuration(location.state.duration);
        setServicePrice(location.state.price);
    }
    editOrAddService();
    },[]);

    

    
    return(
        <div className='divContainerForms'>
            <h1 className='FormsTitle'>Editar</h1>
            
            <form className='formForms' onSubmit={handleFormServices}>
                <label>Nombre del Servicio:</label><br/>
                <input type='text' name='serviceNameInput' value={serviceName} onChange={ (e) => setServiceName(e.target.value)}/><br/>

                <label>Foto del servicio:</label><br/>
                <input type='text' name='servicePhotoInput' value={servicePhoto}  onChange={ (e) => setServicePhoto(e.target.value)}/><br/>

                <label>Descripción del servicio:</label><br/>
                <input type='text' name='serviceDescriptionInput' value={serviceDescription}  onChange={ (e) => setServiceDescription(e.target.value)}/><br/>

                <label>Duración del servicio:</label><br/>
                <input type='time' name='serviceDurationInput' value={serviceDuration}  onChange={ (e) => setServiceDuration(e.target.value)}/><br/>

                <label>Precio del servicio:</label><br/>
                <input type='number' name='servicePriceInput' value={servicePrice}  onChange={ (e) => setServicePrice(e.target.value)}/><br/>

                <div className='divEditBtn'>
                    <button type='submit'>Editar</button>
                </div>
            </form>
        </div>
    )
}
export default FormServices;