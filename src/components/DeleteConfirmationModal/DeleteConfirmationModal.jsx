import "./DeleteConfirmationModal.css";
import Modal from "../Modal/Modal";

function DeleteConfirmationModal({
  name,
  activeModal,
  onClose,
  onCardDelete,
  buttonText,
}) {
  return (
    <Modal
      name={name}
      activeModal={activeModal}
      onClose={onClose}
      containerType="delete"
      closeButtonType="delete"
    >
      <h2 className={`modal__title modal__title_type_${name}`}>
        Are you sure you want to delete this item? This action is irreversible.
      </h2>
      <div className="modal__button-container">
        <button
          onClick={onCardDelete}
          type="button"
          className="modal__confirm-button"
        >
          {buttonText}
        </button>
        <button
          onClick={onClose}
          type="button"
          className="modal__cancel-button"
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
}

export default DeleteConfirmationModal;
