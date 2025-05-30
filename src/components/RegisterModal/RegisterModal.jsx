import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function RegisterModal({
  activeModal,
  isSubmitting,
  onClose,
  onRegister,
  handleLoginModal,
}) {
  const [submitError, setSubmitError] = useState(null);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormAndValidation();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isValid) {
      const newUser = {
        email: values.email,
        password: values.password,
        name: values.name,
        avatar: values.avatar,
      };
      setSubmitError(null);
      onRegister(newUser)
        .then(() => {
          resetForm(
            { email: "", password: "", name: "", avatar: "" },
            {},
            false
          );
        })
        .catch((err) => {
          setSubmitError("Failed to register user.  Please try again.");
          console.error(err);
        });
    }
  };
  return (
    <ModalWithForm
      activeModal={activeModal}
      title={"Sign up"}
      name={"register-user"}
      onClose={onClose}
      buttonText={isSubmitting ? "Registering..." : "Sign up"}
      isSubmitDisabled={!isValid}
      onSubmit={handleSubmit}
    >
      <label htmlFor="email" className="modal__label">
        Email*
        <input
          id="register-email"
          name="email"
          value={values.email || ""}
          type="email"
          required
          onChange={handleChange}
          className={`modal__input ${errors.email ? "modal__input_error" : ""}`}
          placeholder="Email"
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>
      <label htmlFor="password" className="modal__label">
        Password*
        <input
          id="register-password"
          name="password"
          type="password"
          value={values.password || ""}
          required
          onChange={handleChange}
          className={`modal__input ${
            errors.password ? "modal__input_error" : ""
          }`}
          placeholder="Password"
        />
        {errors.password && (
          <span className="modal__error">{errors.password}</span>
        )}
      </label>
      <label htmlFor="name" className="modal__label">
        Name*
        <input
          id="register-name"
          name="name"
          type="text"
          minLength="2"
          maxLength="40"
          value={values.name || ""}
          required
          onChange={handleChange}
          className={`modal__input ${errors.name ? "modal__input_error" : ""}`}
          placeholder="Name"
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label htmlFor="avatar" className="modal__label">
        Avatar URL*
        <input
          id="register-avatar"
          name="avatar"
          type="url"
          required
          value={values.avatar || ""}
          onChange={handleChange}
          className={`modal__input ${
            errors.avatar ? "modal__input_error" : ""
          }`}
          placeholder="Avatar URL"
        />
        {errors.avatar && <span className="modal__error">{errors.avatar}</span>}
      </label>
      {submitError && (
        <span className="modal__submit-error">{submitError}</span>
      )}
      <button
        type="submit"
        className="modal__submit-button modal__submit-button_type_register"
        disabled={!isValid}
      >
        Sign up
      </button>
      <button
        type="button"
        className="modal__switch-login-button"
        onClick={handleLoginModal}
      >
        or Log in
      </button>
    </ModalWithForm>
  );
}

export default RegisterModal;
