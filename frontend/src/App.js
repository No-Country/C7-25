import './styles/App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";

//components
import SignUp from "./components/SignUp";
import Header from './components/Header';
import Home from './components/Home';
import LogIn from './components/LogIn';
import BookAppointment from './components/BookAppointment';
import MyAppointments from './components/MyAppointments';
import LogOut from './components/LogOut'

document.body.classList.add('darkPalette');
console.log('App se esta renderizando');

function App() {
  return (
    <div className='background'>

      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<LogIn/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/reservarturno' element={<BookAppointment/>}/>
          <Route path='/misturnos' element={<MyAppointments/>}/>
          <Route path='/logout' element={<LogOut/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
