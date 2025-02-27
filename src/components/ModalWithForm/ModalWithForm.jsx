import "./ModalWithForm.css";

function ModalWithForm() {
  return (
    <div className="modal modal_opened">
      <div className="modal__container">
        <button type="button" className="modal__close-button"></button>
        <h2 className="modal__title">New garment</h2>
        <form action="" className="modal__form">
          <label htmlFor="name" className="modal__label">
            Name
            <input
              type="text"
              placeholder="Name"
              className="modal__input"
              id="name"
            />
          </label>
          <label htmlFor="imageUrl" className="modal__label">
            Image
            <input
              type="url"
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
          <button type="submit" className="modal__submit-button">
            Add garment
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
