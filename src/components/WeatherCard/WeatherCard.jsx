import "./WeatherCard.css";
import { weatherOptions, defaultWeatherOptions } from "../../utils/constants";

function WeatherCard({ weatherData }) {
  const filteredOptions = weatherOptions.filter((option) => {
    return (
      option.day === weatherData.isDay &&
      option.condition === weatherData.condition
    );
  });

  const weatherOption =
    filteredOptions.length === 0
      ? defaultWeatherOptions[weatherData.isDay ? "day" : "night"]
      : filteredOptions[0];

  return (
    <section className="weather-card">
      <p className="weather-card__temp">
        {Math.floor(weatherData.temp.F)} &deg; F
      </p>
      <img
        src={weatherOption?.url}
        alt={weatherOption?.condition}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
