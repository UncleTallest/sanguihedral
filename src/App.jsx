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
        {/* <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a> */}
      </div>
      <h1>Sanguihedral</h1>
      <KofiWidget />
    </>
  );
}

export default App;
