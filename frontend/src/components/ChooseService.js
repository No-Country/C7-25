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
                    <div key={indexCategory} className='divChooseServiceGrid'>
                        <div>
                            <img src={eachCategory.photo} alt='Service Img'/>
                        </div>

                        <div>
                            <h2 className="serviceCategory">{eachCategory.category}</h2>
                            {eachCategory.services.map((eachService, indexService)=>{
                                return(
                                    <ul key={indexService}>
                                        <li className="listOfServices">
                                            <Link to={`/reservarturno?indexCategory=${indexCategory}&indexService=${indexService}`}>{eachService.name}</Link>
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