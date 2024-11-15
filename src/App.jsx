// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
import sanguihedralLogo from "../public/sanguihedral.png";
import kofiButton from "../public/kofi_badge_sanguihedral.png";
// import KofiWidget from "./Components/KofiWidget";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <main>
        <div>
          <a
            href="https://uncletallest.github.io/sanguihedral/"
            target="_blank"
          >
            <img
              src={sanguihedralLogo}
              className="logo"
              alt="Sanguihedral logo"
            />
          </a>
        </div>
        <h1>Sanguihedral</h1>
        <p>Sanguihedral is intended to be a cross-platform, sect-agnostic</p>
        <p>
          dice roller and character sheet app for Vampire the Masquerade v5.
        </p>
      </main>
      <footer>
        <a href="https://ko-fi.com/uncletallest" target="_blank">
          <img
            src={kofiButton}
            className="logo"
            alt="Buy me a coffee on Ko-fi"
          />
        </a>
      </footer>
    </>
  );
}

export default App;
