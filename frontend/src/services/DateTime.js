const months=[
  'Enero',
  'Febrero',
  'Marzo',
  'Abril',
  'Mayo',
  'Junio',
  'Julio',
  'Agosto',
  'Septiembre',
  'Octubre',
  'Noviembre',
  'Diciembre'
];
const days=[
  'Domingo',
  'Lunes',
  'Martes',
  'Miercoles',
  'Jueves',
  'Viernes',
  'Sabado'
]

// 1665061511547 -> 08:20
export function jsDateToHsMin(timeInMS){
  const jsDate= new Date(timeInMS);
  return ('0'+jsDate.getHours()).slice(-2)+':'+('0'+jsDate.getMinutes()).slice(-2);
}

// 1665061511547 -> jueves 6 de Octubre
export function jsDateToText(timeInMS){

  const jsDate= new Date(timeInMS);
  const day=days[jsDate.getDay()];
  const dayNumber=parseInt(jsDate.getDate());
  const month=months[jsDate.getMonth()];

  return `${day} ${dayNumber} de ${month}`;
}

// 2022-10-21T08:00:00 -> Viernes 21/10
export function jsISODateToTextAndDate(ISOtime){
  const jsDate= new Date(`${ISOtime}Z`);
  const day=days[jsDate.getDay()];
  const dayNumber=parseInt(jsDate.getDate());
  const month=jsDate.getMonth();
  return `${day} ${dayNumber}/${month}`;
}

// 1665061511547 -> Octubre de 2022
export function jsDateToYearMonth(timeInMS){

  const jsDate= new Date(timeInMS);
  const year=jsDate.getFullYear();
  const month=months[jsDate.getMonth()];

  return `${month} de ${year}`;
}

// 480 -> 08:00
export function minToHsMin(minutes){

  const hr=('0'+Math.floor(minutes/60)).slice(-2);
  const min=('0'+Math.floor(minutes%60)).slice(-2);

  return `${hr}:${min}`;
}

//273 -> [0,1,0,1,0,1,0]
export function decodeDaysAvailable(daysAvailable){
  const prime=[2,3,5,7,11,13,17];
  return prime.map(num=>daysAvailable%num===0);
}

//[0,1,0,1,0,1,0] -> 273
export function encodeDaysAvailable(daysAvailable){
  const prime=[2,3,5,7,11,13,17];
  return daysAvailable.reduce((acc,cur,index)=>(cur)?acc*prime[index]:acc,1);
}

export function encodeDAToString(number){
  const daysAvailableBoole = decodeDaysAvailable(number);
  const daysAvailableString = daysAvailableBoole.map((day,index)=>(day)?days[index]:'');
  const daysAvailableStringFiltered = daysAvailableString.filter(day=>day!=='');
  return daysAvailableStringFiltered.join(', ');
}