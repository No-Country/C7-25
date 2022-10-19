import React, { useEffect, useState } from 'react';
import '../styles/Modal.css';

export default function Modal({props}) {
  const [ShowModal, setShowModal] = useState(false)
  console.log('props',props);
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
                <div className='flexRow'>
                  <button className='apptBtn' onClick={()=>props.func(props.params)}>Confirmar</button>
                  <button className='apptBtn' onClick={()=>setShowModal(false)}>Cancelar</button>
                </div>
              :<></>}

            </div>
          </div>
          :<></>
      }
    </div>
  )
}
