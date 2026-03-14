import React, { useState, useEffect } from 'react';
import SheetTabs from '../SheetTabs/SheetTabs';

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
      
      <div className="tab-content" style={{ padding: '20px' }}>
        {activeTab === 'core' && <CoreView draft={draftState} updateDraft={updateDraft} />}
        {activeTab === 'attributes' && <div>Attributes View (TODO)</div>}
        {activeTab === 'skills' && <div>Skills View (TODO)</div>}
        {activeTab === 'health' && <div>Health View (TODO)</div>}
      </div>

      <SheetTabs activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default CharacterSheet;
