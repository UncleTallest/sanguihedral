import React from 'react';
import './DamageTracker.css';

const DamageTracker = ({ superficial, aggravated, max, onChange }) => {
  const handleClick = (index) => {
    // Current box state
    let state = 'empty';
    if (index < aggravated) {
      state = 'aggravated';
    } else if (index < aggravated + superficial) {
      state = 'superficial';
    }

    let newAggravated = aggravated;
    let newSuperficial = superficial;

    if (state === 'empty') {
      // Empty -> Superficial
      // Overflow logic: if no empty space, convert a superficial to aggravated
      if (aggravated + superficial >= max) {
        if (superficial > 0) {
          newSuperficial -= 1;
          newAggravated += 1;
        }
      } else {
        newSuperficial += 1;
      }
    } else if (state === 'superficial') {
      // Superficial -> Aggravated
      newSuperficial -= 1;
      newAggravated += 1;
    } else if (state === 'aggravated') {
      // Aggravated -> Empty
      newAggravated -= 1;
    }

    onChange({ superficial: newSuperficial, aggravated: newAggravated });
  };

  const renderBoxes = () => {
    const boxes = [];
    for (let i = 0; i < max; i++) {
      let content = "";
      let className = "damage-box";
      
      if (i < aggravated) {
        content = "X";
        className += " damage-box_aggravated";
      } else if (i < aggravated + superficial) {
        content = "/";
        className += " damage-box_superficial";
      } else {
        className += " damage-box_empty";
      }

      boxes.push(
        <button
          key={i}
          type="button"
          className={className}
          onClick={() => handleClick(i)}
          aria-label={`Damage box ${i + 1}: ${content || "Empty"}`}
        >
          {content}
        </button>
      );
    }
    return boxes;
  };

  return (
    <div className="damage-tracker">
      {renderBoxes()}
      {aggravated + superficial >= max && (
        <span className="damage-status damage-status_impaired">IMPAIRED</span>
      )}
    </div>
  );
};

export default DamageTracker;
