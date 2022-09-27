import React from 'react'
import '../../styles/Header.css'

export default  function Header() {
  return (
    <nav>
      <div>
        <a href='/home'>home</a>
      </div>
      <div>
        <a href='/login'>Login</a>
      </div>
      <div>
        <a href='/signup'>SignUp</a>
      </div>
      <div>
        <a href='/turno'>Pedir Turno</a>
      </div>
    </nav>
  )
}
