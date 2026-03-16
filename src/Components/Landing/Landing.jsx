import React from "react";
import { useNavigate } from "react-router-dom";
import sanguihedralLogo from "../../../public/sanguihedral.png";
import kofiSticker from "../../../public/kofi-sticker.gif";

function Landing({ isLoggedIn, onOpenModal }) {
  const navigate = useNavigate();

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
          {isLoggedIn ? (
            <>
              <button
                className="entryButton"
                type="button"
                onClick={() => navigate("/characters")}
              >
                Go to Dashboard
              </button>
              <button
                className="entryButton"
                type="button"
                onClick={() => navigate("/profile")}
              >
                View Profile
              </button>
            </>
          ) : (
            <button
              name="login"
              className="entryButton"
              type="button"
              onClick={() => onOpenModal("login")}
            >
              Register or Log In
            </button>
          )}
        </div>
      </main>
      <footer>
        <p className="copyright">Copyright 2024-2026 -- Jerry W Jackson</p>
        <a href="https://ko-fi.com/uncletallest" target="_blank" rel="noreferrer">
          <img
            src={kofiSticker}
            className="kofiButton"
            alt="Support me on Ko-fi"
            style={{ height: 'auto', maxWidth: '150px' }}
          />
        </a>
      </footer>
    </>
  );
}

export default Landing;
