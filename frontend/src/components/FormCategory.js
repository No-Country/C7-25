import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { EditCategory } from '../services/API';
import UseHomeContext from '../services/UseHomeContext';
import '../styles/Forms.css';
import Modal from './Modal';

function FormCategory(){
    
    const redirect = useNavigate();
    const location = useLocation();
    const {setHome} = UseHomeContext();
    const [modalData, setModalData] = useState({});

    const [categoryId, setCategoryId] = useState('');
    const [categoryName, setCategoryName] = useState('');
    const [categoryPhoto, setCategoryPhoto] = useState('');

    let handleFormCategory = async (e) =>{
        e.preventDefault();
        const dataCateg= {
            id: categoryId,
            category: e.target.categoryNameInput.value,
            photo: e.target.categoryImgInput.value
        }
        const resolve = await EditCategory(dataCateg);

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
            }, 2500);
        }
    };

    useEffect(()=>{
        let editORAddCategory = () =>{
            setCategoryId(location.state.id);
            setCategoryName(location.state.category);
            setCategoryPhoto(location.state.photo);
        }
        editORAddCategory();
        //eslint-disable-next-line react-hooks/exhaustive-deps
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
            <Modal props={modalData}/>
        </div>
    )
}
export default FormCategory;