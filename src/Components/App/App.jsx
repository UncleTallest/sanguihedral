import { useState } from "react";
import sanguihedralLogo from "../../../public/sanguihedral.png";
import kofiButton from "../../../public/kofi_badge_sanguihedral.png";
import KofiWidget from "../KofiWidget/KofiWidget";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../RegisterModal/RegisterModal";
import "./App.css";

function App() {
  const [activeModal, setActiveModal] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleOpenModal = (modal) => {
    setActiveModal(modal);
  };

  const handleCloseModal = () => {
    setActiveModal("");
  };

  const handleLogin = (email, password) => {
    setIsLoading(true);
    console.log("handleLogin called with", email);
    // TODO: wire up auth API
    setIsLoading(false);
  };

  const handleRegistration = ({ user }) => {
    setIsLoading(true);
    console.log("handleRegistration called with", user);
    // TODO: wire up auth API
    setIsLoading(false);
  };

  return (
    <>
      <main>
        <div>
          <a href="https://uncletallest.github.io/sanguihedral/" target="_self">
            <img
              src={sanguihedralLogo}
              className="logo"
              alt="Sanguihedral logo"
            />
          </a>
        </div>
        <h1>Sanguihedral</h1>
        <div className="blurb">
          <p>
            Sanguihedral is intended to be a cross-platform, sect-agnostic dice
            roller and character sheet app for Vampire the Masquerade v5.
          </p>
        </div>
        <div className="buttonContainer">
          <button
            name="login"
            className="entryButton"
            type="button"
            onClick={() => handleOpenModal("login")}
          >
            Register or Log In
          </button>
        </div>
      </main>
      <footer>
        <p className="copyright">Copyright 2024-2026 -- Jerry W Jackson</p>
        <a href="https://ko-fi.com/uncletallest" target="_blank">
          <img
            src={kofiButton}
            className="kofiButton"
            alt="Buy me a coffee on Ko-fi"
          />
        </a>
      </footer>
      {activeModal === "login" && (
        <LoginModal
          modalName="login"
          isOpen={activeModal === "login"}
          closeActiveModal={handleCloseModal}
          handleLogin={handleLogin}
          setActiveModal={setActiveModal}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
      {activeModal === "register" && (
        <RegisterModal
          modalName="register"
          isOpen={activeModal === "register"}
          closeActiveModal={handleCloseModal}
          onRegistration={handleRegistration}
          onLogin={handleLogin}
          setActiveModal={setActiveModal}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </>
  );
}

export default App;
