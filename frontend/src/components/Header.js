import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  
  return (
    <header>
        <nav>
            <ul>
                <li>
                    <Link to='/home'>Home</Link>
                </li>
                <li>
                    <Link to='/reservarturno'>Reservar turno</Link>
                </li>
                <li>
                    <Link to='/misturnos'>Mis turnos</Link>
                </li>
                <li>
                    <Link to='/logout'>Cerrar Sesión</Link>
                </li>
            </ul>
        </nav>
    </header>
  )
  
}
export default Header;