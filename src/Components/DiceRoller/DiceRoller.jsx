import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCharacters } from '../../contexts/CharacterContext';
import useRollHistory from '../../hooks/useRollHistory';
import DiceIcon from '../DiceIcon/DiceIcon';
import HistoryDrawer from '../HistoryDrawer/HistoryDrawer';
import * as api from '../../utils/api';
import './DiceRoller.css';

const PRESETS = [
  { label: 'Str + Brawl', attr: 'strength', skill: 'brawl' },
  { label: 'Dex + Firearms', attr: 'dexterity', skill: 'firearms' },
  { label: 'Dex + Stealth', attr: 'stealth', skill: 'stealth' },
  { label: 'Wits + Awareness', attr: 'wits', skill: 'awareness' },
  { label: 'Res + Composure', attr: 'resolve', skill: 'composure' },
];

const DiceRoller = () => {
  const [searchParams] = useSearchParams();
  const { characters } = useCharacters();
  const charId = searchParams.get('charId');
  const { history, addRoll, deleteRoll, clearHistory } = useRollHistory();

  const [activeCharacter, setActiveCharacter] = useState(null);
  const [totalPool, setTotalPool] = useState(5);
  const [hungerDice, setHungerDice] = useState(1);
  const [difficulty, setDifficulty] = useState(1);
  const [rollState, setRollState] = useState('idle');
  const [result, setResult] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  useEffect(() => {
    if (charId && characters.length > 0) {
      const char = characters.find(c => c._id === charId);
      if (char) {
        setActiveCharacter(char);
        setHungerDice(char.hunger || 1);
      }
    }
  }, [charId, characters]);

  const handleRoll = async () => {
    setRollState('rolling');
    setResult(null);
    const animationPromise = new Promise(resolve => setTimeout(resolve, 800));
    try {
      const apiResponse = await api.rollDice(totalPool, hungerDice, difficulty);
      await animationPromise;
      
      const mappedResult = {
        totalSuccesses: apiResponse.totalSuccesses ?? 0,
        regularResults: apiResponse.regularResults ?? [],
        hungerResults: apiResponse.hungerResults ?? [],
        messyCritical: apiResponse.messyCritical ?? false,
        bestialFailure: apiResponse.bestialFailure ?? false,
        criticalSuccesses: apiResponse.criticalSuccesses ?? 0,
        success: (apiResponse.totalSuccesses ?? 0) >= (parseInt(difficulty) || 1)
      };
      
      setResult(mappedResult);
      setRollState('resolved');

      // Add to history
      addRoll({
        charName: activeCharacter?.name || null,
        pool: totalPool,
        difficulty: difficulty,
        result: mappedResult
      });
    } catch (err) {
      console.error(err);
      setRollState('error');
    }
  };

  const applyPreset = (preset) => {
    const attrValue = activeCharacter?.attributes?.[preset.attr] || 1;
    const skillValue = activeCharacter?.skills?.[preset.skill] || 0;
    setTotalPool(attrValue + skillValue);
  };

  const renderStatus = () => {
    if (!result) return null;
    if (result.messyCritical) return <span className="dice-roller__status dice-roller__status_messy">MESSY CRITICAL</span>;
    if (result.bestialFailure) return <span className="dice-roller__status dice-roller__status_bestial">BESTIAL FAILURE</span>;
    if (result.criticalSuccesses > 0) return <span className="dice-roller__status dice-roller__status_crit">CRITICAL SUCCESS</span>;
    if (result.success) return <span className="dice-roller__status dice-roller__status_success">SUCCESS</span>;
    return <span className="dice-roller__status dice-roller__status_failure">FAILURE</span>;
  };

  return (
    <div className="dice-roller">
      <div className="dice-roller__header-actions">
        <button 
          className="dice-roller__history-toggle" 
          onClick={() => setIsHistoryOpen(true)}
          title="Roll History"
        >
          🕒 History {history.length > 0 && `(${history.length})`}
        </button>
      </div>

      <div className="dice-roller__tray">
        {rollState === 'rolling' && <div className="dice-roller__rolling-msg">Rolling...</div>}
        {rollState === 'error' && <div className="dice-roller__error-msg">Dice roll service unavailable</div>}
        
        {rollState === 'resolved' && result && (
          <>
            <div className="dice-roller__outcome">
              <div className="dice-roller__total">Total Successes: {result.totalSuccesses}</div>
              {renderStatus()}
            </div>
            <div className="dice-roller__dice-grid">
              <div className="dice-roller__dice-row">
                {(result.regularResults || []).map((val, i) => (
                  <DiceIcon key={`std-${i}`} value={val} isHunger={false} />
                ))}
              </div>
              <div className="dice-roller__dice-row">
                {(result.hungerResults || []).map((val, i) => (
                  <DiceIcon key={`hng-${i}`} value={val} isHunger={true} />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      <div className="dice-roller__controls">
        {activeCharacter && (
          <div className="dice-roller__char-info">
            Rolling for: <strong>{activeCharacter.name}</strong>
          </div>
        )}

        <div className="dice-roller__presets">
          {PRESETS.map(p => (
            <button 
              key={p.label} 
              className="dice-roller__preset-btn" 
              onClick={() => applyPreset(p)}
              disabled={!activeCharacter}
              title={!activeCharacter ? "Select a character first" : ""}
            >
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

      <HistoryDrawer 
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onDeleteRoll={deleteRoll}
        onClearHistory={clearHistory}
      />
    </div>
  );
};

export default DiceRoller;
