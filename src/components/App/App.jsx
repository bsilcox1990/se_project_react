import { useState } from "react";
import { useEffect } from "react";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import { getWeatherData, filterWeatherData } from "../../utils/weatherApi";
//import { defaultClothingItems } from "../../utils/constants";

function App() {
  const [weatherData, setWeatherData] = useState({
    city: "",
    condition: "",
    isDay: true,
    temp: { F: 57.11 },
    type: "",
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    weatherType: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  //const [garments, setGarments] = useState(defaultClothingItems);
  const handleAddModal = () => setActiveModal("add-garment");
  const closeModal = () => setActiveModal("");

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  //trying form validation
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === "radio") {
      setFormData((prev) => ({
        ...prev,
        weatherType: prev.weatherType === value ? "" : value,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
    const updatedformData = {
      ...formData,
      [name]:
        type === "radio"
          ? formData.weatherType === value
            ? ""
            : value
          : value,
    };
    setIsFormValid(validateForm(updatedformData));
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = (data = formData) => {
    const errors = {};
    if (!data.name.trim()) errors.name = "Name is required";
    else if (data.name.length < 2)
      errors.name = "Name must be at least 2 characters";
    else if (data.name.length > 40)
      errors.name = "Name must be 40 characters or less";

    if (!data.imageUrl.trim()) errors.imageUrl = "Image URL is required";
    else if (!isValidUrl(data.imageUrl))
      errors.imageUrl = "Please enter a valid URL";

    if (!data.weatherType) errors.weatherType = "Please select a weather type";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const isValidUrl = (string) => {
    try {
      new URL(string);
      return true;
    } catch {
      return false;
    }
  };

  /* const handleAddGarmentSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newGarment = {
        name: formData.name,
        imageUrl: formData.imageUrl,
        weatherType: formData.weatherType,
      };
      console.log(newGarment);
      debugger;
      setGarments((prev) => [...prev, newGarment]);
      debugger;
      closeModal();
      setFormData({ name: "", imageUrl: "", weatherType: "" });
      setFormErrors({});
      setIsFormValid(false);
    }
  }; */

  useEffect(() => {
    getWeatherData(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch((err) => console.error(err));
  }, []);

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
        <Header weatherData={weatherData} handleAddModal={handleAddModal} />
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
        isSubmitDisabled={!isFormValid}
        //onSubmit={handleAddGarmentSubmit}
      >
        <label htmlFor="name" className="modal__label">
          Name
          <input
            type="text"
            required
            minLength="2"
            maxLength="40"
            placeholder="Name"
            className={`modal__input ${
              formErrors.name ? "modal__input_error" : ""
            }`}
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {formErrors.name && (
            <span className="modal__error">{formErrors.name}</span>
          )}
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image
          <input
            type="url"
            required
            placeholder="Image URL"
            className={`modal__input ${
              formErrors.name ? "modal__input_error" : ""
            }`}
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
          />
          {formErrors.name && (
            <span className="modal__error">{formErrors.imageUrl}</span>
          )}
        </label>
        <fieldset className="modal__radio-buttons">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__radio-label">
            <input
              type="radio"
              className="modal__radio-input"
              id="hot"
              name="weatherType"
              value="hot"
              checked={formData.weatherType === "hot"}
              onChange={handleChange}
            />
            <span className="modal__custom-radio"></span>
            <span className="modal__radio-text">Hot</span>
          </label>
          <label htmlFor="warm" className="modal__radio-label">
            <input
              type="radio"
              className="modal__radio-input"
              id="warm"
              name="weatherType"
              value="warm"
              checked={formData.weatherType === "warm"}
              onChange={handleChange}
            />
            <span className="modal__custom-radio"></span>
            <span className="modal__radio-text">Warm</span>
          </label>
          <label htmlFor="cold" className="modal__radio-label">
            <input
              type="radio"
              className="modal__radio-input"
              id="cold"
              name="weatherType"
              value="cold"
              checked={formData.weatherType === "cold"}
              onChange={handleChange}
            />
            <span className="modal__custom-radio"></span>
            <span className="modal__radio-text">Cold</span>
          </label>
          {formErrors.weatherType && (
            <span className="modal__error">{formErrors.weatherType}</span>
          )}
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
