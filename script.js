const searchButton = $("#button-addon2");
const todaysWeather = $("todayWeather");
const fCasthistory = $("#fCastsaves");

// when i hit search
// then im request a url
//then display my url to the page
// temp, wind, humid, uv.

/// display the current city that was searched
function displayWeather(weathData) {
  let iconId = weathData.weather[0].icon;
  let iconUrl = `https://openweathermap.org/img/wn/${iconId}@2x.png`;
  let iconEl = $("<img>").attr("alt", "weatherIcon").attr("src", iconUrl);
  $("#weatherIcon").append(iconEl);
  $("#cityName").text(weathData.name);
  $("#tempDisplay").text(weathData.main.feels_like);
  $("#windDisplay").text(weathData.wind.speed);

  $("#humidDisplay").text(weathData.main.humidity);
}
function displayForecast(weathData) {
  let iconUrl1 = weathData.list[0].weather[0].icon;
  let iconEl1 = $("<img>").attr("alt", "weatherIcon").attr("src", iconUrl1);
  let iconUrl2 = weathData.list[1].weather[0].icon;
  let iconEl2 = $("<img>").attr("alt", "weatherIcon1").attr("src", iconUrl2);
  let iconUrl3 = weathData.list[2].weather[0].icon;
  let iconEl3 = $("<img>").attr("alt", "weatherIcon1").attr("src", iconUrl3);
  let iconUrl4 = weathData.list[3].weather[0].icon;
  let iconEl4 = $("<img>").attr("alt", "weatherIcon1").attr("src", iconUrl4);
  let iconUrl5 = weathData.list[4].weather[0].icon;
  let iconEl5 = $("<img>").attr("alt", "weatherIcon1").attr("src", iconUrl5);
 
  $("#cityName").text(weathData.name);
  console.log(weathData.list);

  $("#weatherIcon1").append(iconEl1);
  $("#weatherIcon2").append(iconEl2);
  $("#weatherIcon3").append(iconEl3);
  $("#weatherIcon4").append(iconEl4);
  $("#weatherIcon5").append(iconEl5);
  $("#tempDisplay1").text(weathData.list[0].main.feels_like);
  $("#windDisplay1").text(weathData.list[0].wind.speed);
  $("#humidDisplay1").text(weathData.list[0].main.humidity);
  $("#tempDisplay2").text(weathData.list[1].main.feels_like);
  $("#windDisplay2").text(weathData.list[1].wind.speed);
  $("#humidDisplay2").text(weathData.list[1].main.humidity);
  $("#tempDisplay3").text(weathData.list[2].main.feels_like);
  $("#windDisplay3").text(weathData.list[2].wind.speed);
  $("#humidDisplay3").text(weathData.list[2].main.humidity);
  $("#tempDisplay4").text(weathData.list[3].main.feels_like);
  $("#windDisplay4").text(weathData.list[3].wind.speed);
  $("#humidDisplay4").text(weathData.list[3].main.humidity);
  $("#tempDisplay5").text(weathData.list[4].main.feels_like);
  $("#windDisplay5").text(weathData.list[4].wind.speed);
  $("#humidDisplay5").text(weathData.list[4].main.humidity);
}
const getWeather = function (city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e6989dabdc4acd8059acb7786b6dfb7c&units=imperial`;
  return fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          let { lat, lon } = data.coord;

          getUv(lat, lon);
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
const getForecast = function (city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=e6989dabdc4acd8059acb7786b6dfb7c&units=imperial`;
  return fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          return displayForecast(data);
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to gather Forecast Data!");
    });
};
const getUv = function (lat, lon) {
  const uvIndex = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=e6989dabdc4acd8059acb7786b6dfb7c`;

  return fetch(uvIndex)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          $("#uvDisplay").html(`uvIndex ${data.current.uvi}`);
          if (data.current.uvi > 8) {
            $("#uvDisplay").addClass(`badge badge-danger`);
          } else if (data.current.uvi > 5) {
            $("#uvDisplay").addClass(`badge badge-warning`);
          } else {
            $("#uvDisplay").addClass(`badge badge-success`);
          }
        });
      } else {
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to gather UV data!");
    });
};

searchButton.on("click", function () {
  //user input
  let SearchInput = $("#textInput").val();
  // new forecast is being displayed  on parent ul as a li.
  // let new_fCast = .parent().text();
  // // if null then save a empty array
  // if (localStorage.getItem("forecast history") === null) {
  //   localStorage.setItem("forecast history", "[]");
  // }
  // let old_fCast = JSON.parse(localStorage.getItem("forecast history"));
  // old_fCast.push(new_fCast);
  // localStorage.setItem("forecast history", JSON.stringify(old_fCast));

  getWeather(SearchInput);
  getForecast(SearchInput);
});


