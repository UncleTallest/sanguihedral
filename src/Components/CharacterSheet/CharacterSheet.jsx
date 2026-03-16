import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCharacters } from '../../contexts/CharacterContext';
import SheetTabs from '../SheetTabs/SheetTabs';
import DotTracker from '../DotTracker/DotTracker';
import DamageTracker from '../DamageTracker/DamageTracker';
import v5data from '../../utils/v5data.json';
import './CharacterSheet.css';

const STANDARD_CLANS = v5data.clans;

const STANDARD_SECTS = ["Camarilla", "Anarch", "Autarkis", "Sabbat"];

const ATTR_GROUPS = {
  Physical: ["strength", "dexterity", "stamina"],
  Social: ["charisma", "manipulation", "composure"],
  Mental: ["intelligence", "wits", "resolve"]
};

const SKILL_GROUPS = {
  Physical: ["athletics", "brawl", "craft", "drive", "firearms", "larceny", "melee", "stealth", "survival"],
  Social: ["animalKen", "etiquette", "insight", "intimidation", "leadership", "performance", "persuasion", "streetwise", "subterfuge"],
  Mental: ["academics", "awareness", "finance", "investigation", "medicine", "occult", "politics", "science", "technology"]
};

const CoreView = ({ draft, updateDraft }) => {
  const stamina = draft.attributes?.stamina || 1;
  const composure = draft.attributes?.composure || 1;
  const resolve = draft.attributes?.resolve || 1;

  const maxHealth = stamina + 3;
  const maxWillpower = composure + resolve;

  return (
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
            id="clan-select"
            aria-label="Clan"
            value={STANDARD_CLANS.includes(draft.clan) ? draft.clan : 'Other'}
            onChange={(e) => updateDraft('clan', e.target.value === 'Other' ? '' : e.target.value)}
          >
            <option value="">-- Select Clan --</option>
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
            aria-label="Sect"
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
        <div className="core-view__tracker-stacked">
          <span>Health (Max: {maxHealth})</span>
          <DamageTracker 
            max={maxHealth}
            superficial={draft.superficialDamage || 0}
            aggravated={draft.aggravatedDamage || 0}
            onChange={({ superficial, aggravated }) => {
              updateDraft('superficialDamage', superficial);
              updateDraft('aggravatedDamage', aggravated);
            }}
          />
        </div>
        <div className="core-view__tracker-stacked">
          <span>Willpower (Max: {maxWillpower})</span>
          <DamageTracker 
            max={maxWillpower}
            superficial={draft.superficialWillpowerDamage || 0}
            aggravated={draft.aggravatedWillpowerDamage || 0}
            onChange={({ superficial, aggravated }) => {
              updateDraft('superficialWillpowerDamage', superficial);
              updateDraft('aggravatedWillpowerDamage', aggravated);
            }}
          />
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
};

const StatSection = ({ title, items, values, onChange }) => (
  <div className="stat-section">
    <h3 className="stat-section__title">{title}</h3>
    <div className="stats-grid">
      {items.map(item => (
        <div key={item} className="stat-row">
          <span className="stat-label">{item}</span>
          <DotTracker 
            value={values[item] || 0} 
            onChange={(val) => onChange(item, val)} 
          />
        </div>
      ))}
    </div>
  </div>
);

const AttributesView = ({ draft, updateNestedDraft }) => {
  const attrs = draft.attributes || {};
  return (
    <div className="tab-view_grouped">
      {Object.entries(ATTR_GROUPS).map(([group, fields]) => (
        <StatSection 
          key={group}
          title={group}
          items={fields}
          values={attrs}
          onChange={(field, val) => updateNestedDraft('attributes', field, val)}
        />
      ))}
    </div>
  );
};

const SkillsView = ({ draft, updateNestedDraft }) => {
  const skills = draft.skills || {};
  return (
    <div className="tab-view_grouped">
      {Object.entries(SKILL_GROUPS).map(([group, fields]) => (
        <StatSection 
          key={group}
          title={group}
          items={fields}
          values={skills}
          onChange={(field, val) => updateNestedDraft('skills', field, val)}
        />
      ))}
    </div>
  );
};

const SupernaturalView = ({ draft, updateDraft }) => {
  const navigate = useNavigate();
  const disciplines = draft.disciplines || [];
  const rituals = draft.rituals || [];
  
  const handleAddDiscipline = (e) => {
    const name = e.target.value;
    if (name && !disciplines.find(d => d.name === name)) {
      const updated = [...disciplines, { name, dots: 1, powers: [] }];
      updateDraft('disciplines', updated);
    }
    e.target.value = "";
  };

  const updateDiscDots = (index, dots) => {
    const updated = [...disciplines];
    updated[index] = { ...updated[index], dots };
    updateDraft('disciplines', updated);
  };

  const removeDiscipline = (index) => {
    const updated = disciplines.filter((_, i) => i !== index);
    updateDraft('disciplines', updated);
  };

  const togglePower = (discIndex, powerName) => {
    const updated = [...disciplines];
    const powerList = updated[discIndex].powers || [];
    if (powerList.includes(powerName)) {
      updated[discIndex].powers = powerList.filter(p => p !== powerName);
    } else {
      updated[discIndex].powers = [...powerList, powerName];
    }
    updateDraft('disciplines', updated);
  };

  const toggleRitual = (name) => {
    if (rituals.includes(name)) {
      updateDraft('rituals', rituals.filter(r => r !== name));
    } else {
      updateDraft('rituals', [...rituals, name]);
    }
  };

  const bsRituals = v5data.disciplines.find(d => d.name === "Blood Sorcery")?.rituals || [];

  return (
    <div className="supernatural-view">
      <div className="view-section">
        <div className="view-section__header">
          <h3>Disciplines</h3>
          <select className="add-select" onChange={handleAddDiscipline}>
            <option value="">+ Add Discipline</option>
            {v5data.disciplines.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
          </select>
        </div>
        
        <div className="discipline-list">
          {disciplines.map((d, i) => {
            const data = v5data.disciplines.find(vd => vd.name === d.name);
            return (
              <div key={d.name} className="trait-card">
                <div className="trait-card__header">
                  <h4>{d.name}</h4>
                  <DotTracker value={d.dots} onChange={(val) => updateDiscDots(i, val)} />
                  <button className="remove-btn" onClick={() => removeDiscipline(i)}>&times;</button>
                </div>
                
                <div className="power-selector">
                  {data?.powers?.filter(p => p.level <= d.dots).map(p => (
                    <div key={p.name} className="power-item">
                      <label className="power-item__label">
                        <input 
                          type="checkbox" 
                          checked={d.powers?.includes(p.name)} 
                          onChange={() => togglePower(i, p.name)}
                        />
                        {p.name} (Lvl {p.level})
                      </label>
                      {d.powers?.includes(p.name) && (
                        <div className="power-summary">
                          <p>{p.summary}</p>
                          <small>{p.page}</small>
                          {p.dice_pool && (
                            <button 
                              className="roll-btn-small"
                              onClick={() => {
                                const poolParam = p.dice_pool.join(',');
                                navigate(`/dice?charId=${draft._id}&pool=${poolParam}&name=${p.name}`);
                              }}
                            >
                              Roll
                            </button>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="view-section" style={{marginTop: '40px'}}>
        <h3>Rituals</h3>
        {bsRituals.length > 0 ? (
          <div className="trait-card">
            <div className="power-selector">
              {bsRituals.map(r => (
                <div key={r.name} className="power-item">
                  <label className="power-item__label">
                    <input 
                      type="checkbox" 
                      checked={rituals.includes(r.name)} 
                      onChange={() => toggleRitual(r.name)}
                    />
                    {r.name} (Lvl {r.level})
                  </label>
                  {rituals.includes(r.name) && (
                    <div className="power-summary">
                      <p>{r.summary}</p>
                      <small>{r.page}</small>
                      {r.dice_pool && (
                        <button 
                          className="roll-btn-small"
                          onClick={() => {
                            const poolParam = r.dice_pool.join(',');
                            navigate(`/dice?charId=${draft._id}&pool=${poolParam}&name=${r.name}`);
                          }}
                        >
                          Roll
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="trait-summary" style={{opacity: 0.5}}>No rituals defined in database.</p>
        )}
      </div>
    </div>
  );
};

const BackgroundsView = ({ draft, updateDraft }) => {
  const advantages = draft.advantages || [];
  const flaws = draft.flaws || [];
  const loreSheets = draft.loreSheets || [];

  const handleAddTrait = (e) => {
    const val = e.target.value;
    if (val) {
      const [type, name] = val.split(':');
      if (type === "LoreSheet") {
        updateDraft('loreSheets', [...loreSheets, { name, dots: 1, specification: "" }]);
      } else if (type === "Flaw") {
        updateDraft('flaws', [...flaws, { name, dots: 1, specification: "" }]);
      } else {
        updateDraft('advantages', [...advantages, { name, type, dots: 1, specification: "" }]);
      }
    }
    e.target.value = "";
  };

  const updateTrait = (listName, index, field, value) => {
    const updated = [...draft[listName]];
    updated[index] = { ...updated[index], [field]: value };
    updateDraft(listName, updated);
  };

  const removeTrait = (listName, index) => {
    updateDraft(listName, draft[listName].filter((_, i) => i !== index));
  };

  return (
    <div className="backgrounds-view">
      <div className="view-section">
        <div className="view-section__header">
          <h3>Backgrounds & Merits</h3>
          <select className="add-select" onChange={handleAddTrait}>
            <option value="">+ Add Trait</option>
            <optgroup label="Backgrounds">
              {v5data.backgrounds.map(b => <option key={b.name} value={`Background:${b.name}`}>{b.name}</option>)}
            </optgroup>
            <optgroup label="Merits">
              {v5data.merits.map(m => <option key={m.name} value={`Merit:${m.name}`}>{m.name}</option>)}
            </optgroup>
            <optgroup label="Flaws">
              {v5data.flaws.map(f => <option key={f.name} value={`Flaw:${f.name}`}>{f.name}</option>)}
            </optgroup>
            <optgroup label="Lore Sheets">
              {v5data.loreSheets.map(l => <option key={l.name} value={`LoreSheet:${l.name}`}>{l.name}</option>)}
            </optgroup>
          </select>
        </div>

        <div className="trait-list">
          {/* Backgrounds / Merits */}
          {advantages.map((adv, i) => (
            <div key={`adv-${i}`} className="trait-card">
              <div className="trait-card__header">
                <h4>{adv.name} <small>({adv.type})</small></h4>
                <DotTracker value={adv.dots} onChange={(val) => updateTrait('advantages', i, 'dots', val)} />
                <button className="remove-btn" onClick={() => removeTrait('advantages', i)}>&times;</button>
              </div>
              <input 
                className="spec-input" 
                placeholder="Details..."
                value={adv.specification || ""}
                onChange={(e) => updateTrait('advantages', i, 'specification', e.target.value)}
              />
            </div>
          ))}

          {/* Flaws */}
          {flaws.map((flaw, i) => (
            <div key={`flaw-${i}`} className="trait-card trait-card_flaw">
              <div className="trait-card__header">
                <h4>{flaw.name} <small>(Flaw)</small></h4>
                <DotTracker value={flaw.dots} onChange={(val) => updateTrait('flaws', i, 'dots', val)} />
                <button className="remove-btn" onClick={() => removeTrait('flaws', i)}>&times;</button>
              </div>
              <input 
                className="spec-input" 
                placeholder="Details..."
                value={flaw.specification || ""}
                onChange={(e) => updateTrait('flaws', i, 'specification', e.target.value)}
              />
            </div>
          ))}

          {/* Lore Sheets */}
          {loreSheets.map((ls, i) => (
            <div key={`ls-${i}`} className="trait-card trait-card_lore">
              <div className="trait-card__header">
                <h4>{ls.name} <small>(Lore Sheet)</small></h4>
                <DotTracker value={ls.dots} onChange={(val) => updateTrait('loreSheets', i, 'dots', val)} />
                <button className="remove-btn" onClick={() => removeTrait('loreSheets', i)}>&times;</button>
              </div>
              <p className="trait-summary">{v5data.loreSheets.find(v => v.name === ls.name)?.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const VitalsBar = ({ draft, onJumpToCore }) => {
  const stamina = draft.attributes?.stamina || 1;
  const composure = draft.attributes?.composure || 1;
  const resolve = draft.attributes?.resolve || 1;

  const maxHealth = stamina + 3;
  const maxWillpower = composure + resolve;
  
  const healthDmg = (draft.superficialDamage || 0) + (draft.aggravatedDamage || 0);
  const wpDmg = (draft.superficialWillpowerDamage || 0) + (draft.aggravatedWillpowerDamage || 0);

  return (
    <div className="vitals-bar" onClick={onJumpToCore}>
      <div className="vitals-bar__item">
        <span className="vitals-bar__label">Hunger</span>
        <span className={`vitals-bar__value ${draft.hunger >= 4 ? 'vitals-bar__value_danger' : ''}`}>
          {draft.hunger}
        </span>
      </div>
      <div className="vitals-bar__item">
        <span className="vitals-bar__label">Health</span>
        <span className={`vitals-bar__value ${healthDmg >= maxHealth ? 'vitals-bar__value_danger' : ''}`}>
          {healthDmg}/{maxHealth}
        </span>
      </div>
      <div className="vitals-bar__item">
        <span className="vitals-bar__label">Willpower</span>
        <span className={`vitals-bar__value ${wpDmg >= maxWillpower ? 'vitals-bar__value_danger' : ''}`}>
          {wpDmg}/{maxWillpower}
        </span>
      </div>
    </div>
  );
};

const CharacterSheet = () => {
  const { id } = useParams();
  const { characters, updateCharacter } = useCharacters();
  
  const [activeTab, setActiveTab] = useState('core');
  const [draftState, setDraftState] = useState(null);
  const [initialState, setInitialState] = useState(null);
  const [hasChanges, setHasChanges] = useState(false);

  // ONLY initialize once
  useEffect(() => {
    if (!draftState) {
      const char = characters.find((c) => c._id === id);
      if (char) {
        setInitialState(char);
        setDraftState(JSON.parse(JSON.stringify(char)));
      }
    }
  }, [id, characters, draftState]);

  useEffect(() => {
    if (initialState && draftState) {
      const isDifferent = JSON.stringify(initialState) !== JSON.stringify(draftState);
      setHasChanges(isDifferent);
    }
  }, [draftState, initialState]);

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
    updateCharacter(id, draftState).then((updated) => {
      setInitialState(updated);
      setDraftState(JSON.parse(JSON.stringify(updated)));
      setHasChanges(false);
    }).catch(err => {
      console.error("Save failed:", err);
      alert("Failed to save changes.");
    });
  };

  if (!draftState) {
    return <div className="character-sheet">Loading character...</div>;
  }

  return (
    <div className="character-sheet">
      {hasChanges && (
        <div className="sticky-header">
          <button className="save-button" onClick={handleSave}>Save Changes</button>
        </div>
      )}
      
      <div className="tab-content" style={{ padding: '20px', minHeight: '60vh', paddingBottom: '120px' }}>
        {activeTab === 'core' && <CoreView draft={draftState} updateDraft={updateDraft} />}
        {activeTab === 'attributes' && <AttributesView draft={draftState} updateNestedDraft={updateNestedDraft} />}
        {activeTab === 'skills' && <SkillsView draft={draftState} updateNestedDraft={updateNestedDraft} />}
        {activeTab === 'supernatural' && <SupernaturalView draft={draftState} updateDraft={updateDraft} />}
        {activeTab === 'backgrounds' && <BackgroundsView draft={draftState} updateDraft={updateDraft} />}
      </div>

      <VitalsBar draft={draftState} onJumpToCore={() => setActiveTab('core')} />
      <SheetTabs activeTab={activeTab} onTabChange={setActiveTab} />
    </div>
  );
};

export default CharacterSheet;
