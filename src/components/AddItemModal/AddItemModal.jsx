import { useState } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({
  activeModal,
  onClose,
  onOverlayClick,
  onAddGarmentSubmit,
}) {
  const [formData, setFormData] = useState({
    name: "",
    imageUrl: "",
    weatherType: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newGarment = {
        name: formData.name,
        imageUrl: formData.imageUrl,
        weather: formData.weatherType,
      };
      onAddGarmentSubmit(newGarment);
      setFormData({ name: "", imageUrl: "", weatherType: "" });
      setFormErrors({});
      setIsFormValid(false);
    }
  };

  return (
    <ModalWithForm
      activeModal={activeModal}
      onClose={onClose}
      onOverlayClick={onOverlayClick}
      title="New garment"
      buttonText="Add garment"
      name="add-garment"
      isSubmitDisabled={!isFormValid}
      onSubmit={handleSubmit}
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
  );
}

export default AddItemModal;
