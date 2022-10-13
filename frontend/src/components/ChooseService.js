import { Link } from "react-router-dom";
import UseHomeContext from "../services/UseHomeContext";
import '../styles/ChooseService.css'

function ChooseService (){

    const {home} = UseHomeContext();
    let servicesArray=home.categories || [];//Vacio para cuando home es indefined hasta que responda el sv

    return(
        <div className="divContainerChooseService">
            <h1 className="chooseServiceTitle">Elije un Servicio</h1>
            {servicesArray.map((eachCategory, indexCategory)=>{
                return(
                    <div>
                        <h2 className="serviceCategory">{eachCategory.category}</h2>
                        
                            <div key={indexCategory} className='divChooseServiceGrid'>
                                <div className='divChooseService1'>
                                    <img src={eachCategory.photo} alt='Service Img' className='imgChooseService'/>
                                </div>

                                <div className='divChooseService2'>
                                    
                                    {eachCategory.services.map((eachService, indexService)=>{
                                        return(
                                            <ul key={indexService} className='ulListOfServices'>
                                                <li>
                                                    <Link to={`/reservarturno?indexCategory=${indexCategory}&indexService=${indexService}`}> • {eachService.name}</Link>
                                                </li>
                                            </ul>
                                        )
                                    })}
                                </div>
                            </div>
                    </div>
                )
            })}
            
        </div>
    )
}
export default ChooseService;