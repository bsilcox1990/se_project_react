import { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { useFormAndValidation } from "../../hooks/useFormAndValidation";

function LoginModal({ activeModal, onClose, isSubmitting, onLogin }) {
  const [submitError, setSubmitError] = useState(null);
  const { values, errors, isValid, handleChange, resetForm } =
    useFormAndValidation();

  return (
    <ModalWithForm
      activeModal={activeModal}
      onClose={onClose}
      name={"login-user"}
      title={"Log in"}
      buttonText={isSubmitting ? "Logging in..." : "Log in"}
      isSubmitDisabled={!isValid}
    >
      <label htmlFor="email" className="modal__label">
        Email
        <input
          id="login-email"
          name="email"
          type="email"
          required
          value={values.email || ""}
          onChange={handleChange}
          className={`modal__input ${errors.email ? "modal__input_error" : ""}`}
          placeholder="Email"
        />
        {errors.email && <span className="modal__error">{errors.email}</span>}
      </label>
      <label htmlFor="password" className="modal__label">
        Password
        <input
          id="login-password"
          name="password"
          type="password"
          required
          value={values.password || ""}
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
      {submitError && (
        <span className="modal__submit-error">{submitError}</span>
      )}
    </ModalWithForm>
  );
}

export default LoginModal;
