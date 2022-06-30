const semester = 'summer2022'

const BTN = document.getElementById("roomNumBtn");
const FORM = document.getElementById("roomNum");
const RESULT = document.getElementById("result");



const date = moment().format("YYYY-MM-DD")
const day = moment().format("dddd");  
const now = moment().toString();

// const day = 'Tuesday'
// const now = 'Tue Jun 30 2022 05:05:34 pm'


const saveDataToLocalStorage = (data)=>{
  localStorage.setItem(`${semester}`, JSON.stringify(data));
 }

 const getDataFromLocalStorage = (key)=> {
  return JSON.parse(localStorage.getItem(key));
}


const getRoomInfo = (data,roomNo)=>{

 let room =  _.find(data, function(o) { 
  return (o.room==roomNo && o.day==day && moment(now).isBetween(`${date} ${o.start}`, `${date} ${o.end}`))});
 return room
}

const showOutput = (roomInfo)=>{
  if ((roomInfo == undefined) || (roomInfo == null) ){

    RESULT.innerHTML = 'ROOM IS EMPTY'
  }
  else{

    RESULT.innerHTML = `Room is not empty ,<br> ${roomInfo.course} Section ${roomInfo.section}'s class is being held till ${roomInfo.end} `
  }
}

if(getDataFromLocalStorage(semester)==null){
  let url = `data\/${semester}.json`

fetch(url)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
   saveDataToLocalStorage(data);
   
  })
  .catch(function (err) {
    console.log(err);
  });

}
BTN.addEventListener("click", ()=>{
  let number = FORM.value
  if(number.length>4 && /^\d*$/.test(number)){
  let roomNo = 'UB'+ number
  let data = getDataFromLocalStorage(semester)
  let roomInfo = getRoomInfo(data,roomNo)
  showOutput(roomInfo)
  }
  else{
    RESULT.innerHTML = 'Incorrent Room Number'
  }


});

