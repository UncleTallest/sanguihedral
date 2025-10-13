import "./ModalWithForm.css";

const ModalWithForm = ({
  children,
  buttonText,
  title,
  closeActiveModal,
  modalName,
  isOpen,
  onSubmit,
  altButton,
  altButtonText,
  handleAltButton,
}) => {
  console.log("modalName is ", modalName);
  return (
    <div
      className={`modal modal_type_${modalName} ${
        isOpen ? "modal_opened" : ""
      }`}
    >
      <div className={"modal__content"}>
        <button
          className="modal__button-close"
          type="button"
          onClick={closeActiveModal}
        />
        <h3 className="modal__title">{title}</h3>
        {children}
        <p className="button__container">
          <button
            className={`modal__button modal__button-submit ${
              altButton ? "modal__submit-button-v2" : ""
            }`}
            type="submit"
            onClick={onSubmit}
          >
            {buttonText}
          </button>
          {altButton ? (
            <button
              className="modal__button modal__button-login"
              type="button"
              onClick={handleAltButton}
            >
              {altButtonText}
            </button>
          ) : (
            <></>
          )}
        </p>
      </div>
    </div>
  );
};

export default ModalWithForm;
