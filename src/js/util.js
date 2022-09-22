
// const semester = "summer2022V2";
const semester = getSemesterName();
console.log(semester);


const saveDataToLocalStorage = (data) => {
  localStorage.setItem(`${semester}`, JSON.stringify(data));
};

const getDataFromLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key));
};


  if (getDataFromLocalStorage(semester) == null) {
    // let url = `data\/${semester}.json`;
    let url = getDataURL();
  
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

  function tog() {
    var element = document.getElementById("cus-time");
    element.classList.toggle("hidden");
  }