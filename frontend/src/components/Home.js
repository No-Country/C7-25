import '../styles/Home.css';
import perfilDefault from '../multimedia/profile-picture.png';
import { Link, useNavigate } from 'react-router-dom';
import UseHomeContext from '../services/UseHomeContext';
import img from '../multimedia/manicuria_y_pedicura.jpg'; // borrar
import { GrAdd } from 'react-icons/gr';
import { VscEdit } from 'react-icons/vsc';
//GrAdd VscEdit

import { MdLocationOn } from 'react-icons/md';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import { useState } from 'react';

export default function Home() {
    const navigate = useNavigate();
    const {home,roles} = UseHomeContext();
    const [homeBtn, setHomeBtn] = useState(false)

    let servicesArray=home.categories || [];
    let professionalsArray=home.professionals || [];

    function showBtn(){
        setHomeBtn(!homeBtn);
    }

    function New(){
        return (
            <div>
                <GrAdd/>
            </div>
        )
    }

    function Edit(){
        return (
            <div>
                <VscEdit/>
            </div>
        )
    }

    function showForm(tipe,categoriId,serviceId){
        /*let rute,data;
        if (tipe==='home') {
            rute=''
        }
        if (tipe==='category') {
            
        }
        if (tipe==='service') {
            rute=
        }
        navigate(rute,data)*/
    }

  return (
    <div className='divContainerHome'>
        <div className='flexColumn'>
            {
                (roles.includes('ROLE_MANAGER'))?
                    <div className='btnHome editHome' onClick={showBtn}>Editar home</div>
                :
                    <></>
            }
            {
                (homeBtn && roles.includes('ROLE_MANAGER'))?
                    <div  className='gridHome'>
                    </div>
                :
                    <></>
            }            
        </div>


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
                            <h3>{eachCategory.category}</h3><Edit/><New/>
                            <img src={eachCategory.photo} alt='Service' className='serviceImg'/>
                        </div>
                        
                        <div className='divListServices'>
                            
                            {eachCategory.services.map( (service,indexService)=>{
                                return(
                                    <ul className='servicesList' key={indexService}>
                                      <Link to={`/detalles?idCategory=${indexCategory}&idServicio=${indexService}`}>
                                        <li className='eachServiceList'> • {service.name}<Edit/><New/></li>
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
