import { useState } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function AddItemModal({
  activeModal,
  onClose,
  onAddGarmentSubmit,
  isSubmitting,
}) {
  const [submitError, setSubmitError] = useState(null);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      const newGarment = {
        name: values.name,
        imageUrl: values.imageUrl,
        weather: values.weatherType,
      };
      setSubmitError(null);
      onAddGarmentSubmit(newGarment)
        .then(() => {
          resetForm({ name: "", imageUrl: "", weatherType: "" }, {}, false);
        })
        .catch((error) => {
          setSubmitError("Failed to add garment. Please try again.");
          console.error(error);
        });
    }
  };

  return (
    <ModalWithForm
      activeModal={activeModal}
      onClose={onClose}
      title="New garment"
      buttonText={isSubmitting ? "Adding..." : "Add garment"}
      name="add-garment"
      isSubmitDisabled={!isValid}
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
          className={`modal__input ${errors.name ? "modal__input_error" : ""}`}
          id="add-name"
          name="name"
          value={values.name || ""}
          onChange={handleChange}
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image
        <input
          type="url"
          required
          placeholder="Image URL"
          className={`modal__input ${
            errors.imageUrl ? "modal__input_error" : ""
          }`}
          id="add-imageUrl"
          name="imageUrl"
          value={values.imageUrl || ""}
          onChange={handleChange}
        />
        {errors.imageUrl && (
          <span className="modal__error">{errors.imageUrl}</span>
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
            required
            checked={values.weatherType === "hot"}
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
            checked={values.weatherType === "warm"}
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
            checked={values.weatherType === "cold"}
            onChange={handleChange}
          />
          <span className="modal__custom-radio"></span>
          <span className="modal__radio-text">Cold</span>
        </label>
        {errors.weatherType && (
          <span className="modal__error">{errors.weatherType}</span>
        )}
      </fieldset>
      {submitError && (
        <span className="modal__submit-error">{submitError}</span>
      )}
    </ModalWithForm>
  );
}

export default AddItemModal;
