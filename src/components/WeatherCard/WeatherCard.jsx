import "./Weathercard.css";
import cloudy from "../../assets/cloudy.png";

function WeatherCard() {
  return (
    <section className="weather-card">
      <p className="weather-card__temp">75 &deg; F</p>
      <img
        src={cloudy}
        alt="weather bar for cloudy day"
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
