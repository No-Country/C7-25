import React from 'react'
import '../styles/Home.css'
import perfilDefault from '../multimedia/profile-picture.png'

export default function Home() {

  const jsonHome={
    categories:[
      {
        category:'Tratamientos faciales',
        servicios:[
          'Hiperpigmentación',
          'Dermoabración',
          'Peeling',
          'Luz pulsada'
        ]
      },{
        category:'Depilación definitiva',
        servicios:[
          'Cuerpo completo'
        ]
      },{
        category:'Manicura y pedicura',
        servicios:[
          'Semipermanente',
          'Kapping',
          'Uñas acrilicas'
        ]
      },{
        category:'Cejas y pestañas',
        servicios:[
          'Perfilado',
          'Lifting',
          'Microblanding',
          'Microshading'
        ]
      }
    ],
    profesionales:[
      {
        name:'Nombre 1',
        lastname:'Apellido 1',
        photo:'https://scontent.fsla4-1.fna.fbcdn.net/v/t1.18169-9/10401972_472787482918821_4958068379902033714_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=apCnGm0dF4QAX-RePPq&_nc_ht=scontent.fsla4-1.fna&oh=00_AT_TlF4FmZT2JtkWv41ftgvbRJ2B6GlXXkb3-abnz-Dt2Q&oe=63570F7A'
      },{
        name:'Nombre 2',
        lastname:'Apellido 2',
        photo:''
      }
    ]
  }

  return (
    <div>
      <div>
        <div className='flexRow'><h1>Nuestros servicios</h1></div>

        <div  className='categories'>

          {jsonHome.categories.map( (prof,index) =>
            <div key={index} className='category'>
              <div>
                <h3>
                  {prof.category}
                </h3>
              </div>

              {prof.servicios.map( (serv,index2)=>
                <div className='servicio' key={index2}>
                  {serv}
                </div>
              )}
            </div>
          )}

        </div>
      </div>

      <div>
        <div className='flexRow'><h1>Nuestros profesionales</h1></div>
        
        <div className='flexRow'>

          {jsonHome.profesionales.map( (prof,index) =>
            <div className='profCard flexColumn' key={index}>
              <div className='fotoPerfil'>
                <img src={ prof.photo? prof.photo : perfilDefault } alt=""/> 
              </div>
              <p>{prof.lastname+' '+prof.name}</p>
            </div>
          )}
        
        </div>
      </div>
    </div>
  )
}
