import React from 'react';
import DiceIcon from '../DiceIcon/DiceIcon';
import './HistoryDrawer.css';

const HistoryDrawer = ({ isOpen, onClose, history, onDeleteRoll, onClearHistory }) => {
  return (
    <div className={`history-drawer ${isOpen ? 'history-drawer_open' : ''}`}>
      <div className="history-drawer__header">
        <h2>Roll History</h2>
        <button className="history-drawer__close btn_icon-only" onClick={onClose} title="Close">&times;</button>
      </div>

      <div className="history-drawer__content">
        {history.length === 0 ? (
          <p className="history-drawer__empty">No rolls yet this session.</p>
        ) : (
          <div className="history-drawer__list">
            {history.map((roll) => (
              <div key={roll.id} className="history-item">
                <div className="history-item__header">
                  <span className="history-item__time">
                    {new Date(roll.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  <button 
                    className="history-item__delete btn_icon-only" 
                    onClick={() => onDeleteRoll(roll.id)}
                    title="Delete entry"
                  >
                    &times;
                  </button>
                </div>
                
                <div className="history-item__info">
                  {roll.charName && <strong className="history-item__char">{roll.charName}: </strong>}
                  {roll.powerName && <span className="history-item__power">{roll.powerName} </span>}
                  <span className="history-item__pool">({roll.pool} dice vs Diff {roll.difficulty})</span>
                </div>

                <div className="history-item__result">
                  <div className="history-item__successes">
                    Successes: <strong>{roll.result.totalSuccesses}</strong>
                  </div>
                  <div className="history-item__dice">
                    {roll.result.regularResults.map((v, i) => (
                      <DiceIcon key={`reg-${i}`} value={v} size="small" />
                    ))}
                    {roll.result.hungerResults.map((v, i) => (
                      <DiceIcon key={`hng-${i}`} value={v} isHunger size="small" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {history.length > 0 && (
        <div className="history-drawer__footer">
          <button className="history-drawer__clear" onClick={onClearHistory}>
            Clear History
          </button>
        </div>
      )}
    </div>
  );
};

export default HistoryDrawer;
