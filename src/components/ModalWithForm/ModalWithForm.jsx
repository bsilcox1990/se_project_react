import { useEffect } from "react";
import "./ModalWithForm.css";

function ModalWithForm({ children, buttonText, title, name, isOpen, onClose }) {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className={`modal modal_type_${name}`}
      id={name}
      onClick={handleOverlayClick}
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
