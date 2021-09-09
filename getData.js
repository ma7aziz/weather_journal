// API SETTINGS //

const getData = async (zip_code) => {
  const APIKEY = "c79290d2ef6acac741d627ae23ff67e9";
  let response = await fetch(
    `api.openweathermap.org/data/2.5/weather?zip=${zip_code}&appid=${APIKEY}`
  );
  try {
    let data = await response.json();
    console.log("Data loaded");
    return data;
  } catch (e) {
    console.log("err", e);
  }
};
