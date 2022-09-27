import React from 'react'

export default function Home() {

  const jsonProf=[{
    nombre:'Nombre 1',
    apellido:'Apellido 1',
    foto:'../multimedia/profile-picture.png'
  },{
    nombre:'Nombre 2',
    apellido:'Apellido 2',
    foto:'frontend/src/multimedia/profile-picture.png'
  }];

  return (
    <div>
      <div>
        <div>Nuestros servicios</div>
        <div>Listado de Servicios</div>
      </div>

      <div>
        <div>Nuestros prfesionales</div>
        <div>
          {jsonProf.map( (prof,index) =>
            <div key={index}>
              <div className='fotoProfesional'>
                <img src="frontend/src/multimedia/profile-picture.png" alt=""/> 
              </div>
              <p>{prof.apellido+' '+prof.nombre}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
