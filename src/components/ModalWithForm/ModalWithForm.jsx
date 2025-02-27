import { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  name,
  activeModal,
  onClose,
  onOverlayClick,
}) {
  return (
    <div
      className={`modal ${activeModal === `${name}` && "modal_opened"}`}
      id={name}
      onClick={onOverlayClick}
    >
      <div className="modal__container">
        <button
          onClick={onClose}
          type="button"
          className="modal__close-button"
        ></button>
        <h2 className="modal__title">{title}</h2>
        <form name={name} className="modal__form">
          {children}
          <button type="submit" className="modal__submit-button">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
