/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

let generateBtn = document.getElementById("generate");

const updateUI = async () => {
  let response = await fetch("/getData");
  let data = await response.json();
  document.getElementById(
    "temp"
  ).innerHTML = `<p><span class="title">Current Temprature:</span> ${data.temprature}°C</p>`;

  document.getElementById(
    "date"
  ).innerHTML = `<p><span class="title">date: </span> ${data.date}</p>`;

  document.getElementById(
    "content"
  ).innerHTML = `<p><span class="title">Weather Description:</span> ${data.description}°C</p>
  <p><span class="title">Your Feeling:</span> ${data.feeling}°C</p>`;
};

const getWeather = async (url) => {
  let response = await fetch(url);
  try {
    let data = await response.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
};

const postData = async (url = "", weatherData = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(weatherData),
  });
  try {
    const newData = await response.json();
    console.log(newData);
    return newData;
  } catch (err) {
    console.log(`Error: ${err}`);
  }
};

// onclick event handler
let generateClick = (e) => {
  e.preventDefault();
  const zipCode = document.getElementById("zip").value;
  const feeling = document.getElementById("feelings").value;
  const APIKEY = "c79290d2ef6acac741d627ae23ff67e9";
  const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${APIKEY}&units=metric`;
  //   validate user input
  getWeather(url).then((data) => {
    postData("/postData", {
      date: newDate,
      feeling: feeling,
      temprature: Math.round(data.main.temp),
      city: data.name,
      description: data.weather[0].description,
    }).then(updateUI());
  });
};

generateBtn.addEventListener("click", generateClick);
