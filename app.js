const searchBtn = document.querySelector(".search-icon-wrapper");
const locationField = document.querySelector("input");
const city = document.querySelector(".city");
const country = document.querySelector(".country");

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
    city.textContent = response.name;
    country.textContent = response.country;
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
});
