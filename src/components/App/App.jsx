import { useState } from "react";

import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "cold" });
  return (
    <div className="page">
      <div className="page__content">
        <Header />
        <Main weatherData={weatherData} />
        <Footer />
      </div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        name="add-garment"
      >
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            required
            minlength="2"
            maxlength="40"
            placeholder="Name"
            className="modal__input"
            id="name"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image
          <input
            type="url"
            required
            placeholder="Image URL"
            className="modal__input"
            id="imageUrl"
          />
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__radio-label">
            <input type="radio" className="modal__radio-input" id="hot" />
            <span className="modal__custom-radio"></span>
            <span className="modal__radio-text">Hot</span>
          </label>
          <label htmlFor="warm" className="modal__radio-label">
            <input type="radio" className="modal__radio-input" id="warm" />
            <span className="modal__custom-radio"></span>
            <span className="modal__radio-text">Warm</span>
          </label>
          <label htmlFor="cold" className="modal__radio-label">
            <input type="radio" className="modal__radio-input" id="cold" />
            <span className="modal__custom-radio"></span>
            <span className="modal__radio-text">Cold</span>
          </label>
        </fieldset>
      </ModalWithForm>
    </div>
  );
}

export default App;
