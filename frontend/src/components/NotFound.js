import { useNavigate } from 'react-router-dom';
import '../styles/NotFound.css';

function NotFound(){
    
    let navigate = useNavigate();

    let goToHome = ()=>{
        navigate('/');
    };

    return(
        <div className='divContainerNotFound'>
            <h1 className='notFoundTitle'>Error 404</h1>
            <p id='pNotFound'>La página que estás buscando no existe</p>
            <button onClick={goToHome} id='goToHomeBtn'>Ir a la página principal</button>
        </div>
    );
}
export default NotFound;