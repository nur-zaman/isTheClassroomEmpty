const semester = "summer2022";
const getDataFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

data = getDataFromLocalStorage(semester);

const date = moment().format("YYYY-MM-DD");

const day = moment().format("dddd");
const now = moment().toString();

// const now = 'Sun Jul 3 2022 12:35:34 pm'
// const day = 'Sunday'


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
        moment(now).isBetween(`${date} ${i.start}`, `${date} ${i.end}`)
      )
    ) {
      classRoomList.pop(i.room);
    }
  });
  for (const i of classRoomList) {
    addData(i);
  }

  document.querySelector("#update").innerHTML = moment();
};

showFullList();
