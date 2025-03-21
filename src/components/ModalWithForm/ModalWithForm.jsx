import useModalClose from "../../hooks/useModalClose";
import "./ModalWithForm.css";
import Modal from "../Modal/Modal";

function ModalWithForm({
  children,
  buttonText,
  title,
  name,
  activeModal,
  onClose,
  isSubmitDisabled = true,
  onSubmit,
}) {
  return (
    <Modal name={name} activeModal={activeModal} onClose={onClose}>
      <h2 className="modal__title">{title}</h2>
      <form onSubmit={onSubmit} name={name} className="modal__form">
        {children}
        <button
          type="submit"
          className="modal__submit-button"
          disabled={isSubmitDisabled}
        >
          {buttonText}
        </button>
      </form>
    </Modal>
  );
}

export default ModalWithForm;
