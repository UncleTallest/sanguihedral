import React from 'react';
import './DiceIcon.css';

const DiceIcon = ({ value, isHunger }) => {
  let content = '·';
  let type = 'failure';

  if (isHunger && value === 1) {
    content = '💀';
    type = 'bestial';
  } else if (value === 10) {
    content = '⭐';
    type = 'critical';
  } else if (value >= 6) {
    content = '🩸';
    type = 'success';
  }

  return (
    <div 
      className={`dice-icon dice-icon_${type} ${isHunger ? 'dice-icon_hunger' : ''}`}
      role="img"
      aria-label={`${isHunger ? 'Hunger' : 'Standard'} die: ${value}`}
    >
      {content}
    </div>
  );
};

export default DiceIcon;
