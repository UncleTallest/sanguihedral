import React from "react";
import { Link, useLocation } from "react-router-dom";
import sanguihedralLogo from "../../../public/sanguihedral.png";
import "./Header.css";

const Header = ({ isLoggedIn, onOpenModal, onSignOut }) => {
  const location = useLocation();
  
  // Extract character ID if we are on a character sheet page
  const charMatch = location.pathname.match(/\/characters\/([^/]+)/);
  const currentCharId = charMatch ? charMatch[1] : null;

  return (
    <header className="header">
      <div className="header__content">
        <Link to="/" className="header__logo-container">
          <img
            src={sanguihedralLogo}
            alt="Sanguihedral Logo"
            className="header__logo"
          />
          <span className="header__title">Sanguihedral</span>
        </Link>

        <nav className="header__nav">
          {isLoggedIn ? (
            <>
              <Link to="/characters" className="header__link">
                Dashboard
              </Link>
              <Link 
                to={currentCharId ? `/dice?charId=${currentCharId}` : "/dice"} 
                className="header__link"
              >
                Dice Roller
              </Link>
              <Link to="/profile" className="header__link">
                Profile
              </Link>
              <button
                className="header__button header__button_signout"
                onClick={onSignOut}
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              className="header__button header__button_login"
              onClick={() => onOpenModal("login")}
            >
              Log In
            </button>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
