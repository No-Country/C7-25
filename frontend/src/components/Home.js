import '../styles/Home.css';
import perfilDefault from '../multimedia/profile-picture.png';
import { Link } from 'react-router-dom';
import UseHomeContext from '../services/UseHomeContext';

export default function Home() {

  const {home} = UseHomeContext();
  let servicesArray=home.categories || [];

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
            
            {servicesArray.map( ( eachCategory, key) =>{

                return(
                    
                    
                    <div key={key} className='category'>
                        
                        <div>
                            <h3>{eachCategory.category}</h3>
                            <img src={``} alt='Service' className='serviceImg'/>
                        </div>
                        
                        <div className='divListServices'>
                            
                            {eachCategory.services.map( (service,index2)=>{
                                return(
                                    <ul className='servicesList' key={index2}>
                                      <Link to={`/detalles?idCategory=${key}&idServicio=${index2}`}>
                                        <li className='eachServiceList'> • {service.name}</li>
                                      </Link>
                                    </ul>
                                )
                            })}

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
