import './styles/App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useEffect, useState } from 'react';
import jwt_decode from "jwt-decode";

//components
import SignUp from "./components/SignUp";
import Header from './components/Header';
import Home from './components/Home';
import LogIn from './components/Login';
import ChooseService from './components/ChooseService';
import ServiceDetails from './components/ServiceDetails';
import BookAppointment from './components/BookAppointment';
import MyAppointments from './components/MyAppointments';
import NotFound from './components/NotFound';
import Footer from './components/Footer';
import FormSettingsAppt from './components/FormSettingsAppt';
import FormHome from './components/FormHome';
import FormCategory from './components/FormCategory';
import FormServices from './components/FormServices';

//Services
import {getHome} from './services/API';
import HomeContext from './services/HomeContext';
import ClientsAppointments from './components/ClientsAppointments';

document.body.classList.add('pinkPalette');
console.log('App se esta renderizando');



function App() {
  const [home, setHome] = useState({});
  const [roles, setRoles] = useState([]);

  useEffect(()=>{
    var token = localStorage.getItem('token');
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
  },[]);

  
  return (
    <div className='background'>
      <HomeContext.Provider value={{ home, setHome, roles, setRoles  }}>
        <BrowserRouter>
          <Header/>
          {/*<Forms/>*/}
          <Routes>
            <Route path='/signup' element={<SignUp/>}/>
            <Route path='/login' element={<LogIn/>}/>
            <Route path='/' element={<Home/>}/>
            <Route path='/elegirservicio' element={<ChooseService/>}/>
            <Route path='/detalles' element={<ServiceDetails/>}/>
            <Route path='/reservarturno' element={<BookAppointment/>}/>
            <Route path='/misturnos' element={<MyAppointments/>}/>
            <Route path='/turnosclientes' element={<ClientsAppointments/>}/>
            <Route path='/formcategory' element={<FormCategory/>}/>
            <Route path='/formsettingsappt' element={<FormSettingsAppt/>}/>
            <Route path='/formhome' element={<FormHome/>}/>
            <Route path='/formservices' element={<FormServices/>}/>
            <Route path='*' element={<NotFound/>}/>
          </Routes>
          <Footer/>
        </BrowserRouter>
      </HomeContext.Provider>
    </div>
  );
}

export default App;
