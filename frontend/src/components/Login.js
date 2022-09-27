import axios from 'axios';
import '../styles/LogIn.css'


function LogIn() {

  let handleLogin = (e) =>{
    e.preventDefault();

    const inputEmail= e.target.userEmail.value;
    const inputPassword = e.target.userPassword;

    const urlAPI= 'http://localhost:8080/auth/login';

    const bodyAPI = new URLSearchParams();
    bodyAPI.append('email', inputEmail);
    bodyAPI.append('password', inputPassword);

    const config = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    
    axios
    .post(urlAPI, bodyAPI, config)
    
    .then( resolve =>{
        console.log(resolve);
        console.log(resolve.data);
        return resolve.data;
    })

    .then( resolve =>{

        if(resolve.length > 0){
            alert('Problema al iniciar sesion')
        }
        else{
            //redirect('/home');
            alert('Acceso exitoso');
        };     
    })
    .catch( error => console.log('Error: '+ error));
  }

  return (
    <div>
      <form onSubmit={handleLogin}>

        <label className='labelsInputsLogIn'>Correo Electrónico</label><br/>
        <input type='email' name='userEmail'/><br/>

        <label className='labelsInputsLogIn'>Contraseña</label><br/>
        <input type='password' name='userPassword'/><br/>

        <button type='submit'>Iniciar Sesión</button>

      </form>
    </div>
  )
}

export default LogIn;