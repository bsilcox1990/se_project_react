import "./ItemModal.css";

function ItemModal({
  card,
  onClose,
  activeModal,
  name,
  onOverlayClick,
  onDeleteClick,
}) {
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
      </div>
    </div>
  );
}

export default ItemModal;
