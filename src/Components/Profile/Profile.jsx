import kofiButton from "../../../public/kofi_badge_sanguihedral.png";
import "./Profile.css";

function Profile({ currentUser, onSignOut }) {
  return (
    <>
      <main className="profile">
        <h1>Welcome, {currentUser?.name}</h1>
        <p className="profile__email">{currentUser?.email}</p>
        <div className="profile__characters">
          <p>No characters yet.</p>
        </div>
        <div className="buttonContainer">
          <button
            className="entryButton"
            type="button"
            onClick={onSignOut}
          >
            Sign Out
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
    </>
  );
}

export default Profile;
