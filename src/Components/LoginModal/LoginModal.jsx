import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

const LoginModal = ({
  activeModal,
  modalName,
  isOpen,
  closeActiveModal,
  handleLogin,
  setActiveModal,
  isLoading,
  setIsLoading,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    console.log("submitting login");
    handleLogin(email, password);
  };

  const handleToggleModal = () => {
    const modalName = "register";
    setActiveModal(modalName);
  };

  return (
    <ModalWithForm
      closeActiveModal={closeActiveModal}
      modalName={modalName}
      isOpen={isOpen}
      buttonText={isLoading ? "..." : "Next"}
      title="Log In"
      onSubmit={handleSubmit}
      logIn={true}
      altButton={true}
      altButtonText="or Register"
      handleAltButton={handleToggleModal}
    >
      <label className="modal__label">
        Email
        <input
          className="modal__input"
          type="email"
          placeholder="email"
          name="email"
          value={email}
          onChange={handleEmail}
        />
      </label>
      <label className="modal__label">
        Password
        <input
          className="modal__input"
          type="password"
          placeholder="Password"
          name="Password"
          value={password}
          onChange={handlePassword}
        />
      </label>
    </ModalWithForm>
  );
};
export default LoginModal;
