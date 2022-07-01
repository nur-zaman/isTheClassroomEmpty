const semester = "summer2022";
const getDataFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};

data = getDataFromLocalStorage(semester);

const date = moment().format("YYYY-MM-DD");

const day = moment().format("dddd");
const now = moment().toString();

// const now = 'Tue Jun 30 2022 05:05:34 pm'
// const day = 'Tuesday'

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
    if (
      !(
        i.day == day &&
        moment(now).isBetween(`${date} ${i.start}`, `${date} ${i.end}`)
      )
    ) {
      classRoomList.push(i.room);
    }
  });

  classRoomList.sort().reverse();
  classRoomList = [...new Set(classRoomList)]
  for (const i of classRoomList) {
    addData(i);
  }

  document.querySelector("#update").innerHTML = moment();
};

showFullList();
