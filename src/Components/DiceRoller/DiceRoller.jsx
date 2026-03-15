import React, { useState } from 'react';
import DiceIcon from '../DiceIcon/DiceIcon';
import * as api from '../../utils/api';
import './DiceRoller.css';

const PRESETS = [
  { label: 'Str + Brawl', attr: 'strength', skill: 'brawl' },
  { label: 'Dex + Firearms', attr: 'dexterity', skill: 'firearms' },
  { label: 'Dex + Stealth', attr: 'stealth', skill: 'stealth' },
  { label: 'Wits + Awareness', attr: 'wits', skill: 'awareness' },
  { label: 'Res + Composure', attr: 'resolve', skill: 'composure' },
];

const DiceRoller = ({ character = {}, initialHunger = 1 }) => {
  const [totalPool, setTotalPool] = useState(5);
  const [hungerDice, setHungerDice] = useState(character.hunger || initialHunger);
  const [difficulty, setDifficulty] = useState(1);
  const [rollState, setRollState] = useState('idle');
  const [result, setResult] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleRoll = async () => {
    setRollState('rolling');
    setResult(null);
    const animationPromise = new Promise(resolve => setTimeout(resolve, 800));
    try {
      const [apiResponse] = await Promise.all([
        api.rollDice(totalPool, hungerDice, difficulty),
        animationPromise
      ]);
      setResult(apiResponse);
      setRollState('resolved');
    } catch (err) {
      console.error(err);
      setRollState('error');
    }
  };

  const applyPreset = (preset) => {
    const attrValue = character.attributes?.[preset.attr] || 1;
    const skillValue = character.skills?.[preset.skill] || 1;
    setTotalPool(attrValue + skillValue);
  };

  const renderStatus = () => {
    if (!result) return null;
    if (result.messy_critical) return <span className="dice-roller__status dice-roller__status_messy">MESSY CRITICAL</span>;
    if (result.bestial_failure) return <span className="dice-roller__status dice-roller__status_bestial">BESTIAL FAILURE</span>;
    if (result.critical_success) return <span className="dice-roller__status dice-roller__status_crit">CRITICAL SUCCESS</span>;
    if (result.success) return <span className="dice-roller__status dice-roller__status_success">SUCCESS</span>;
    return <span className="dice-roller__status dice-roller__status_failure">FAILURE</span>;
  };

  return (
    <div className="dice-roller">
      <div className="dice-roller__tray">
        {rollState === 'rolling' && <div className="dice-roller__rolling-msg">Rolling...</div>}
        {rollState === 'resolved' && result && (
          <>
            <div className="dice-roller__outcome">
              <div className="dice-roller__total">Total Successes: {result.total_successes}</div>
              {renderStatus()}
            </div>
            <div className="dice-roller__dice-grid">
              <div className="dice-roller__dice-row">
                {result.dice_results.map((val, i) => (
                  <DiceIcon key={`std-${i}`} value={val} isHunger={false} />
                ))}
              </div>
              <div className="dice-roller__dice-row">
                {result.hunger_results.map((val, i) => (
                  <DiceIcon key={`hng-${i}`} value={val} isHunger={true} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="dice-roller__controls">
        <div className="dice-roller__presets">
          {PRESETS.map(p => (
            <button key={p.label} className="dice-roller__preset-btn" onClick={() => applyPreset(p)}>
              {p.label}
            </button>
          ))}
          <button 
            className="dice-roller__preset-btn dice-roller__preset-btn_alt"
            onClick={() => setShowAdvanced(!showAdvanced)}
          >
            {showAdvanced ? 'Simple Mode' : 'Advanced Mode'}
          </button>
        </div>

        {showAdvanced && (
          <div className="dice-roller__advanced">
            <div className="dice-roller__input-group">
              <label>Total Pool</label>
              <div className="dice-roller__stepper">
                <button onClick={() => setTotalPool(Math.max(1, totalPool - 1))}>-</button>
                <span>{totalPool}</span>
                <button onClick={() => setTotalPool(totalPool + 1)}>+</button>
              </div>
            </div>
          </div>
        )}

        <div className="dice-roller__input-group">
          <label>Hunger</label>
          <div className="dice-roller__stepper">
            <button onClick={() => setHungerDice(Math.max(0, hungerDice - 1))}>-</button>
            <span>{hungerDice}</span>
            <button onClick={() => setHungerDice(Math.min(5, hungerDice + 1))}>+</button>
          </div>
        </div>

        <div className="dice-roller__input-group">
          <label>Difficulty</label>
          <div className="dice-roller__stepper">
            <button onClick={() => setDifficulty(Math.max(0, difficulty - 1))}>-</button>
            <span>{difficulty}</span>
            <button onClick={() => setDifficulty(difficulty + 1)}>+</button>
          </div>
        </div>

        <button 
          className="dice-roller__roll-button" 
          onClick={handleRoll}
          disabled={rollState === 'rolling'}
        >
          ROLL
        </button>
      </div>
    </div>
  );
};

export default DiceRoller;
