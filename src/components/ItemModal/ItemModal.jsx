import "./ItemModal.css";
import Modal from "../Modal/Modal";

function ItemModal({ card, onClose, activeModal, name, onDeleteClick }) {
  return (
    <Modal
      name={name}
      activeModal={activeModal}
      onClose={onClose}
      containerType="preview"
      closeButtonType="preview"
    >
      <img src={card.imageUrl} alt={card.name} className="modal__image" />
      <div className="modal__footer">
        <h2 className="modal__caption">{card.name}</h2>
        <p className="modal__weather">Weather: {card.weather}</p>
        <button
          onClick={onDeleteClick}
          type="button"
          className="modal__delete-button"
        >
          Delete item
        </button>
      </div>
    </Modal>
  );
}

export default ItemModal;
