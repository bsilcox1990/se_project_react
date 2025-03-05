import "./ItemModal.css";

function ItemModal({ card, onClose, activeModal, name, onOverlayClick }) {
  return (
    <div
      className={`modal modal_type_${name} ${
        activeModal === `${name}` && "modal_opened"
      }`}
      id={name}
      onClick={onOverlayClick}
    >
      <div className={`modal__container modal__container_type_${name}`}>
        <button
          onClick={onClose}
          type="button"
          className={`modal__close-button modal__close-button_type_${name}`}
        />
        <img src={card.link} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
