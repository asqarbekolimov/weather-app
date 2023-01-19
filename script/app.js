const data = document.querySelector(".today");
const degree = document.querySelector(".degree");
const locationCity = document.querySelector("#location");
const countryBage = document.querySelector(".country"),
  perc = document.querySelector("#perc"),
  uvIndex = document.querySelector(".uv-index"),
  windSpeed = document.querySelector(".wind-speed"),
  sunrise = document.querySelector(".sunrise"),
  humidity = document.querySelector(".humidity"),
  visiblity = document.querySelector(".visiblity"),
  airQuality = document.querySelector(".air-quality"),
  uvText = document.querySelector(".uv-text");

let currentCity = "";
let currentUnit = "c";
let hourlyorWeek = "Week";

function getDateTime() {
  let now = new Date(),
    hour = now.getHours(),
    minute = now.getMinutes();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  hour = hour % 12;
  if (hour < 10) {
    hour = "0" + hour;
  }
  if (minute < 10) {
    minute = "0" + minute;
  }

  // const ampm = hour >= ? 'PM' : 'AM'
  if (hour <= 12) {
    hour = `${hour}:${minute} pm`;
  } else {
    hour = `${hour}:${minute} am`;
  }
  let dayString = days[now.getDay()];
  return `${dayString}, ${hour}`;
}

data.innerText = getDateTime();

setInterval(() => {
  data.innerText = getDateTime();
}, 1000);

function getPublicIp() {
  fetch("http://ip-api.com/json", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      currentCity = data.currentCity;
      getWeatherData(data.city, currentUnit, hourlyorWeek);
    });
}
getPublicIp();
getWeatherData();
function getWeatherData(city, unit, hourlyorWeek) {
  console.log(city);
  const API_KEY = "BF2DTBBM6U7URDMSERKACTAR5";
  fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?unitGroup=metric&key=${API_KEY}&contentType=json`,
    {
      method: "GET",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      let city = data.resolvedAddress;
      locationCity.innerText = city;

      let today = data.currentConditions;
      degree.innerText = today.temp;
      perc.innerText = "Perc - " + today.precip + "%";
      uvIndex.innerText = today.uvindex;
      windSpeed.innerText = today.windspeed;
      sunrise.innerText = today.sunrise;
      humidity.innerText = today.humidity + "%";
      visiblity.innerText = today.visibility;
      airQuality.innerText = today.winddir;
      measureUvIndex(today.uvIndex);
    });
}
function measureUvIndex() {
  if (uvIndex <= 2) {
    uvText.innerText = "Low";
  } else if (uvIndex <= 7) {
    uvText.innerText = "Moderate";
  } else if (uvIndex <= 10) {
    uvText.innerText = "High";
  } else {
    uvText.innerText = "Extreme";
  }
}
