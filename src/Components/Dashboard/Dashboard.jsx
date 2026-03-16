import React, { useState } from 'react';
import CharacterCard from '../CharacterCard/CharacterCard';
import ImportForm from '../ImportForm/ImportForm';
import { useCharacters } from '../../contexts/CharacterContext';
import { useNavigate } from 'react-router-dom';
import { fetchAndParseSheet } from '../../utils/sheetParser';
import v5data from '../../utils/v5data.json';
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
      console.log("Parsed Character Data:", char);
      setParsedCharacter(char);
    } catch (err) {
      setImportError(err.message);
    } finally {
      setIsParsing(false);
    }
  };

  const handleUpdateParsed = (field, value) => {
    setParsedCharacter(prev => ({ ...prev, [field]: value }));
  };

  const handleConfirmImport = () => {
    if (!parsedCharacter.name || !parsedCharacter.clan) {
      alert("Name and Clan are required to save.");
      return;
    }
    
    console.log("Saving Imported Character:", parsedCharacter);
    
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
              <div className="dashboard__review-form">
                <label className="dashboard__review-label">
                  Name
                  <input 
                    type="text" 
                    value={parsedCharacter.name || ''} 
                    onChange={(e) => handleUpdateParsed('name', e.target.value)}
                    className="dashboard__review-input"
                  />
                </label>
                <label className="dashboard__review-label">
                  Clan
                  <select 
                    value={parsedCharacter.clan || ''} 
                    onChange={(e) => handleUpdateParsed('clan', e.target.value)}
                    className="dashboard__review-input"
                  >
                    <option value="">-- Select Clan --</option>
                    {v5data.clans.map(c => <option key={c} value={c}>{c}</option>)}
                    <option value="Other">Other</option>
                  </select>
                </label>
                <label className="dashboard__review-label">
                  Sect
                  <select 
                    value={parsedCharacter.sect || ''} 
                    onChange={(e) => handleUpdateParsed('sect', e.target.value)}
                    className="dashboard__review-input"
                  >
                    <option value="Camarilla">Camarilla</option>
                    <option value="Anarch">Anarch</option>
                    <option value="Autarkis">Autarkis</option>
                    <option value="Sabbat">Sabbat</option>
                  </select>
                </label>
                
                <div className="dashboard__review-stats-summary">
                  <p>Attributes found: <strong>{Object.keys(parsedCharacter.attributes || {}).length}</strong></p>
                  <p>Skills found: <strong>{Object.keys(parsedCharacter.skills || {}).length}</strong></p>
                  <p>Disciplines found: <strong>{parsedCharacter.disciplines?.length || 0}</strong></p>
                  {parsedCharacter.disciplines?.length > 0 && (
                    <ul className="dashboard__review-list">
                      {parsedCharacter.disciplines.map(d => (
                        <li key={d.name}>{d.name} ({d.dots}) - {d.powers.length} powers</li>
                      ))}
                    </ul>
                  )}
                </div>
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
                  disabled={isContextLoading || !parsedCharacter.name || !parsedCharacter.clan}
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
