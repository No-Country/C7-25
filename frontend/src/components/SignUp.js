import {useNavigate } from 'react-router-dom';
import '../styles/SignUp.css';
import {signUp, SignUpIsEmailNotAvailable} from '../services/API'

function SignUp (){

    let redirect= useNavigate();

    let handleSubmit = async (e) =>{
        e.preventDefault();
        const inputName = e.target.userName.value;
        const inputLastName = e.target.userLastName.value;
        const inputId = e.target.userId.value;
        const inputEmail = e.target.userEmail.value;
        const inputPassword= e.target.userPassword.value;

        //let validEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        let validEmail = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
        

        if( !validEmail.test(inputEmail)){
            alert('La direccion de correo electrónico no es válida');
        }
        else if( await SignUpIsEmailNotAvailable(inputEmail) ){
            alert('El email no esta disponible');
        }
        else if(inputName.length >35){
            alert('El nombre no puede contener más de 35 caracteres');
        }
        else if(inputLastName.length>35){
            alert('El apellido no puede contener más de 35 caracteres');
        }
        else if(inputPassword.length >20){
            alert('El número de documento no puede contener más de 20 caracteres');  
        }
        else if(inputPassword.length < 5){
            alert('La contraseña debe contener cinco o más caracteres');
        }

        else{
            const bodyAPI={
                name:inputName, 
                lastname:inputLastName, 
                identification:inputId, 
                email:inputEmail,
                password:inputPassword
            }
            let resp = signUp(bodyAPI); //Lama a la api
            if (resp==='home') { //El redirect no funciona en la api por eso se usa esto
                redirect('/home');
            }
        };
    }


    return(
        <div className='divContainer'>
                <h1 className='signUpTitle'>Registrate</h1>
                <form onSubmit={handleSubmit} className='signUpForm'>

                    <label>Nombre</label><br/>
                    <input type='text' name='userName' required='required'/><br/>

                    <label>Apellido</label><br/>
                    <input type='text' name='userLastName' required='required'/><br/>

                    <label>Documento de Identidad</label><br/>
                    <input type='number' name='userId' required='required'/><br/>

                    <label>Correo Electrónico</label><br/>
                    <input type='email' name='userEmail' required='required'/><br/>

                    <label>Crear contraseña</label><br/>
                    <input type='password' name='userPassword' required='required'/><br/>

                    <div className='divSignUpBtn'>
                        <button type='submit' className='btnSignUp'>Registrarse</button>
                    </div>
                </form>
        </div>
    )
}
export default SignUp;