import './styles/App.css'
import { BrowserRouter, Route, Routes } from "react-router-dom";

//components
import SignUp from "./components/SignUp";
import Home from './components/Home';

function App() {
  return (
    <div className='background'>
      <BrowserRouter>
        <Routes>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/home' element={<Home/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
