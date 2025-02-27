import { useState } from "react";
import { useEffect } from "react";

import "./App.css";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";

function App() {
  const [weatherData, setWeatherData] = useState({ type: "cold" });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const handleAddModal = () => setActiveModal("add-garment");
  const closeModal = () => setActiveModal("");
  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") closeModal();
    };
    if (activeModal) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [activeModal]);
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) closeModal();
  };

  return (
    <div className="page">
      <div className="page__content">
        <Header handleAddModal={handleAddModal} />
        <Main weatherData={weatherData} handleCardClick={handleCardClick} />
        <Footer />
      </div>
      <ModalWithForm
        activeModal={activeModal}
        onClose={closeModal}
        onOverlayClick={handleOverlayClick}
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
      <ItemModal
        activeModal={activeModal}
        card={selectedCard}
        onClose={closeModal}
        name="preview"
        onOverlayClick={handleOverlayClick}
      />
    </div>
  );
}

export default App;
