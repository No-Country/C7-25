import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import '../styles/ChooseService.css'

function ChooseService (){

    const [servicesArray, setServicesArray] = useState ([])

    useEffect( () =>{
        let urlAPI= 'http://190.244.201.188:8080/home/categories';

        axios.get(urlAPI)
        .then(resolve =>{
            console.log(resolve.data)
            setServicesArray(resolve.data)
        })
        .catch( error => console.log('Error: ' + error))
    },[]);

    return(
        <div className="divContainerChooseService">
            <h1 className="chooseServiceTitle">Elije un Servicio</h1>
            {servicesArray.map((eachCategory, key)=>{
                return(
                    <div key={key} className='divChooseServiceGrid'>
                        <div>
                            <img src={eachCategory.photo} alt='Service Img'/>
                        </div>

                        <div>
                            <h2 className="serviceCategory">{eachCategory.category}</h2>
                            {eachCategory.services.map((eachService, key)=>{
                                return(
                                    <ul key={key}>
                                        <li className="listOfServices">
                                            <Link to='/reservarturno'>{eachService.name}</Link>
                                        </li>
                                    </ul>
                                )
                            })}
                        </div>
                    </div>
                )
            })}
            
        </div>
    )
}
export default ChooseService;