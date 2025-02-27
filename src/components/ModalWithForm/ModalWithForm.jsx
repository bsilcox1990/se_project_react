import "./ModalWithForm.css";

function ModalWithForm({ children, buttonText, title, name }) {
  return (
    <div className={`modal modal_type_${name}`} id={name}>
      <div className="modal__container">
        <button type="button" className="modal__close-button"></button>
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
