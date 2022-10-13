import './styles/App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";

//components
import SignUp from "./components/SignUp";
import Header from './components/Header';
import Home from './components/Home';
import LogIn from './components/LogIn';
import ChooseService from './components/ChooseService';
import ServiceDetails from './components/ServiceDetails';
import BookAppointment from './components/BookAppointment';
import MyAppointments from './components/MyAppointments';
import LogOut from './components/LogOut';
import NotFound from './components/NotFound';
import Footer from './components/Footer';

//Services
import {getHome} from './services/API';
import HomeContext from './services/HomeContext';

document.body.classList.add('pinkPalette');
console.log('App se esta renderizando');


function App() {
  const [home, setHome] = useState({});
  const [roles, setRoles] = useState([]);

  useEffect(()=>{
    var token = localStorage.getItem('token');
    console.log('token',token);
    if(token){
      var decoded = jwt_decode(token);
      setRoles(decoded.roles);
    }

    async function getHomeJson() {
      let homeJson = await getHome();
      setHome(homeJson);
    }
    getHomeJson();
    //eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  return (
    <div className='background'>
      <HomeContext.Provider value={{ home, setHome, roles, setRoles }}>
        <BrowserRouter>
          <Header/>
          <Routes>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/login' element={<LogIn/>}/>
            <Route path='/' element={<Home/>}/>
            <Route path='/elegirservicio' element={<ChooseService/>}/>
            <Route path='/detalles' element={<ServiceDetails/>}/>
            <Route path='/reservarturno' element={<BookAppointment/>}/>
            <Route path='/misturnos' element={<MyAppointments/>}/>
            <Route path='/logout' element={<LogOut/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
          <Footer/>
        </BrowserRouter>
      </HomeContext.Provider>
    </div>
  );
}

export default App;
