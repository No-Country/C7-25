import { Link } from 'react-router-dom';
import '../styles/Header.css';
import { AiOutlineMenu } from 'react-icons/ai';
import { useState } from 'react';

function Header() {
    
    const [menuOpened, setMenuOpened] = useState(false);

    let openMenu = ()=>{
        setMenuOpened(!menuOpened)
    }
  
    let HeaderLi = () => <>
        <li className='liHeader'> 
            <Link to='/'>Home</Link><hr/>
        </li>
        <li className='liHeader'>
            <Link to='/elegirservicio'>Reservar turno</Link><hr/>
        </li>
        <li className='liHeader'>
            <Link to='/misturnos'>Mis turnos</Link>
        </li>
    </>;

    console.log(menuOpened)
    return (
        <header className='header'>
            <nav className='navHeader'>
                
                <h1 className='brandName'>Carola</h1>

                <ul className='ulHeader'>
                    <AiOutlineMenu onClick={openMenu} className='hamburgerMenu'/>
                
                    <div className='divLiHeader'>
                        <HeaderLi/>
                    </div>
                </ul>
            </nav>
            
            <div className={`divLiHeader2 ${menuOpened && 'menuIsOpened'}`}>
                <HeaderLi/>
            </div>
        </header>
    )
  
}
export default Header;