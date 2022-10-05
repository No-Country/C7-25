import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../styles/ServiceDetails.css';

function ServiceDetails (){

    const [serviceDetail, setServiceDetail] = useState ('');

    let getUrl= new URLSearchParams (window.location.search);
    let paramCategoryValue = getUrl.get('idCategory');
    let paramServiceValue= getUrl.get('idServicio');

    console.log(paramCategoryValue);
    console.log(paramServiceValue);
    
    useEffect( () =>{
        const urlAPI= 'http://190.244.201.188:8080/home/categories';
        axios.get(urlAPI)

        .then(resolve =>{
            console.log(resolve.data);
            console.log(resolve.data[paramCategoryValue].services[paramServiceValue]);
            setServiceDetail(resolve.data[paramCategoryValue].services[paramServiceValue])

        })
    },[paramCategoryValue, paramServiceValue]);
    
//agregar: foto, precio, duracion 
    return(
        <div>
            <h1 className='serviceDetailsTitle'>{serviceDetail.name}</h1>
            <img src={''} alt='Service img'/>
            <p>{serviceDetail.description}</p>
            <p>Duración:</p>
            <p>Precio:</p>
            <div className='divReservarBtn'>
                <button className='btnReservar'><Link to='/reservarturno'>Reservar</Link></button>
            </div>
            
        </div>
    )
}
export default ServiceDetails;