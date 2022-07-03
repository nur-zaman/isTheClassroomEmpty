const semester = "summer2022V2";

const BTN = document.getElementById("roomNumBtn");
const FORM = document.getElementById("roomNum");
const RESULT = document.getElementById("result");

let date = moment().format("YYYY-MM-DD");
let day = moment().format("dddd");
let now = moment().toString();

// const day = 'Tuesday'
// const now = 'Tue Jun 30 2022 05:05:34 pm'

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
      moment(now).isBetween(`${date} ${o.start}`, `${date} ${o.end}`)
    );
  });
  return room;
};

const showOutput = (roomInfo) => {
  if (roomInfo == undefined || roomInfo == null) {
    RESULT.innerHTML = "ROOM IS EMPTY";
  } else {
    RESULT.innerHTML = `Room is not empty ,<br> ${roomInfo.course} Section ${roomInfo.section}'s class is being held till ${roomInfo.end} `;
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
date = moment().format("YYYY-MM-DD");
day = moment().format("dddd");
now = moment().toString();

  if (number.length > 4 && /^\d*$/.test(number)) {
    let roomNo = "UB" + number;
    let data = getDataFromLocalStorage(semester);
    let roomInfo = getRoomInfo(data, roomNo);
    showOutput(roomInfo);
  } else {
    RESULT.innerHTML = "Incorrect Room Number";
  }
});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker
      .register("serviceWorker.js")
      .then(res => console.log("service worker registered"))
      .catch(err => console.log("service worker not registered", err))
  })
}