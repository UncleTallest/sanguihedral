import React, { useState, useEffect } from 'react';
import SheetTabs from '../SheetTabs/SheetTabs';
import DotTracker from '../DotTracker/DotTracker';
import './CharacterSheet.css';

const STANDARD_CLANS = [
  "Brujah", "Gangrel", "Malkavian", "Nosferatu", "Toreador", "Tremere", "Ventrue", 
  "Lasombra", "Hecata", "Ravnos", "Banu Haqim", "Salubri", "Ministry", "Tzimisce"
];

const STANDARD_SECTS = ["Camarilla", "Anarch", "Autarkis", "Sabbat"];

const CoreView = ({ draft, updateDraft }) => (
  <div className="core-view">
    <fieldset className="core-view__section">
      <legend>Narrative</legend>
      <label className="core-view__label">Name
        <input 
          className="core-view__input"
          value={draft.name || ''} 
          onChange={(e) => updateDraft('name', e.target.value)} 
        />
      </label>
      <label className="core-view__label">Concept
        <input 
          className="core-view__input"
          value={draft.concept || ''} 
          onChange={(e) => updateDraft('concept', e.target.value)} 
        />
      </label>
      <label className="core-view__label">Clan
        <select 
          className="core-view__input"
          value={STANDARD_CLANS.includes(draft.clan) ? draft.clan : 'Other'}
          onChange={(e) => updateDraft('clan', e.target.value === 'Other' ? '' : e.target.value)}
        >
          {STANDARD_CLANS.map(clan => <option key={clan} value={clan}>{clan}</option>)}
          <option value="Other">Other</option>
        </select>
        {!STANDARD_CLANS.includes(draft.clan) && (
          <input 
            className="core-view__input core-view__input_margin-top"
            placeholder="Specify Clan"
            value={draft.clan || ''}
            onChange={(e) => updateDraft('clan', e.target.value)}
          />
        )}
      </label>
      <label className="core-view__label">Sect
        <select 
          className="core-view__input"
          value={STANDARD_SECTS.includes(draft.sect) ? draft.sect : 'Other'}
          onChange={(e) => updateDraft('sect', e.target.value === 'Other' ? '' : e.target.value)}
        >
          {STANDARD_SECTS.map(sect => <option key={sect} value={sect}>{sect}</option>)}
          <option value="Other">Other</option>
        </select>
        {!STANDARD_SECTS.includes(draft.sect) && (
          <input 
            className="core-view__input core-view__input_margin-top"
            placeholder="Specify Sect"
            value={draft.sect || ''}
            onChange={(e) => updateDraft('sect', e.target.value)}
          />
        )}
      </label>
    </fieldset>

    <fieldset className="core-view__section">
      <legend>Vital Trackers</legend>
      <div className="core-view__tracker">
        <span>Hunger</span>
        <DotTracker value={draft.hunger} max={5} onChange={(val) => updateDraft('hunger', val)} />
      </div>
      <div className="core-view__tracker">
        <span>Blood Potency</span>
        <DotTracker value={draft.bloodPotency} max={10} onChange={(val) => updateDraft('bloodPotency', val)} />
      </div>
      <div className="core-view__tracker">
        <span>Humanity</span>
        <DotTracker value={draft.humanity} max={10} onChange={(val) => updateDraft('humanity', val)} />
      </div>
    </fieldset>
  </div>
);

const AttributesView = ({ draft, updateNestedDraft }) => {
  const attrs = draft.attributes || {};
  return (
    <div className="stats-grid">
      {Object.keys(attrs).map(attr => (
        <div key={attr} className="stat-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span className="stat-label" style={{ textTransform: 'capitalize' }}>{attr}</span>
          <DotTracker 
            value={attrs[attr]} 
            onChange={(val) => updateNestedDraft('attributes', attr, val)} 
          />
        </div>
      ))}
    </div>
  );
};

const SkillsView = ({ draft, updateNestedDraft }) => {
  const skills = draft.skills || {};
  return (
    <div className="stats-grid">
      {Object.keys(skills).map(skill => (
        <div key={skill} className="stat-row" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
          <span className="stat-label" style={{ textTransform: 'capitalize' }}>{skill}</span>
          <DotTracker 
            value={skills[skill]} 
            onChange={(val) => updateNestedDraft('skills', skill, val)} 
          />
        </div>
      ))}
    </div>
  );
};

const CharacterSheet = ({ initialCharacter, onSave }) => {
  const [activeTab, setActiveTab] = useState('core');
  const [draftState, setDraftState] = useState(initialCharacter);
  const [hasChanges, setHasChanges] = useState(false);

  useEffect(() => {
    setHasChanges(JSON.stringify(initialCharacter) !== JSON.stringify(draftState));
  }, [draftState, initialCharacter]);

  const updateDraft = (field, value) => {
    setDraftState(prev => ({ ...prev, [field]: value }));
  };

  const updateNestedDraft = (category, field, value) => {
    setDraftState(prev => ({
      ...prev,
      [category]: { ...prev[category], [field]: value }
    }));
  };

  const handleSave = () => {
    onSave(draftState);
  };

  return (
    <div className="character-sheet">
      {hasChanges && (
        <div className="sticky-header">
          <button className="save-button" onClick={handleSave}>Save Changes</button>
        </div>
      )}
      
      <div className="tab-content" style={{ padding: '20px', minHeight: '60vh' }}>
        {activeTab === 'core' && <CoreView draft={draftState} updateDraft={updateDraft} />}
        {activeTab === 'attributes' && <AttributesView draft={draftState} updateNestedDraft={updateNestedDraft} />}
        {activeTab === 'skills' && <SkillsView draft={draftState} updateNestedDraft={updateNestedDraft} />}
        {activeTab === 'health' && <div>Health View (TODO)</div>}
      </div>

      <SheetTabs activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default CharacterSheet;
