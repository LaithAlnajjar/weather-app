const searchBtn = document.querySelector(".search-icon-wrapper");
const locationField = document.querySelector("input");
const city = document.querySelector(".city");
const country = document.querySelector(".country");
const con = document.querySelector(".con-text");
const temp = document.querySelector(".temp-text");
const percip = document.querySelector(".percip-text");
const humid = document.querySelector(".humidity-text");
const speed = document.querySelector(".speed-text");

//Function which hits the API and returns a json
const getWeatherData = function (location) {
  return fetch(
    `https://api.weatherapi.com/v1/current.json?key=e4015370947f46cb8ad171657241402&q=${location}`,
    {
      mode: "cors",
    }
  ).then(function (response) {
    return response.json();
  });
};

//Function which returns an object containg wanted weather data
const processWeatherJson = function (location) {
  return getWeatherData(location).then(function (response) {
    console.log(response);
    return {
      name: response.location.name,
      country: response.location.country,
      condition: response.current.condition.text,
      temp: response.current.temp_c,
      precipiation: response.current.precip_mm,
      windSpeed: response.current.wind_kph,
      humidity: response.current.humidity,
    };
  });
};

//Function which displays recieved weather data in the console
const displayWeather = function (location) {
  processWeatherJson(location).then(function (response) {
    console.log(response.name);
    console.log(response.country);
    console.log(response.condition);
    console.log(response.temp);
    console.log(response.precipiation);
    console.log(response.windSpeed);
    console.log(response.humidity);
  });
};

//Function which displays location on the interface
const displayLoc = function (location) {
  processWeatherJson(location).then(function (response) {
    city.textContent = response.name + ",";
    country.textContent = response.country;
  });
};

//Function which displays condition on the interface
const displayCon = function (location) {
  processWeatherJson(location).then(function (response) {
    con.textContent = response.condition;
  });
};

//Function which displays temprature on the interface
const displayTemp = function (location) {
  processWeatherJson(location).then(function (response) {
    temp.textContent = response.temp;
  });
};

//Function which displays what remains of the forecast on the interface
const displayStats = function (location) {
  processWeatherJson(location).then(function (response) {
    percip.textContent = response.precipiation;
    humid.textContent = response.humidity;
    speed.textContent = response.windSpeed;
  });
};

const getInput = function () {
  input = prompt("Enter the location");
  displayWeather(input);
};

searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let location = locationField.value;
  displayWeather(location);
  displayLoc(location);
  displayCon(location);
  displayTemp(location);
  displayStats(location);
});
