import './styles/App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";

//components
import SignUp from "./components/SignUp";
import Home from './components/Home';
import Login from './components/Login';
import Header from './components/layouts/Header';
import BookAppointment from './components/BookAppointment';

document.body.classList.add('darkPalette');
console.log('App se esta renderizando');

function App() {
  return (
    <div className='background'>
      <BrowserRouter>
        <Header/>
        <Routes>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/home' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/turno' element={<BookAppointment/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
