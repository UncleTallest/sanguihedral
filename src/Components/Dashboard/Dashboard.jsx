import React, { useState } from 'react';
import CharacterCard from '../CharacterCard/CharacterCard';
import ImportForm from '../ImportForm/ImportForm';
import { useCharacters } from '../../contexts/CharacterContext';
import { useNavigate } from 'react-router-dom';
import { fetchAndParseSheet } from '../../utils/sheetParser';
import './Dashboard.css';

const Dashboard = () => {
  const { characters, addCharacter, deleteCharacter, isLoading: isContextLoading } = useCharacters();
  const [activeMenu, setActiveMenu] = useState(null);
  const [showImport, setShowImport] = useState(false);
  const [isParsing, setIsParsing] = useState(false);
  const [parsedCharacter, setParsedCharacter] = useState(null);
  const [importError, setImportError] = useState(null);
  
  const navigate = useNavigate();

  const handleCardClick = (charId) => {
    setActiveMenu(activeMenu === charId ? null : charId);
  };

  const handleNewCharacter = () => {
    setShowImport(true);
  };

  const handleCreateEmpty = () => {
    const newCharData = {
      name: "New Character",
      clan: "Brujah",
      sect: "Camarilla",
      attributes: {
        strength: 1, dexterity: 1, stamina: 1,
        charisma: 1, manipulation: 1, composure: 1,
        intelligence: 1, wits: 1, resolve: 1
      },
      skills: {
        athletics: 0, brawl: 0, craft: 0, drive: 0, firearms: 0, larceny: 0, melee: 0, stealth: 0, survival: 0,
        animalKen: 0, etiquette: 0, insight: 0, intimidation: 0, leadership: 0, performance: 0, persuasion: 0, streetwise: 0, subterfuge: 0,
        academics: 0, awareness: 0, finance: 0, investigation: 0, medicine: 0, occult: 0, politics: 0, science: 0, technology: 0
      }
    };
    addCharacter(newCharData).then((newChar) => {
      navigate(`/characters/${newChar._id}`);
    });
  };

  const handleImport = async (url) => {
    setIsParsing(true);
    setImportError(null);
    try {
      const char = await fetchAndParseSheet(url);
      setParsedCharacter(char);
    } catch (err) {
      setImportError(err.message);
    } finally {
      setIsParsing(false);
    }
  };

  const handleConfirmImport = () => {
    addCharacter(parsedCharacter).then((newChar) => {
      setParsedCharacter(null);
      setShowImport(false);
      navigate(`/characters/${newChar._id}`);
    });
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this character?")) {
      deleteCharacter(id);
    }
  };

  if (isContextLoading && characters.length === 0) {
    return <div className="dashboard">Loading characters...</div>;
  }

  return (
    <div className="dashboard">
      <header className="dashboard__header">
        <h1>My Characters</h1>
        <button className="dashboard__new-button" onClick={handleNewCharacter}>
          New Character
        </button>
      </header>

      <main className="dashboard__content">
        {characters.length === 0 ? (
          <div className="dashboard__empty-state">
            <p>No characters found. Create your first one!</p>
            <div className="dashboard__empty-actions">
              <button className="dashboard__create-button" onClick={handleCreateEmpty}>
                Create Empty Character
              </button>
              <button className="dashboard__import-button" onClick={() => setShowImport(true)}>
                Import from Google Sheet
              </button>
            </div>
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
                    <button onClick={() => navigate(`/characters/${char._id}`)}>View Sheet</button>
                    <button onClick={() => navigate(`/dice?charId=${char._id}`)}>Dice Roller</button>
                    <button 
                      className="dashboard__menu-delete" 
                      onClick={() => handleDelete(char._id)}
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

      {showImport && (
        <div className="dashboard__modal-overlay">
          {!parsedCharacter ? (
            <div className="dashboard__modal-content">
              <ImportForm 
                onImport={handleImport} 
                onCancel={() => setShowImport(false)} 
                isLoading={isParsing}
              />
              {importError && <p className="dashboard__error">{importError}</p>}
              <div className="dashboard__modal-alt">
                <span>or</span>
                <button className="dashboard__link-btn" onClick={handleCreateEmpty}>
                  Create character from scratch
                </button>
              </div>
            </div>
          ) : (
            <div className="dashboard__modal-content dashboard__review">
              <h2>Review Parsed Data</h2>
              <div className="dashboard__review-data">
                <p><strong>Name:</strong> {parsedCharacter.name || 'Not found'}</p>
                <p><strong>Clan:</strong> {parsedCharacter.clan || 'Not found'}</p>
                <p><strong>Sect:</strong> {parsedCharacter.sect || 'Not found'}</p>
                <p><strong>Attributes found:</strong> {Object.keys(parsedCharacter.attributes || {}).length}</p>
                <p><strong>Skills found:</strong> {Object.keys(parsedCharacter.skills || {}).length}</p>
              </div>
              <div className="dashboard__review-actions">
                <button 
                  className="dashboard__btn dashboard__btn_secondary" 
                  onClick={() => setParsedCharacter(null)}
                >
                  Back
                </button>
                <button 
                  className="dashboard__btn dashboard__btn_primary" 
                  onClick={handleConfirmImport}
                  disabled={isContextLoading}
                >
                  {isContextLoading ? 'Saving...' : 'Confirm & Save'}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
