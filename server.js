// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");
const app = express();
const port = 3000;
let getData = require("./getData");
//  require body-parser
const bodyParser = require("body-parser");
// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require("cors");
app.use(cors());
// Initialize the main project folder
app.use(express.static("website"));

// Setup Server
app.listen(port, () => {
  console.log(`Server is listining on port ${port} !`);
});

app.post("/postData", (req, res) => {
  console.log("body", req.body);
  newData = {
    temprature: req.body.temprature,
    date: req.body.date,
    feeling: req.body.feeling,
    city: req.body.city,
    description: req.body.description,
  };
  projectData = newData;
  res.send(projectData);
});

app.get("/getdata", (req, res) => {
  res.send(projectData);
});
