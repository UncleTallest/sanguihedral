import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
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
          <NavLink 
            to="/help" 
            className={({ isActive }) => `header__link ${isActive ? "header__link_active" : ""}`}
          >
            Help
          </NavLink>
          {isLoggedIn ? (
            <>
              <NavLink 
                to="/characters" 
                className={({ isActive }) => isActive ? "header__link header__link_active" : "header__link"}
              >
                Dashboard
              </NavLink>
              <NavLink 
                to={currentCharId ? `/dice?charId=${currentCharId}` : "/dice"} 
                className={({ isActive }) => isActive ? "header__link header__link_active" : "header__link"}
              >
                Dice Roller
              </NavLink>
              <NavLink 
                to="/profile" 
                className={({ isActive }) => isActive ? "header__link header__link_active" : "header__link"}
              >
                Profile
              </NavLink>
              <button
                className="header__button header__button_signout btn_primary"
                onClick={onSignOut}
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              className="header__button header__button_login btn_primary"
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
