import '../styles/Forms.css';
import {EditHome} from '../services/API';
import { useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';

function FormHome(){

    const location= useLocation();

    const[brandName, setBrandName] = useState('');
    const[adress, setAdress] = useState('');
    const[telephone, setTelephone] = useState('');
    const[description, setDescription] = useState('');
    
    let handleEditHome = async (e)=>{
        e.preventDefault();

        const dataHome = {
            name: e.target.brandNameinput.value,
            adress: e.target.adressInput.value,
            telephone: e.target.telephoneInput.value,
            description: e.target.descriptionInput.value
        }
        const resolve= await EditHome(dataHome);

        if( resolve.status === 201){
            alert('Los datos han sido modificados')
        }
    };

    useEffect(()=>{
        let editInfoHome=()=>{
            setBrandName(location.state.name);
            setAdress(location.state.adress);
            setTelephone(location.state.telephone);
            setDescription(location.state.description);
        }
        editInfoHome();
    },[]);

    
    return(
        <div className='divContainerForms'>
            <h1 className='FormsTitle'>Editar</h1>
            <form onSubmit={handleEditHome} className='formForms'>
                <label>Nombre empresa:</label><br/>
                <input type='text' name='brandNameInput' value={brandName} onChange={(e) => setBrandName(e.target.value)}/><br/>

                <label>Direción:</label><br/>
                <input type='text' name='adressInput' value={adress} onChange={(e) => setAdress(e.target.value)}/><br/>

                <label>Número de contacto:</label><br/>
                <input type='tel' name='telephoneInput' value={telephone} onChange={(e) => setTelephone(e.target.value)}/><br/>
                
                <label>Descripción de la empresa:</label><br/>
                <input type='text' name='descriptionInput' value={description} onChange={(e) => setDescription(e.target.value)}/><br/>

                <div className='divEditBtn'>
                    <button type='submit'>Editar</button>
                </div>
            </form>

        </div>
    )
}
export default FormHome;