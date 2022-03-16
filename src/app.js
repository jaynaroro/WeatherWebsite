const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

//define paths
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup engine and views folder
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//static files to be served
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Home",
    name: "Jay Naroro",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Jay Naroro",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Jay Naroro",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You Must Provide an address",
    });
  }

  const address = req.query.address;

  geocode(address, (error, { latitude, longitude } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error });
      }
      res.send({
        forecast: forecastData,
        location: address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404Page", {
    title: "404",
    name: "Jay Naroro",
    error: "Sorry Help Page Not Found!",
  });
});

app.get("*", (req, res) => {
  res.render("404Page", {
    title: "404",
    name: "Jay Naroro",
    error: "Sorry Page Not Found!",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port);
});
