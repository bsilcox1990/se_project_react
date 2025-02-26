import "./Main.css";
import WeatherCard from "../WeatherCard/WeatherCard";

function Main() {
  return (
    <main className="main__content">
      <WeatherCard />
      <section className="cards">
        <p className="cards__info">
          Today is 75&deg; F / You may want to wear:
        </p>
      </section>
    </main>
  );
}

export default Main;
