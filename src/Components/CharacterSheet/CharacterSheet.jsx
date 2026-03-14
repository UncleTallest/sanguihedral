import React, { useState, useEffect } from 'react';
import SheetTabs from '../SheetTabs/SheetTabs';
import DotTracker from '../DotTracker/DotTracker';

const CoreView = ({ draft, updateDraft }) => (
  <div>
    <label>Name: 
      <input 
        value={draft.name || ''} 
        onChange={(e) => updateDraft('name', e.target.value)} 
      />
    </label>
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
        <div className="sticky-header" style={{ position: 'sticky', top: 0, background: '#333', padding: '10px' }}>
          <button onClick={handleSave}>Save Changes</button>
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

