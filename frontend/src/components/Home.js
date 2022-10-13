import '../styles/Home.css';
import perfilDefault from '../multimedia/profile-picture.png';
import { Link } from 'react-router-dom';
import UseHomeContext from '../services/UseHomeContext';
import img from '../multimedia/manicuria_y_pedicura.jpg'; // borrar
import { MdLocationOn } from 'react-icons/md';
import { AiOutlineWhatsApp } from 'react-icons/ai';

export default function Home() {

  const {home} = UseHomeContext();
  let servicesArray=home.categories || [];
  let professionalsArray=home.professionals || [];


  return (
    <div className='divContainerHome'>

        <h1 className='homeTitle'>{home.name} Estética</h1>
        <aside className='asideData'> 
            <p id='adress'><MdLocationOn className='iconsData'/> {home.adress}</p>
            <p id='cellphoneNumber'><AiOutlineWhatsApp className='iconsData'/> {home.telephone}</p>
        </aside>
        
        <p className='description'> hbjjhbjhb jhbjh bjhbjhbj hbjhbjh bh bhb hb jhbjh bjh bj jh bjh b bibi uhi uh iuh iuhihih iuhu hiuhiuhiub hb hbi ub ibi biu b iu bi biu b iu uiui iuhuuh uhipnjknlkn bhbhl blb lkjbj j jbjkjjkb{home.description} </p>

        <h2 className='homeSubtitles'>Nuestros servicios</h2>

        <div  className='categoriesNames'>
            
            {servicesArray.map( (eachCategory, indexCategory) =>{
                return(
                    <div key={indexCategory} className='category'>
                        
                        <div>
                            <h3>{eachCategory.category}</h3>
                            <img src={img} alt='Service' className='serviceImg'/>
                        </div>
                        
                        <div className='divListServices'>
                            
                            {eachCategory.services.map( (service,indexService)=>{
                                return(
                                    <ul className='servicesList' key={indexService}>
                                      <Link to={`/detalles?idCategory=${indexCategory}&idServicio=${indexService}`}>
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
        
        <h2 className='homeSubtitles'>Nuestros profesionales</h2>
        
        <div className='flexRow'>
            
            {professionalsArray.map( (eachProfessional, indexProfessionals)=>{
                return(
                    <div key={indexProfessionals}>
                        <aside className='profilePhoto'>
                            <img src={ eachProfessional.photo? eachProfessional.photo : perfilDefault } alt=""/>   
                        </aside>
                        <p>{eachProfessional.name}</p>
                        <p>{eachProfessional.lastname}</p>
                    </div>
                )
            })}

        </div>
    </div>
  )
}
