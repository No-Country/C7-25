import React from 'react';
import '../styles/Home.css';
import perfilDefault from '../multimedia/profile-picture.png';

export default function Home() {

  const jsonHome={
    servicesArray:[
      {
        category:'Manicura y Pedicura',
        photo:'',
        listServices:[
          'Semipermanente',
          'Kapping',
          'Uñas acrilicas',
          'Esculpido'
        ]
      },
      {
        category:'Tratamientos Faciales',
        photo:'',
        listServices:[
          'Hiperpigmentación',
          'Dermoabración',
          'Peeling',
          'Luz pulsada',
          'Exfoliación'
        ]
      },
      {
        category:'Tratamientos Corporales',
        photo:'',
        listServices:[
          'Tratamientos reafirmantes',,
          'Termoterapia',
          'Presoterapia',
          'Zionic',
          'Exfoliación'
        ]
      },
      {
        category:'Depilación Definitiva',
        photo: '',
        listServices:[
          'Axilas',
          'Bozo',
          'Dedos',
          'Espalda',
          'Pecho',
          'Semi Cavado',
          'Cavado Completo',
          'Media Pierna',
          'Piernas completas',
          'Dos zonas',
          'Tres Zonas',
          'Cuatro zonas'
        ]
      },
      {
        category:'Cejas y Pestañas',
        photo: '',
        listServices:[
          'Perfilado',
          'Lifting',
          'Microblanding',
          'Microshading'
        ]
      }
    ],

    professionalsArray:[
      {
        name:'Noelia',
        lastname:'Barrionuevo',
        photo:'https://scontent.fsla4-1.fna.fbcdn.net/v/t1.18169-9/10401972_472787482918821_4958068379902033714_n.jpg?_nc_cat=100&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=apCnGm0dF4QAX-RePPq&_nc_ht=scontent.fsla4-1.fna&oh=00_AT_TlF4FmZT2JtkWv41ftgvbRJ2B6GlXXkb3-abnz-Dt2Q&oe=63570F7A'
      },{
        name:'Sofía',
        lastname:'Malestrini',
        photo:''
      },{
        name:'Marcela',
        lastname:'Oliva',
        photo:''
      },{
        name:'Julieta',
        lastname:'Vega',
        photo:''
      }
    ]
  }

  return (
    <div className='divContainerHome'>
        
        <h1 className='homeTitle'>Nuestros servicios</h1>

        <div  className='categories'>
            
            {jsonHome.servicesArray.map( (eachService,index) =>{
                
                return(

                    <div key={index} className='category'>
                    
                        <h3> {eachService.category} </h3>

                        <div>  
                            <img 
                            src={require(`../multimedia/cejas_y_pestanias.jpg`)} 
                            alt='Service Image'
                            className='serviceImg'
                            />  
                            <div className='divListServices'>
                                {eachService.listServices.map( (service,index2)=>{
                                    return(
                                        <ul className='servicesList' key={index2}>
                                            <li className='eachServiceList'>{service}</li>
                                        </ul>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>

        <div>
            <div className='flexRow'>
                <h2>Nuestros profesionales</h2>
            </div>
            
            <div className='flexRow'>
                {jsonHome.professionalsArray.map( (eachProfessional,index) =>
                    <div className='profCard flexColumn' key={index}>
                        <div className='profilePhoto'>
                            <img src={ eachProfessional.photo? eachProfessional.photo : perfilDefault } alt=""/> 
                        </div>
                        <p>{eachProfessional.lastname+' '+eachProfessional.name}</p>
                    </div>
                )}
            </div>
        </div>
    </div>
  )
}
