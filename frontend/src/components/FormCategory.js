import { useLocation } from 'react-router-dom';
import '../styles/Forms.css';

function FormCategory(){

    const location = useLocation();
    console.log(location);

    let handleFormCategory = (e) =>{
        e.preventDefault();

        const dataCateg= {
            category: e.target.categoryNameInput.value,
            photo: e.target.categoryImgInput.value
        }
    }
    return(
        <div className='divContainerForms'>
        <h1 className='FormsTitle'>Editar</h1>
            <form  onSubmit={handleFormCategory} className='formForms'>
                <label>Nombre de categoria:</label><br/>
                <input type='text' name='categoryNameInput'/>

                <label>Foto de la categoria:</label><br/>
                <input type='text' name='categoryImgInput'/><br/>

                <div className='divEditBtn'>
                    <button type='submit'>Editar</button>
                </div>           
           
            </form>
        </div>
    )
}
export default FormCategory;