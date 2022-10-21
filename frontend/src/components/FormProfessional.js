import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProfessional, getUserByEmail } from '../services/API';
import UseHomeContext from '../services/UseHomeContext';
import '../styles/Forms.css';
import Modal from './Modal';

export default function FormProfessional() {

  const redirect = useNavigate();
  const {home,setHome} = UseHomeContext();
  const [msj, setMsj] = useState('');
  const [profesional, setProfesional] = useState();
  const [modalData, setModalData] = useState({});

  let handleFormProfessional = async (e) =>{
    e.preventDefault();

    setProfesional(undefined);
    if(e.target.emailInput.value){

      const resp = await getUserByEmail(e.target.emailInput.value);

      if(resp.status===200){
        if(!resp.data){
          setMsj('No se encontro un usuario con este email.')
        }else if(resp.data){
          if(resp.data.id){
            if(home.professionals.some(prof=>prof.id===resp.data.id)){
              setMsj('El usuario ya esta incluido en la lista de profesionales.')
            }else{
              setMsj(null);
              setProfesional(resp.data);
            }
          }else{
            setMsj('Ocurrio un error.')
          }
        }
      }
    }else{
      setMsj('Ingrese un email valido.');
    }
  }

  async function add (id){
    const resp = await addProfessional(id);

    if( resp.status === 201){
      setHome(resp.data);
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
  }
  return (
    <div className='divContainerForms'>

      <h1 className='FormsTitle'>Agregar profesional</h1>

      <form  onSubmit={handleFormProfessional} className='formForms'>
          <label>Email del profesional:</label><br/>
          <input type='text' name='emailInput'/>
          <label>{msj}</label><br/><br/>
          <div className='divEditBtn'>
              <button type='submit'>Buscar</button>
          </div>
      </form>
      {
        (profesional)?
          <div className='confirmProfessional flexRow'>
            <div>{profesional.name+' '+profesional.lastname}</div>
            <button onClick={()=>add(profesional.id)}>Agregar</button>
          </div>   
        :
          <></>
      }
      <Modal props={modalData}/>
    </div>
  )
}
