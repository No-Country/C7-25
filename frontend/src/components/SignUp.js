import axios from 'axios';
import { useEffect } from 'react';
import {useNavigate } from 'react-router-dom';
import '../styles/SignUp.css'

function SignUp (){

    let redirect= useNavigate();

    let handleSubmit = (e) =>{
        e.preventDefault();
        const inputName = e.target.userName.value;
        const inputLastName = e.target.userLastName.value;
        const inputId = e.target.userId.value;
        const inputEmail = e.target.userEmail.value;
        const inputPassword= e.target.userPassword.value;

        let validEmail = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

        if( !validEmail.test(inputEmail)){
            alert('La direccion de correo electrónico no es válida');
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
            let urlAPI= '';
            
            axios
            .post(urlAPI, {inputName, inputLastName, inputId, inputEmail,inputPassword})
            
            .then( resolve =>{
                console.log(resolve.data);
                console.log(resolve);
                return resolve.data;
            })

            .then( resolve =>{

                if(resolve.length > 0){
                    alert('Ya existe una cuneta con este correo electrónico')
                }
                else{
                    redirect('/home');
                    alert('Registrado exitosamente');
                };     
            })
            .catch( error => console.log('Error: '+ error));
        };
    }


    return(
        <div className='divContainer'>

            <h1>Registrate</h1>

            <form onSubmit={handleSubmit} className='signUpForm'>

                <label className='labelsInputs'>Nombre</label><br/>
                <input type='text' name='userName' required="required" className='inputs'/><br/>

                <label className='labelsInputs'>Apellido</label><br/>
                <input type='text' name='userLastName' required="required" className='inputs'/><br/>

                <label className='labelsInputs'>Documento de Identidad</label><br/>
                <input type='number' name='userId' required="required" className='inputs'/><br/>

                <label className='labelsInputs'>Correo Electrónico</label><br/>
                <input type='email' name='userEmail' required="required" className='inputs'/><br/>

                <label className='labelsInputs'>Crear contraseña</label><br/>
                <input type='password' name='userPassword' required="required" className='inputs'/><br/>

                <button type='submit' className='btnSignUp'>Registrarse</button>

            </form>

        </div>
    )
}
export default SignUp;