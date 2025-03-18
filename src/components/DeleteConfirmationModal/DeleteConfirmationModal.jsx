import "./DeleteConfirmationModal.css";

function DeleteConfirmationModal({
  name,
  activeModal,
  onClose,
  onOverlayClick,
  onCardDelete,
}) {
  return (
    <div
      className={`modal modal_type_${name} ${
        activeModal === `${name}` && "modal_opened"
      }`}
      onClick={onOverlayClick}
      id={name}
    >
      <div className={`modal__container modal__container_type_${name}`}>
        <button
          onClick={onClose}
          type="button"
          className={`modal__close-button modal__close-button_type_${name}`}
        ></button>
        <h2 className={`modal__title modal__title_type_${name}`}>
          Are you sure you want to delete this item? This action is
          irreversible.
        </h2>
        <div className="modal__button-container">
          <button
            onClick={onCardDelete}
            type="button"
            className="modal__confirm-button"
          >
            Yes, delete item
          </button>
          <button
            onClick={onClose}
            type="button"
            className="modal__cancel-button"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
