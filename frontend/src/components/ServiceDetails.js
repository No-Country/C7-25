import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../styles/ServiceDetails.css';

import img from '../multimedia/manicuria_y_pedicura.jpg'
import UseHomeContext from "../services/UseHomeContext";

function ServiceDetails (){

    const [serviceDetail, setServiceDetail] = useState ('');
    const {home} = UseHomeContext();
    let categoriesArray=home.categories || [];

    let getUrl= new URLSearchParams (window.location.search);
    let paramCategoryValue = getUrl.get('idCategory');
    let paramServiceValue= getUrl.get('idServicio');

    console.log(paramCategoryValue);
    console.log(paramServiceValue);
    
    useEffect( () =>{

        setServiceDetail(categoriesArray[paramCategoryValue].services[paramServiceValue])

    },[paramCategoryValue, paramServiceValue]);
    
//agregar: foto, precio, duracion 
    return(
        <div>
            <h1 className='serviceDetailsTitle'>{serviceDetail.name}</h1>
            
            <aside className='asideImgDetail'>
                <img src={img} alt='Service img'/>
            </aside>
            
            <p className='detailDescription'>{serviceDetail.description}</p>
            <p className='serviceCharacts'>Duración: {serviceDetail.duration} minutos</p>
            <p className='serviceCharacts'>Precio: $ {serviceDetail.price} pesos</p>

            <div className='divReservarBtn'>
                <button><Link to={`/reservarturno?indexCategory=${paramCategoryValue}&indexService=${paramServiceValue}`}>Reservar</Link></button>
            </div>
            
        </div>
    )
}
export default ServiceDetails;