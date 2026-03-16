import React from "react";
import "./HistoryDrawer.css";

const HistoryDrawer = ({ isOpen, onClose, history, onDeleteRoll, onClearHistory }) => {
  return (
    <>
      {isOpen && <div className="history-drawer__overlay" onClick={onClose} />}
      <div className={`history-drawer ${isOpen ? "history-drawer_open" : ""}`}>
        <div className="history-drawer__header">
          <h2>Roll History</h2>
          <button className="history-drawer__close" onClick={onClose}>&times;</button>
        </div>

        <div className="history-drawer__content">
          {history.length === 0 ? (
            <p className="history-drawer__empty">No recent rolls.</p>
          ) : (
            <div className="history-drawer__list">
              {history.map((roll) => (
                <div key={roll.id} className="history-drawer__item">
                  <div className="history-drawer__item-header">
                    <span className="history-drawer__char-name">
                      {roll.charName || "Anonymous Roll"}
                    </span>
                    <span className="history-drawer__time">
                      {new Date(roll.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                  
                  <div className="history-drawer__item-body">
                    <div className="history-drawer__result">
                      <span className="history-drawer__total">{roll.result.totalSuccesses}</span>
                      <span className="history-drawer__success-label">Successes</span>
                    </div>
                    
                    <div className="history-drawer__status-tags">
                      {roll.result.messyCritical && <span className="tag tag_messy">MESSY CRIT</span>}
                      {roll.result.bestialFailure && <span className="tag tag_bestial">BESTIAL FAIL</span>}
                      {roll.result.criticalSuccesses > 0 && !roll.result.messyCritical && <span className="tag tag_crit">CRIT</span>}
                    </div>
                  </div>

                  <div className="history-drawer__item-footer">
                    <span className="history-drawer__pool-info">
                      Pool: {roll.pool} | Diff: {roll.difficulty}
                    </span>
                    <button 
                      className="history-drawer__delete-item" 
                      onClick={() => onDeleteRoll(roll.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {history.length > 0 && (
          <div className="history-drawer__footer">
            <button className="history-drawer__clear" onClick={onClearHistory}>
              Clear All History
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default HistoryDrawer;
