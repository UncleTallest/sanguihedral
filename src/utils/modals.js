export const handleCloseModal = () => {
  setActiveModal("");
};

// available modals are =>
//   login, (login existing user)
//   register, (register new user)
//   preview, (card preview)
//   confirm, (confirm deletion)
//   edit, (edit profile)
//   create (create item)
export const handleOpenModal = (modal) => {
  if (modal === "preview") {
    setSelectedCard(EventTarget);
  }
  setActiveModal(modal);
  console.log("active modal is ", activeModal);
};
