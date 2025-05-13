import { useState, useEffect, useContext } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function EditProfileModal({ activeModal, onClose, onEditProfile, buttonText }) {
  const isOpen = activeModal === "edit-profile";
  const { userData } = useContext(CurrentUserContext);
  const [submitError, setSubmitError] = useState(null);
  const [hasEdited, setHasEdited] = useState(false);
  const [initialUserData, setInitialUserData] = useState(null);
  const { values, errors, isValid, handleChange, resetForm, setValues } =
    useFormAndValidation();

  useEffect(() => {
    if (userData) {
      const userValues = {
        name: userData.name,
        avatar: userData.avatar,
      };
      setInitialUserData(userValues);
      if (userData && !hasEdited) {
        setInitialUserData(userValues);
      }
    }
  }, [userData, isOpen, setValues, hasEdited]);

  useEffect(() => {
    if (!initialUserData || !isOpen) return;

    if (
      values.name === initialUserData.name &&
      values.avatar === initialUserData.avatar
    ) {
      setHasEdited(false);
    } else {
      const nameChanged = values.name !== initialUserData.name;
      const avatarChanged = values.avatar !== initialUserData.avatar;
      setHasEdited(nameChanged || avatarChanged);
    }
  }, [values, initialUserData, isOpen]);

  useEffect(() => {
    if (isOpen && userData && !hasEdited) {
      setValues({ name: userData.name || "", avatar: userData.avatar || "" });
    }
  }, [isOpen, userData, setValues, hasEdited]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      const updatedInfo = {
        name: values.name,
        avatar: values.avatar,
      };
      setSubmitError(null);
      onEditProfile(updatedInfo)
        .then(() => {
          resetForm({ name: "", avatar: "" }, {}, false);
          setHasEdited(false);
        })
        .catch((err) => {
          setSubmitError("Failed to update profile.  Please try again.");
          console.error(err);
        });
    }
  };

  return (
    <ModalWithForm
      activeModal={activeModal}
      title={"Change profile data"}
      name={"edit-profile"}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <label htmlFor="name" className="modal__label">
        Name*
        <input
          id="edit-name"
          name="name"
          type="text"
          required
          placeholder="Name"
          onChange={handleChange}
          value={values.name || ""}
          className={`modal__input ${errors.name ? "modal__input_error" : ""}`}
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar*
        <input
          id="edit-avatar"
          name="avatar"
          type="url"
          required
          placeholder="Avatar URL"
          onChange={handleChange}
          value={values.avatar || ""}
          className={`modal__input ${
            errors.avatar ? "modal__input_error" : ""
          }`}
        />
        {errors.avatar && <span className="modal__error">{errors.avatar}</span>}
      </label>
      {submitError && (
        <span className="modal__submit-error">{submitError}</span>
      )}
      <button
        type="submit"
        className="modal__submit-button modal__submit-button_type_edit-profile"
        disabled={!isValid}
      >
        {buttonText}
      </button>
    </ModalWithForm>
  );
}

export default EditProfileModal;
