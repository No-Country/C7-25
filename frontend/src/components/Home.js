import React, { useEffect, useState } from 'react';
import '../styles/Home.css';
import perfilDefault from '../multimedia/profile-picture.png';
import img from '../multimedia/manicuria_y_pedicura.jpg'; // borrar
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MdLocationOn } from 'react-icons/md';
import { AiOutlineWhatsApp } from 'react-icons/ai';


export default function Home() {

  const [servicesArray, setServicesArray] = useState([]);

  const [professionalsArray, setProfessionalsArray] = useState([]);

  const [data, setData] = useState('');

  useEffect(()=>{
    const urlAPI= 'http://190.244.201.188:8080/home/';
   
    axios.get(urlAPI)
    .then(resolve =>{
      console.log(resolve.data);
      setData(resolve.data);
      setServicesArray(resolve.data.categories);
      setProfessionalsArray(resolve.data.professionals);
    })
    .catch (error =>{
      console.log('Error: ' + error);
    })
  },[]);


  return (
    <div className='divContainerHome'>

        <h1 className='homeTitle'>{data.name} Estética</h1>
        <aside className='asideData'> 
            <p><MdLocationOn/>{data.adress}</p>
            <p><AiOutlineWhatsApp/>{data.telephone}</p>
        </aside>
        
        <p> {data.description} </p>

       
        
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
