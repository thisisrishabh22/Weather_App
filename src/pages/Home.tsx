import React, { useState } from "react";
import FetchWeatherData from "../Api/FetchWeatherData";
import isWeather from "../Interface/interface";
import "./home.css";
import dummyData from "../data/data";

export const Home = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(dummyData);
  const search = async (e: any) => {
    if (e.key === "Enter") {
      const data: isWeather = await FetchWeatherData(query);
      if (data !== null) {
        setWeather(data);
      }
      console.log(data);
      setQuery("");
      console.log(weather.main);
    }
  };
  return (
    <div className="Home">
      <div className="section-header">
        <h2 className="head">Get weather details on search</h2>
        <p className="para">Search by city name !</p>
      </div>
      <div className="weather-container">
        <div className="wrapper">
          <div className="weather-card">
            <input
              type="text"
              className="search"
              placeholder="Enter a place ...."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyPress={search}
            />
            {weather.main && (
              <div className="city">
                <h2 className="city-name">
                  <span>{weather.name}</span>
                  <sup>{weather.sys.country}</sup>
                </h2>
                <div className="city-temperature">
                  {Math.round(weather.main.temp)}
                  <sup>&deg;C</sup>
                  <div className="info">
                    <img
                      className="city-icon"
                      src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                      alt={weather.weather[0].description}
                    />
                    <p>{weather.weather[0].description}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
