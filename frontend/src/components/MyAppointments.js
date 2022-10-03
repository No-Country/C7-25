import '../styles/MyAppointments.css';

function MyAppointments(){

    let myAppointmentsBooked =[
        {
            "id":13,
            "init":"2022-09-29T08:18:00",
            "end":"2022-09-29T08:36:00"
        },
        {
            "id":14,
            "init":"2022-09-29T09:48:00",
            "end":"2022-09-29T10:06:00"},
        {
            "id":15,
            "init":"2022-09-29T13:24:00",
            "end":"2022-09-29T13:42:00"
        }
    ];

    function dateISOToText(isoDate){
        const months={
          Jan:'Enero',
          Feb:'Febrero',
          Mar:'Marzo',
          Apr:'Abril',
          May:'Mayo',
          Jun:'Junio',
          Jul:'Julio',
          Aug:'Agosto',
          Sep:'Septiembre',
          Oct:'Octubre',
          Nov:'Noviembre',
          Dec:'Diciembre'
        };
        const days={
          Mon:'Lunes',
          Tue:'Martes',
          Wed:'Miercoles',
          Thu:'Jueves',
          Fri:'Viernes',
          Sat:'Sabado',
          Sun:'Domingo'
        }
        
        return (
            days[isoDate.slice(0,3)]+' 29'+' de '+months[isoDate.slice(4,7)]
        );
    }

    return(
        <div className='divContainerMyAppointments'>
            <h1 className='myAppointmentsTitle'>Turnos Reservados</h1>
            <form>
                <ul>
                    {
                        myAppointmentsBooked.map((eachAppontment, index) =>{
                            return(
                                <div key={index}>
                                    <li>
                                        <p>{eachAppontment.init}</p>
                                    </li>
                                </div>
                            )
                        })
                    
                    }
                </ul>
            </form>
        </div>
    )
}
export default MyAppointments;