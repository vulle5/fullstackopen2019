import React, { useState, useEffect } from "react";
import axios from "axios";

const CountryWeather = ({ country }) => {
  const [weather, setWeather] = useState({});
  const [weatherIcon, setWeatherIcon] = useState("");

  useEffect(() => {
    (async () => {
      const {
        data: { current }
      } = await axios.get(
        `https://api.apixu.com/v1/current.json?key=bfc5d61ed5bd43c4835133020191105&q=${
          country.capital
        }`
      );
      setWeather(current);
      setWeatherIcon(current.condition.icon);
    })();
  }, [country.capital]);

  return (
    <div>
      <h2>Weather in {country.capital}</h2>
      <p>Temperature: {weather.temp_c} Celsius</p>
      <img src={weatherIcon} alt="weather icon" />
      <p>
        Wind: {weather.wind_kph} direction {weather.wind_dir}{" "}
      </p>
    </div>
  );
};

export default CountryWeather;
