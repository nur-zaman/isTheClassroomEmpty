
// const getDataFromLocalStorage = (key) => {
//   return JSON.parse(localStorage.getItem(key));
// };

data = getDataFromLocalStorage(getSemesterName());

const datePicker = document.querySelector("#date")
const timePicker = document.querySelector("#time")

datePicker.value = moment().format('YYYY-MM-DD');
timePicker.value = moment().format("HH:mm");

let date = moment().format("YYYY-MM-DD");

let day = moment(date).format("dddd");
let now = moment().toString();


const addData = (tableData) => {

  let newRow = document.createElement("tr");
  let newCell = document.createElement("td");
  newCell.classList.add("border", "border-slate-600");
  newCell.innerHTML = tableData;
  newRow.append(newCell);
  document.getElementById("rows").appendChild(newRow);
};

let classRoomList = [];
const showFullList = () => {
  date = moment(datePicker.valueAsNumber).format("YYYY-MM-DD")

  day = moment(date).format("dddd");
  let time = moment(`${date}T${timePicker.value}`).format("hh:mm:ss a")


  now = `${date} ${time}`


  data.forEach((i) => {
    classRoomList.push(i.room);
  }
  )

  classRoomList.sort().reverse();
  classRoomList = [...new Set(classRoomList)]

  data.forEach(i => {



    if (
      (
        i.day == day &&
        (moment(now).isBetween(`${date} ${i.start}`, `${date} ${i.end}`) ||
        (moment(`${now}`).format("h:mm a")==i.start))
      )
    ) {


      classRoomList.splice(classRoomList.indexOf(i.room), 1);

    }
  });

  document.querySelector("#rows").innerHTML = ''
  for (const i of classRoomList) {
    addData(i);
  }

  // document.querySelector("#update").innerHTML = moment();
};

showFullList();

const pickers = document.querySelector('#cus-time');

pickers.addEventListener('change', (event) => {

  classRoomList = [];
  showFullList();
});




