const data = document.querySelector(".today");
const degree = document.querySelector(".degree");
const locationCity = document.querySelector("#location");
const countryBage = document.querySelector(".country"),
  countryStatus = document.querySelector(".country"),
  perc = document.querySelector("#perc"),
  cloud = document.querySelector("#cloud"),
  icon = document.querySelector("#icon"),
  cloud2 = document.querySelector("#cloud2"),
  icon2 = document.querySelector("#icon2"),
  pixbayBg = document.querySelector("#pixbay-bg"),
  windSpeed = document.querySelector(".windSpeed"),
  windDeg = document.querySelector(".windDeg"),
  searchBox = document.querySelector("#searchBox"),
  searchBtn = document.querySelector(".btn");

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

// Search

searchBtn.addEventListener("click", setQuery);

function setQuery(e) {
  // e.preventDefault();

  getWeather(searchBox.value);
  pixbayImg(searchBox.value);
  // console.log(searchBox.value);
}

function getPublicIp() {
  fetch("http://ip-api.com/json", {
    method: "GET",
  })
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      // console.log(data.regionName);
      getWeather(data.regionName);
      pixbayImg(data.regionName);
      locationCity.innerText = data.timezone;
    });
}
getPublicIp();

function pixbayImg(query) {
  const api = "25690209-8ec67a7ae564dd9d4d409ef0b";
  fetch(`https://pixabay.com/api/?key=${api}&q=${query}`)
    .then((response) => response.json())
    .then((data) => {
      pixbayBg.src = data.hits[0].largeImageURL;
    });
}

function getWeather(query) {
  const API_KEY = "149649e4bb2c685ed08f1d1cc5cbbcab";
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=metric&APPID=${API_KEY}`
  )
    .then((response) => response.json())
    .then((data) => {
      // console.log(data);
      degree.innerText = data.main.temp;
      cloud.innerText = data.weather[0].main;
      cloud2.innerText = data.weather[0].main;
      // console.log(data.weather[0].main);
      icon.src = `http://openweathermap.org/img/wn/${
        data.weather[0].icon + ".png"
      }`;
      icon2.src = `http://openweathermap.org/img/wn/${
        data.weather[0].icon + ".png"
      }`;
      perc.innerText = "Humidity-" + data.main.humidity + "%";
      perc2.innerText = "Humidity-" + data.main.humidity + "%";
      windSpeed.innerText = "Speed: " + data.wind.speed;
      windDeg.innerText = "Degree: " + data.wind.deg + "%";
      countryStatus.innerText =
        "Country: " + data.name + "," + data.sys.country;
    })
    .catch(function () {
      alert("Not Found Country");
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
