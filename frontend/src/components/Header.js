import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import { AiOutlineMenu } from 'react-icons/ai';
import { useState } from 'react';
import UseHomeContext from '../services/UseHomeContext';
import Modal from './Modal';

function Header() {
    
    const [menuOpened, setMenuOpened] = useState(false);
    const {roles,setRoles} = UseHomeContext();
    const [modalData, setModalData] = useState({});
    const redirect = useNavigate();

    let openMenu = ()=>{
        setMenuOpened(!menuOpened)
    }

    let logOut = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        setRoles([]);
        redirect('/');
        let data = { 
            modal:false
        }
        setModalData(data);
    }
  
    let HeaderLi = () => <>
        <li className='liHeader'> 
            <Link to='/'>Home</Link><hr/>
        </li>
        {
            (roles.length>0)?
                <>
                    <li className='liHeader'>
                        <Link to='/elegirservicio'>Reservar turno</Link><hr/>
                    </li>
                    <li className='liHeader'>
                        <Link to='/misturnos'>Mis turnos</Link><hr/>
                    </li>
                    {
                        (roles.includes('ROLE_MANAGER'))? 
                            <li className='liHeader'>
                                <Link to='/turnosclientes'>Turnos de clientes</Link><hr/>
                            </li>
                        :
                            <></>
                    }

                    <li onClick={modalJson} style={{cursor:'pointer'}} className='liHeader'>
                        Cerrar sesión
                    </li>
                </>
            :
                <>
                    <li className='liHeader'>
                        <Link to='/login'>Acceder</Link><hr/>
                    </li>
                    <li className='liHeader'>
                        <Link to='/signup'>Registrarse</Link>
                    </li>        
                </>
        }
    </>;

    function modalJson() {
        let data = { 
            func:logOut,
            msj:'Desea cerrar sesión?',
            showBtn:true,
            params:null,
            modal:true
        }
        setModalData(data);
    }

    return (
        <header className='header'>
            <nav className='navHeader'>
                
                <h1 className='brandName'><Link to='/'>Carola</Link></h1>

                <ul className='ulHeader'>
                    <AiOutlineMenu onClick={openMenu} className='hamburgerMenu'/>
                
                    <div className='divLiHeader'>
                        <HeaderLi onClick={openMenu} />
                    </div>
                </ul>
            </nav>
            
            <div onClick={openMenu} className={`divLiHeader2 ${menuOpened && 'menuIsOpened'}`}>
                <HeaderLi/>
            </div>
            <Modal props={modalData}/>
        </header>
    )
  
}
export default Header;