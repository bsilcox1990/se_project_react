import { useContext } from "react";
import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";
import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";
import { CurrentTempUnitContext } from "../../contexts/CurrentTempUnitContext";

function Main({ weatherData, handleCardClick }) {
  const { currentTempUnit } = useContext(CurrentTempUnitContext);

  return (
    <main className="main__content">
      <WeatherCard weatherData={weatherData} />
      <section className="cards">
        <p className="cards__info">
          Today is {weatherData.temp[currentTempUnit]} &deg;{" "}
          {currentTempUnit === "F" ? "F" : "C"} / You may want to wear:
        </p>
        <ul className="cards__list">
          {defaultClothingItems
            .filter((item) => {
              return item.weather === weatherData.type;
            })
            .map((item) => {
              return (
                <ItemCard
                  key={item._id}
                  item={item}
                  onCardClick={handleCardClick}
                />
              );
            })}
        </ul>
      </section>
    </main>
  );
}

export default Main;
