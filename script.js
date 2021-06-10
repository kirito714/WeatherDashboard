const searchButton = $()



var getWeather = function (city) {
  var apiUrl = `https://api.openweathermap$.org/data/2.5/weather?q=+${city}&units=imperial&APPID=904755abfca69992b8a848481a87baea`;

  return fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          return displayWeather(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to gather weather data!");
    });
};



