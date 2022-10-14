import { useNavigate } from 'react-router-dom';
import '../styles/LogIn.css';
import {logIn} from '../services/API';
import jwt_decode from "jwt-decode";
import UseHomeContext from '../services/UseHomeContext';


function LogIn() {  
  const {setRoles} = UseHomeContext();
  let navigate = useNavigate();

  let handleLogin = async (e) =>{
    e.preventDefault();

    const inputEmail= e.target.userEmail.value;
    const inputPassword = e.target.userPassword.value;

    const bodyAPI = new URLSearchParams();
    bodyAPI.append('email', inputEmail);
    bodyAPI.append('password', inputPassword);

    const resp = await logIn(bodyAPI); //Ejecuto la API
    if(resp){
      var decoded = jwt_decode(resp.token);
      setRoles(decoded.roles);
      navigate('/');
    }
  }

  let goToSignUp = ()=>{
    navigate('/signup');
  }

  return (
    <div className='divContainerLogIn'>
        <h1 className='LogInTitle'>Inicia Sesión</h1>
        <form onSubmit={handleLogin} className='logInForm'>
            <label className='labelsInputsLogIn'>Correo Electrónico</label><br/>
            <input type='email' name='userEmail' required='required' className='inputsLogIn'/><br/>

            <label className='labelsInputsLogIn'>Contraseña</label><br/>
            <input type='password' name='userPassword' required='required' className='inputsLogIn'/><br/>

            <div className='divBtnLogIn'>
              <button  type='submit' className='btnLogIn'>Iniciar Sesión</button>
              <button onClick={goToSignUp} className='btnGoToSignUp'>Registrarse</button>
            </div>

        </form>
    </div>
  )
}

export default LogIn;
