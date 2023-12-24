/** @format */
let ApiUrl = "http://api.aladhan.com/v1/timingsByCity?country=EG&city=";
let chosenCity = document.querySelector(".chosen-city");
let select = document.querySelector("select");
let aladhanTime = document.querySelectorAll(".aladhan-time");
let dataAr = document.querySelector(".day-ar");
let dataEn = document.querySelector(".data-en");
select.addEventListener("change", () => {
  selectCity(select.selectedOptions[0].textContent);
  getDataByCity(select.value);
});
getDataByCity("cairo");
function selectCity(cityName) {
  chosenCity.textContent = `${cityName}`;
}
function getDataByCity(cityName) {
  axios.get(`${ApiUrl}+${cityName}`)
    .then(function (response) {
      let i = 0;
      dataAr.textContent = response.data.data.date.hijri.weekday.ar;
      dataEn.textContent = response.data.data.date.readable;
      let aladhanData = response.data.data.timings;
      let aladhanTimesData = Object.values(aladhanData).filter(
        (element, index, arr) => {
          if (index != 4) {
            return element;
          }
        }
      );
      aladhanTime.forEach((time) => {
        time.textContent = aladhanTimesData[i];
        i++;
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}
function addCity(newCityVal, newCityText) {
  let newOption = document.createElement("option");
  newOption.value = newCityVal;
  newOption.textContent = `${newCityText}`;
  select.appendChild(newOption);
}
addCity("aswan", "أسوان");
addCity("luxor", "الأقصر");


