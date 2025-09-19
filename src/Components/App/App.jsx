// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
import sanguihedralLogo from "../public/sanguihedral.png";
import kofiButton from "../public/kofi_badge_sanguihedral.png";
import { handleOpenModal, handleCloseModal } from "../../utils/modals";
import { getToken, handleToken, checkToken } from "../../utils/token";
import KofiWidget from "../Components/KofiWidget/KofiWidget";
import "./App.css";

function App() {
  const [activeModal, setActiveModal] = useState("");
  // const [count, setCount] = useState(0);

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
          <button name="login" className="entryButton" type="button">
            Register or Log In
          </button>
        </div>
      </main>
      <footer>
        <p className="copyright">Copyright 2024 -- Jerry W Jackson</p>
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
          isOpen={activeModal === "login"}
          onClose={handleCloseModal}
          handleLogin={handleLogin}
          onSecondButtonClick={() => handleOpenModal("register")}
          setActiveModal={setActiveModal}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
      {activeModal === "register" && (
        <RegisterModal
          isOpen={activeModal === "register"}
          onClose={handleCloseModal}
          onRegistration={handleRegistration}
          onLogin={handleLogin}
          onSecondButtonClick={() => handleOpenModal("login")}
          setActiveModal={setActiveModal}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
      ;
    </>
  );
}
export default App;
