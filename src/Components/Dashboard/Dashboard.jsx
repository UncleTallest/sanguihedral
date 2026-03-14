import React from 'react';
import './Dashboard.css';

const Dashboard = ({ characters = [], onNewCharacter }) => {
  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <h1>My Characters</h1>
        <button className="dashboard__new-button" onClick={onNewCharacter}>
          New Character
        </button>
      </header>

      <main className="dashboard__content">
        {characters.length === 0 ? (
          <div className="dashboard__empty-state">
            <p>No characters found. Create your first one!</p>
            <button className="dashboard__create-button" onClick={onNewCharacter}>
              Create Character
            </button>
          </div>
        ) : (
          <div className="dashboard__grid">
            {/* CharacterCards will go here in Chunk 3 */}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
