import '../styles/Forms.css';
import {EditHome} from '../services/API';
import { useLocation } from 'react-router-dom';

function FormHome(){

    const location = useLocation();
    console.log(location)

    let handleEditHome = (e)=>{
        e.preventDefault();

        const dataHome = {
            name: e.target.brandNameinput.value,
            adress: e.target.adressInput.value,
            telephone: e.target.telephoneInput.value,
            description: e.target.descriptionInput.value
        }

        const resolve= EditHome(dataHome);

        if( resolve.status === 201){
            alert('Los datos han sido modificados')
        }
    }
    
    return(
        <div className='divContainerForms'>
            <h1 className='FormsTitle'>Editar</h1>
            <form onSubmit={handleEditHome} className='formForms'>
                <label>Nombre empresa:</label><br/>
                <input type='text' name='brandNameInput'/>

                <label>Direción:</label><br/>
                <input type='text' name='adressInput'/><br/>

                <label>Número de contacto:</label><br/>
                <input type='tel' name='telephoneInput'/><br/>
                
                <label>Descripción de la empresa:</label><br/>
                <input type='text' name='descriptionInput'/><br/>

                <div className='divEditBtn'>
                    <button type='submit'>Editar</button>
                </div>
            </form>

        </div>
    )
}
export default FormHome;