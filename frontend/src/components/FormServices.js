import '../styles/Forms.css';
import {EditServices} from '../services/API';

function FormServices(){

    let handleFormServices = (e) =>{
        e.preventDefault();

        const dataServices={
            name: e.target.serviceNameInput.value,
            photo: e.target.servicePhotoInput.value,
            description: e.target.serviceDescriptionInput.value,
            duration: e.target.serviceDurationInput.value,
            price: e.target.servicePriceInput.value,
        }
    }
    return(
        <div className='divContainerForms'>
            <h1 className='FormsTitle'>Editar</h1>
            
            <form className='formForms' onSubmit={handleFormServices}>
                <label>Nombre del Servicio:</label><br/>
                <input type='text' name='serviceNameInput'/><br/>

                <label>Foto del servicio:</label><br/>
                <input type='text' name='servicePhotoInput'/><br/>

                <label>Descripción del servicio:</label><br/>
                <input type='text' name='serviceDescriptionInput'/><br/>

                <label>Duración del servicio:</label><br/>
                <input type='time' name='serviceDurationInput' value='sunday'/><br/>

                <label>Precio del servicio:</label><br/>
                <input type='number' name='servicePriceInput'/><br/>

                <div className='divEditBtn'>
                    <button type='submit'>Editar</button>
                </div>
            </form>
        </div>
    )
}
export default FormServices;