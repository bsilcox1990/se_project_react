import { useContext } from "react";
import "./ItemModal.css";
import Modal from "../Modal/Modal";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function ItemModal({ card, onClose, activeModal, name, onDeleteClick }) {
  const { userData } = useContext(CurrentUserContext);
  const isOwn = card.owner === userData._id;

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
        <h2 className="modal__caption" title={card.name}>
          {card.name}
        </h2>
        <p className="modal__weather">Weather: {card.weather}</p>

        {isOwn && (
          <button
            onClick={onDeleteClick}
            type="button"
            className="modal__delete-button"
          >
            Delete item
          </button>
        )}
      </div>
    </Modal>
  );
}

export default ItemModal;
