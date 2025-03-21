import useModalClose from "../../hooks/useModalClose";
import "./Modal.css";

function Modal({
  name,
  activeModal,
  onClose,
  children,
  containerType,
  closeButtonType,
}) {
  const isOpen = activeModal === name;
  useModalClose(isOpen, onClose);

  return (
    <div className={`modal modal_type_${name} ${isOpen && "modal_opened"}`}>
      <div
        className={`modal__container ${
          containerType ? `modal__container_type_${containerType}` : ""
        }`}
      >
        {children}
        <button
          type="button"
          className={`modal__close-button ${
            closeButtonType ? `modal__close-button_type_${closeButtonType}` : ""
          }`}
          onClick={onClose}
        ></button>
      </div>
    </div>
  );
}

export default Modal;
