const searchButton = $("#button-addon2");
const todaysWeather = $("todayWeather");
// when i hit search
// then im request a url
//then display my url to the page
// temp, wind, humid, uv.
let myProp = "icon";
/// display the current city that was searched
function displayWeather(weathData) {
  console.log(weathData);
  console.log(weathData.weather[0][myProp]);
}

const getWeather = function (city) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=e6989dabdc4acd8059acb7786b6dfb7c`;
  return fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayWeather(data);
        });
      } else {
        data;
        alert("Error: " + response.statusText);
      }
    })
    .catch(function (error) {
      alert("Unable to gather weather data!");
    });
};

searchButton.on("click", function () {
  //user input
  const SearchInput = $("#textInput").val();

  getWeather(SearchInput);
  $;
});
