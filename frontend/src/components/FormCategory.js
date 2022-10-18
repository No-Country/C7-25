import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Forms.css';

function FormCategory(){
    const location = useLocation();

    const [categoryId, setCategoryId] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [categoryPhoto, setCategoryPhoto] = useState('');

    let handleFormCategory = (e) =>{
        e.preventDefault();
        const dataCateg= {
            id: categoryId,
            category: e.target.categoryNameInput.value,
            photo: e.target.categoryImgInput.value
        }
    };

    useEffect(()=>{
        let editORAddCategory = () =>{
            console.log(location);
            setCategoryId(location.state.id);
            setCategoryName(location.state.category);
            setCategoryPhoto(location.state.photo);
        }
        editORAddCategory();
    },[]);

    return(
        <div className='divContainerForms'>

        <h1 className='FormsTitle'>Editar</h1>

            <form  onSubmit={handleFormCategory} className='formForms'>
                <label>Nombre de categoria:</label><br/>
                <input type='text' name='categoryNameInput' value={categoryName} onChange={ (e) => setCategoryName(e.target.value)}/>

                <label>Foto de la categoria:</label><br/>
                <input type='text' name='categoryImgInput' value={categoryPhoto} onChange={ (e) => setCategoryPhoto(e.target.value)}/><br/>

                <div className='divEditBtn'>
                    <button type='submit'>Editar</button>
                </div>           
           
            </form>
        </div>
    )
}
export default FormCategory;