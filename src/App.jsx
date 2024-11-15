// import { useState } from "react";
// import reactLogo from "./assets/react.svg";
import sanguihedralLogo from "../public/sanguihedral.png";
import kofiWidgetOverlay from "https://storage.ko-fi.com/cdn/scripts/overlay-widget.js";
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
      {kofiWidgetOverlay.draw("uncletallest", {
        type: "floating-chat",
        "floating-chat.donateButton.text": "Tip Me",
        "floating-chat.donateButton.background-color": "#fcbf47",
        "floating-chat.donateButton.text-color": "#323842",
      })}
    </>
  );
}

export default App;
