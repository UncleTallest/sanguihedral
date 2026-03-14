import React, { useState } from 'react';
import CharacterCard from '../CharacterCard/CharacterCard';
import './Dashboard.css';

const Dashboard = ({ characters = [], onNewCharacter, onViewSheet, onDiceRoller, onDeleteCharacter }) => {
  const [activeMenu, setActiveMenu] = useState(null);

  const handleCardClick = (charId) => {
    setActiveMenu(activeMenu === charId ? null : charId);
  };

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
            {characters.map((char) => (
              <div key={char._id} className="dashboard__card-wrapper">
                <CharacterCard 
                  character={char} 
                  onClick={() => handleCardClick(char._id)} 
                />
                {activeMenu === char._id && (
                  <div className="dashboard__menu">
                    <button onClick={() => onViewSheet(char._id)}>View Sheet</button>
                    <button onClick={() => onDiceRoller(char._id)}>Dice Roller</button>
                    <button 
                      className="dashboard__menu-delete" 
                      onClick={() => onDeleteCharacter(char._id)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Dashboard;
