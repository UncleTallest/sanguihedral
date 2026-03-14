import React from 'react';
import './DotTracker.css';

const DotTracker = ({ value, max = 5, onChange }) => {
  const handleClick = (index) => {
    const newValue = index + 1;
    // If clicking the first dot and it's currently the only one filled, clear it
    if (newValue === 1 && value === 1) {
      onChange(0);
    } else {
      onChange(newValue);
    }
  };

  return (
    <div className="dot-tracker">
      {Array.from({ length: max }).map((_, index) => (
        <button
          key={index}
          type="button"
          className={`dot ${index < value ? 'dot_filled' : 'dot_empty'}`}
          onClick={() => handleClick(index)}
          aria-label={`Set to ${index + 1}`}
        />
      ))}
    </div>
  );
};

export default DotTracker;
