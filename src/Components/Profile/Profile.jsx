import React from "react";
import kofiSticker from "../../../public/kofi-sticker.gif";
import { useCharacters } from "../../contexts/CharacterContext";
import "./Profile.css";

function Profile({ currentUser, onSignOut }) {
  const { characters } = useCharacters();

  return (
    <>
      <main className="profile">
        {currentUser?.avatar && (
          <img
            src={currentUser.avatar}
            className="profile__avatar"
            alt={`${currentUser.name}'s avatar`}
          />
        )}
        <h1>Welcome, {currentUser?.name}</h1>
        <p className="profile__email">{currentUser?.email}</p>
        
        <div className="profile__characters-section">
          <h2>My Character List</h2>
          <div className="profile__characters">
            {characters.length > 0 ? (
              <ul className="profile__character-list">
                {characters.map((char) => (
                  <li key={char._id} className="profile__character-item">
                    <strong>{char.name}</strong> - {char.clan} ({char.sect})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No characters yet.</p>
            )}
          </div>
        </div>

        <div className="buttonContainer">
          <button
            className="entryButton btn_primary"
            type="button"
            onClick={onSignOut}
          >
            Sign Out
          </button>
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

export default Profile;
