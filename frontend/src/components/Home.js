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

    let servicesArray=home.categories || [];
    let professionalsArray=home.professionals || [];


    function form(type,indexCategory,indexService){
        let rute;
        let data;
        if (type==='home') {
            rute='/formhome';
            const {professionals,categories,...homeDTO}=home;
            data=homeDTO;
        }
        
        if (type==='category') {
            rute='/formcategory';
            if(indexCategory!==undefined){
                data={
                    id:servicesArray[indexCategory].id,
                    category:servicesArray[indexCategory].category,
                    photo:servicesArray[indexCategory].photo
                }
            }else{
                data={
                    id:null,
                    category:null,
                    photo:null
                }
            }
        }
            if (type==='service') {
                rute='/formservices';
                if(indexService!==undefined){
                    data=home.categories[indexCategory].services[indexService];
                }
                else{
                    data={
                        id:null,
                        name:null,
                        description:null,
                        photo:null,
                        price:null,
                        duration:null
                    }
                }
            }
            navigate(rute,{state:data})
        
    }

  return (
    <div className='divContainerHome'>

        <h1 className='homeTitle'>{home.name} <VscEdit onClick={()=>form('home')} /></h1>                            
        

        <aside className='asideData'> 
            <p id='adress'><MdLocationOn className='iconsData'/> {home.adress}</p>
            <p id='cellphoneNumber'><AiOutlineWhatsApp className='iconsData'/> {home.telephone}</p>
        </aside>
        
        <p className='description'> hbjjhbjhb jhbjh bjhbjhbj hbjhbjh bh bhb hb jhbjh bjh bj jh bjh b bibi uhi uh iuh iuhihih iuhu hiuhiuhiub hb hbi ub ibi biu b iu bi biu b iu uiui iuhuuh uhipnjknlkn bhbhl blb lkjbj j jbjkjjkb{home.description} </p>

        <hr/><h2 className='homeSubtitles'>Nuestros servicios</h2><hr/>

        <div  className='categoriesNames'>
            
            {servicesArray.map( (eachCategory, indexCategory) =>{
                return(
                    <div key={indexCategory} className='category'>
                        
                        <div>
                            <div className='flexRow'>
                                <h3>{eachCategory.category}</h3>
                                <VscEdit onClick={()=>form('category',indexCategory)} />
                                <GrAdd onClick={()=>form('category')} />
                            </div>

                            <img src={eachCategory.photo} alt='Service' className='serviceImg'/>
                        </div>
                        
                        <div className='divListServices'>
                            
                            {eachCategory.services.map( (service,indexService)=>{
                                return(
                                    <ul className='servicesList flexRow' key={indexService}>
                                        <Link to={`/detalles?idCategory=${indexCategory}&idServicio=${indexService}`}>
                                            <li className='eachServiceList'>
                                                • {service.name}
                                            </li>
                                        </Link>
                                        <VscEdit onClick={()=>form('service',indexCategory,indexService)} />
                                        <GrAdd onClick={()=>form('ns',indexCategory)} />
                                    </ul>
                                )
                            })}

                        </div>

                    </div>
                )
            })}
        </div>
        
        <hr/><h2 className='homeSubtitles'>Nuestros profesionales</h2><hr/>
        
        <div className='flexRow'>
            
            {professionalsArray.map( (eachProfessional, indexProfessionals)=>{
                return(
                    <div key={indexProfessionals} className='divProfessionals'>
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
