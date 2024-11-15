// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
import sanguihedralLogo from "../public/sanguihedral.png";
import KofiWidget from "./Components/KofiWidget";
import "./App.css";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <a href="https://uncletallest.github.io/sanguihedral/" target="_blank">
          <img
            src={sanguihedralLogo}
            className="logo"
            alt="Sanguihedral logo"
          />
        </a>
      </div>
      <h1>Sanguihedral</h1>
      <p>
        Sanguihedral is intended to be a cross-platform, sect-agnostic dice
        roller and character sheet app for Vampire the Masquerade v5.
      </p>
      <KofiWidget />
    </>
  );
}

export default App;
