import "./ModalWithForm.css";
import Modal from "../Modal/Modal";

function ModalWithForm({
  children,
  title,
  name,
  activeModal,
  onClose,
  onSubmit,
}) {
  return (
    <Modal name={name} activeModal={activeModal} onClose={onClose}>
      <h2 className="modal__title">{title}</h2>
      <form onSubmit={onSubmit} name={name} className="modal__form">
        {children}
      </form>
    </Modal>
  );
}

export default ModalWithForm;
