import '../styles/Home.css';
import perfilDefault from '../multimedia/profile-picture.png';
import { Link, useNavigate } from 'react-router-dom';
import UseHomeContext from '../services/UseHomeContext';
import { VscAdd, VscEdit, VscChromeClose } from 'react-icons/vsc';
//GrAdd VscEdit

import { MdLocationOn } from 'react-icons/md';
import { AiOutlineWhatsApp } from 'react-icons/ai';
import { useEffect, useState } from 'react';
import Modal from './Modal';
import { DeleteCategory, deleteProfessional, DeleteService } from '../services/API';

export default function Home() {
    const navigate = useNavigate();
    const {home,setHome,roles} = UseHomeContext();
    const [adminEdit, setAdminEdit] = useState(false);
    const [modalData, setModalData] = useState({});

    useEffect(() => {
        if(roles.includes('ROLE_ADMIN')){
            setAdminEdit(true);
        }
    }, [roles])
    

    let categoriesArray=home.categories || [];
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
                    id:categoriesArray[indexCategory].id,
                    category:categoriesArray[indexCategory].category,
                    photo:categoriesArray[indexCategory].photo
                }
            }else{
                data={
                    id:null,
                    category:'',
                    photo:''
                }
            }
        }
        if (type==='service') {
            rute='/formservices';
            if(indexService!==undefined){
                data=home.categories[indexCategory].services[indexService];
            }else{
                data={
                    id:null,
                    name:'',
                    description:'',
                    photo:'',
                    price:'',
                    duration:''
                }
            }
            data.idCategory=categoriesArray[indexCategory].id;
        }
        if (type==='professional'){
            rute='/formprofessional';
        }
        navigate(rute,{state:data})
    } 

    function toggleEdit(){
        if(roles.includes('ROLE_ADMIN')){
            setAdminEdit(!adminEdit);
        }
    }

    async function del({idCategory,idService,idProfessional}){
        let resolve;
        if(idService){
            resolve = await DeleteService(idService);
        }else if(idCategory){
            resolve = await DeleteCategory(idCategory);
        }else if(idProfessional){
            resolve = await deleteProfessional(idProfessional);
        }

        if( resolve.status === 201){
            setHome(resolve.data);
            let data = { 
                msj:'Los cambios se guardaron correctamente.',
                showBtn:false,
                modal:true
            }
            setModalData(data);
            setTimeout(() => {
                let data = { 
                    modal:false
                }
                setModalData(data);
            }, 2000);
        }
    }

    function modalJson(idCategory,idService,idProfessional) {
        const msj = (idService)? 
                'Esta accion eliminará el servicio de forma permanente. Desea eliminar el servicio?'
            :
                (idService)?
                    'Esta accion eliminará la categoria y sus servicios de forma permanente. Desea eliminar la categoria?'
                :
                    'Desea eliminar al profesional?'
        let data = { 
          func:del,
          msj,
          showBtn:true,
          params:{idCategory,idService,idProfessional},
          modal:true
        }
        setModalData(data);
    }  

  return (
    <div className='divContainerHome'>
        {
            (roles.includes('ROLE_ADMIN'))?
                <>
                    <br/>
                    <div onClick={toggleEdit} className='flexRow'>
                        <div className='btnFrente'>
                            {
                                (adminEdit)?
                                    'Desactivar edición'
                                :
                                    'Activar edición'
                            }
                        </div>
                    </div>
                </>      
            :
                <></>
        }

        <h1 className='homeTitle flexRow'>
            {home.name}
            {
                (adminEdit)?
                    <div  onClick={()=>form('home')} className='iconHome'>
                        <VscEdit/>
                    </div>
                :
                    <></>
            }
        </h1>                            
        

        <aside className='asideData'> 
            <p id='adress'><MdLocationOn className='iconsData'/> {home.adress}</p>
            <p id='cellphoneNumber'><AiOutlineWhatsApp className='iconsData'/> {home.telephone}</p>
        </aside>
        
        <p className='description'>{home.description}</p>

        <hr/>
            {
                (adminEdit)?
                    <h2 onClick={()=>form('category')} className='homeSubtitles' style={{cursor:'pointer'}}>
                        <VscAdd/>
                        Agregar categoria
                    </h2>
                :
                    <h2 className='homeSubtitles'>Nuestros servicios</h2>
            }
        <hr/>

        <div  className='categoriesNames'>
            
            {categoriesArray.map( (eachCategory, indexCategory) =>{
                return(
                    <div key={indexCategory} className='category'>
                        
                        <div>
                            <div className='flexRow'>
                                <h3>{eachCategory.category}</h3>
                                {
                                    (adminEdit)?
                                        <div className='iconsEdit'>
                                            <VscEdit onClick={()=>form('category',indexCategory)} />
                                            <VscChromeClose onClick={()=>modalJson(eachCategory.id)} />
                                        </div>
                                    :
                                        <></>
                                }
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
                                        {
                                            (adminEdit)?
                                                <div className='iconsEdit'>
                                                    <VscEdit onClick={()=>form('service',indexCategory,indexService)} />
                                                    <VscChromeClose onClick={()=>modalJson(eachCategory.id,service.id)} />
                                                </div>
                                            :
                                                <></>
                                        }

                                    </ul>
                                )
                            })}
                            {
                                (adminEdit)?
                                    <div className='iconAdd' onClick={()=>form('service',indexCategory)} >
                                        <VscAdd/>
                                        Agregar servicio
                                    </div>
                                :
                                    <></>
                            }
                        </div>

                    </div>
                )
            })}

        </div>
        
        <hr/>
            {
                (adminEdit)?
                    <h2 onClick={()=>form('professional')} className='homeSubtitles' style={{cursor:'pointer'}}>
                        <VscAdd/>
                        Agregar profesional
                    </h2>
                :
                    <h2 className='homeSubtitles'>Nuestros profesionales</h2>
            }
            
        <hr/>
        
        <div className='flexRow'>
            
            {professionalsArray.map( (eachProfessional, indexProfessionals)=>{
                return(
                    <div key={indexProfessionals} className='divProfessionals'>
                        {
                            (adminEdit)?
                                <div className='iconsEdit'>
                                    <VscChromeClose onClick={()=>modalJson(undefined,undefined,eachProfessional.id)} />
                                </div>
                            :
                                <></>
                        }
                        <aside className='profilePhoto'>
                            <img src={ eachProfessional.photo? eachProfessional.photo : perfilDefault } alt=""/>   
                        </aside>
                        <p>{eachProfessional.name}</p>
                        <p>{eachProfessional.lastname}</p>
                    </div>
                )
            })}

        </div>
        <Modal props={modalData}/>
    </div>
  )
}
