/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + 1 + "." + d.getDate() + "." + d.getFullYear();
let generateBtn = document.getElementById("generate");

const updateUI = async () => {
  let response = await fetch("/getData");
  let data = await response.json();

  document.getElementById(
    "city"
  ).innerHTML = `<p><span class="title">City:</span> ${data.city}</p>`;
  document.getElementById(
    "temp"
  ).innerHTML = `<p><span class="title">Current Temprature:</span> ${data.temprature}°C</p>`;

  document.getElementById(
    "date"
  ).innerHTML = `<p><span class="title">date: </span> ${data.date}</p>`;

  document.getElementById(
    "content"
  ).innerHTML = `<p><span class="title">Weather Description:</span> ${data.description}.<img width="30px" height="30px" src="http://openweathermap.org/img/wn/${data.icon}@2x.png"></p>
  <p><span class="title">Your Feeling:</span> ${data.feeling}</p>`;
};

const getWeather = async (url) => {
  let response = await fetch(url);

  try {
    if (response.status == 404) {
      document.getElementById(
        "content"
      ).innerHTML = `<p>City Not Found , Please submit a valid zip code !</p>`;
    } else {
      let data = await response.json();
      return data;
    }
  } catch (err) {
    console.log(err);
  }
};

// post data to local api
const postData = async (url = "", weatherData = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(weatherData),
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (err) {
    console.log(`Error: ${err} !`);
  }
};

// onclick event handler
let generateClick = (e) => {
  const zipCode = document.getElementById("zip").value;
  const APIKEY = "c79290d2ef6acac741d627ae23ff67e9";
  const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${APIKEY}&units=metric`;
  //   validate user input
  if (document.getElementById("feelings").value.length == 0) {
    userInput = "you didn't submit your feeling ";
  } else {
    userInput = document.getElementById("feelings").value;
  }
  getWeather(url).then((data) => {
    postData("/postData", {
      date: newDate,
      feeling: userInput,
      temprature: Math.round(data.main.temp),
      city: data.name,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
    }).then(updateUI());
  });
};

generateBtn.addEventListener("click", generateClick);
