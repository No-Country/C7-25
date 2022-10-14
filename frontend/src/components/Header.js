import { Link, useNavigate } from 'react-router-dom';
import '../styles/Header.css';
import { AiOutlineMenu } from 'react-icons/ai';
import { useState } from 'react';
import UseHomeContext from '../services/UseHomeContext';

function Header() {
    
    const [menuOpened, setMenuOpened] = useState(false);
    const {roles,setRoles} = UseHomeContext();
    const redirect = useNavigate();

    let openMenu = ()=>{
        setMenuOpened(!menuOpened)
    }

    let logOut = ()=>{
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        setRoles([]);
        redirect('/');
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
                        (roles.includes('ROLE_MANAGER') || roles.includes('ROLE_ADMIN'))? 
                            <li className='liHeader'>
                                <Link to='/misturnos'>Turnos de clientes</Link><hr/>
                            </li>
                        :
                            <></>
                    }

                    <li onClick={logOut} className='liHeader'>
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

    console.log(menuOpened)
    return (
        <header className='header'>
            <nav className='navHeader'>
                
                <h1 className='brandName'>Carola</h1>

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
        </header>
    )
  
}
export default Header;