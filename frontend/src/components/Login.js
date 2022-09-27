import axios from 'axios';
import React from 'react';

export default function Login() {


  let handleSignUp = (e) =>{
    e.preventDefault();

    const urlAPI= 'http://localhost:8080/auth/login';

    const bodyAPI = new URLSearchParams();
    bodyAPI.append('email', 'email@email.com');
    bodyAPI.append('password', 12345);
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
    <div onClick={handleSignUp}>Login</div>
  )
}