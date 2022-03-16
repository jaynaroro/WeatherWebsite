const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=ab4f7ba1726df2fec85cf0e16fe73d7d&query=" +
    latitude +
    "," +
    longitude;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect", undefined);
    } else if (body.error) {
      callback("Bad request", undefined);
    } else {
      callback(
        undefined,
        "The current temperature is at " +
          body.current.temperature +
          ". But it feels like " +
          body.current.feelslike
      );
    }
  });
};

module.exports = forecast;
