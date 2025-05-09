import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function EditProfileModal({
  activeModal,
  onClose,
  isSubmitting,
  onEditProfile,
}) {
  const [submitError, setSubmitError] = useState(null);
  const { values, errors, isValid, handleChange, resetForm } =
    useFormAndValidation();

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
      buttonText={isSubmitting ? "Saving..." : "Save changes"}
      isSubmitDisabled={!isValid}
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
    </ModalWithForm>
  );
}

export default EditProfileModal;
