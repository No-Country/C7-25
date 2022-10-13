import { useNavigate } from 'react-router-dom';
import '../styles/LogIn.css';
import {logIn} from '../services/API'


function LogIn() {

  let handleLogin = (e) =>{
    e.preventDefault();

    const inputEmail= e.target.userEmail.value;
    const inputPassword = e.target.userPassword.value;

    const bodyAPI = new URLSearchParams();
    bodyAPI.append('email', inputEmail);
    bodyAPI.append('password', inputPassword);

    logIn(bodyAPI); //Ejecuto la API
  }
  
  let navigate = useNavigate();

  let goToSignUp = ()=>{
    navigate('/signup');
  }

  return (
    <div className='divContainerLogIn'>
        <h1 className='LogInTitle'>Inicia Sesión</h1>
        <form onSubmit={handleLogin} className='logInForm'>
            <label>Correo Electrónico</label><br/>
            <input type='email' name='userEmail' required='required'/><br/>

            <label>Contraseña</label><br/>
            <input type='password' name='userPassword' required='required'/><br/>

            <div className='divBtnLogIn'>
              <button  type='submit' className='btnLogIn'>Iniciar Sesión</button>
              <button onClick={goToSignUp} className='btnGoToSignUp'>Registrarse</button>
            </div>

        </form>
    </div>
  )
}

export default LogIn;