const version = 'V1.1.1'
const semester = "summer2022V2";

const BTN = document.getElementById("roomNumBtn");
const FORM = document.getElementById("roomNum");
const RESULT = document.getElementById("result");

const datePicker = document.querySelector("#date")
const timePicker = document.querySelector("#time")

datePicker.value = moment().format('YYYY-MM-DD');
timePicker.value = moment().format("HH:mm");

let date = moment().format("YYYY-MM-DD");
let day = moment().format("dddd");
let now = moment().toString();
let time = ''


const saveDataToLocalStorage = (data) => {
  localStorage.setItem(`${semester}`, JSON.stringify(data));
};

const getDataFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};



const getRoomInfo = (data, roomNo) => {

  let room = _.find(data, function (o) {

    return (
      o.room == roomNo &&
      o.day == day &&
      (moment(now).isBetween(`${date} ${o.start}`, `${date} ${o.end}`) ||
      (moment(`${now}`).format("h:mm a")==o.start)))
    
  });
  return room;
};

const showOutput = (roomInfo) => {

  if (roomInfo == undefined || roomInfo == null) {
    RESULT.innerHTML = "ROOM IS EMPTY";
  } else {
    RESULT.innerHTML = `Room's not empty,<br> ${roomInfo.course} Section ${roomInfo.section}'s class is being held till ${roomInfo.end} `;
  }
};

if (getDataFromLocalStorage(semester) == null) {
  let url = `data\/${semester}.json`;

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
BTN.addEventListener("click", () => {
  let number = FORM.value;
  date = moment(datePicker.valueAsNumber).format("YYYY-MM-DD")

  day = moment(date).format("dddd");
  time = moment(`${date}T${timePicker.value}`).format("hh:mm:ss a")

  

  now = `${date} ${time}`

  console.log(moment(`${now}`).format("h:mm a")=='9:30 am');

  if (number.length > 4 && /^\d*$/.test(number)) {
    let roomNo = "UB" + number;
    let data = getDataFromLocalStorage(semester);
    let roomInfo = getRoomInfo(data, roomNo);
    showOutput(roomInfo);
  } else {
    RESULT.innerHTML = "Incorrect Room Number";
  }
});





// if ("serviceWorker" in navigator) {
//   window.addEventListener("load", function() {
//     navigator.serviceWorker
//       .register("serviceWorkerV1.1.js")
//       .then(res => console.log("service worker registered"))
//       .catch(err => console.log("service worker not registered", err))
//   })
// }