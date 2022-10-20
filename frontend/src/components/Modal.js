import React, { useEffect, useState } from 'react';
import '../styles/Modal.css';

export default function Modal({props}) {
  //////////props////////////
  //.modal -> Boolean -> Muestra u oculta el modal
  //.func -> Function -> Funcion a ejecutar cuando se presiona aceptar
  //.params -> Variables -> Todas las variables que se le deben pasar a .func
  //.msj -> String -> El tenxto que se quiere mostrar en el modal
  //.showBtn -> Boolean -> Cuando se quiere mostar un mensajesin botones, 
                          //preferentemente antes de un redireccion o el cierre del modal temporizado
  const [ShowModal, setShowModal] = useState(false)
  useEffect(() => {
    if(props){
      setShowModal(props.modal)
    }
  }, [props])
  
  return (
    <div>
      {
        ShowModal?
          <div className='modal'>
            <div className='modalContainer'>
              
              <h3>{props.msj}</h3>
              
              {(props.showBtn)?
                <div className='btnContainer flexRow'>
                  <div className='btnFrente' onClick={()=>props.func(props.params)}>Confirmar</div>
                  <div className='btnFrente' onClick={()=>setShowModal(false)}>Cancelar</div>
                </div>
              :<></>}

            </div>
          </div>
          :<></>
      }
    </div>
  )
}
