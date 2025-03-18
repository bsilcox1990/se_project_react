import { useContext } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext";

function Main({ weatherData, onCardClick, garments }) {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);

  return (
    <main className="main__content">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__info">
          Today is {Math.floor(weatherData.temp[currentTempUnit])} &deg;{" "}
          {currentTempUnit} / You may want to wear:
        </p>
        <ul className="cards__list">
          {garments
            /* .filter((item) => {
              return item.weather === weatherData.type;
            }) */
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={onCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
