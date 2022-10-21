import '../styles/Forms.css';
import {EditServices} from '../services/API';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import UseHomeContext from '../services/UseHomeContext';
import Modal from './Modal';

function FormServices(){

    const redirect = useNavigate();
    const location = useLocation();
    const {setHome} = UseHomeContext();
    const[modalData, setModalData] = useState({});
    
    const [serviceId, setServiceId] = useState('');
    const [serviceName, setServiceName] = useState('');
    const [servicePhoto, setServicePhoto] = useState('');
    const [serviceDescription, setServiceDescription] = useState('');
    const [serviceDuration, setServiceDuration] = useState('');
    const [servicePrice, setServicePrice] = useState('');


    let handleFormServices = async (e) =>{
        e.preventDefault();
        const dataServices={
            id: serviceId,
            name: e.target.serviceNameInput.value,
            photo: e.target.servicePhotoInput.value,
            description: e.target.serviceDescriptionInput.value,
            duration: e.target.serviceDurationInput.value,
            price: e.target.servicePriceInput.value,
        }
        const resolve = await EditServices(location.state.idCategory,dataServices);

        if( resolve.status === 201){
            setHome(resolve.data);
            let data = { 
                msj:'Los cambios se guardaron correctamente.',
                showBtn:false,
                modal:true
            }
            setModalData(data);
            setTimeout(() => {
                redirect('/');
            }, 2000);
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
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);

    

    
    return(
        <div className='divContainerForms'>
            <h1 className='FormsTitle'>
                {
                    (serviceId)?
                        'Editar'
                    :
                        'Agregar'
                }
            </h1>
            
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
                    <button type='submit'>
                        {
                            (serviceId)?
                                'Editar'
                            :
                                'Agregar'
                        }
                    </button>
                </div>
            </form>
            <Modal props={modalData}/>
        </div>
    )
}
export default FormServices;