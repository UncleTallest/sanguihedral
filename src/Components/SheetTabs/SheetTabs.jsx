import React from 'react';
import './SheetTabs.css';

const TABS = [
  { id: 'core', label: 'Core' },
  { id: 'attributes', label: 'Attributes' },
  { id: 'skills', label: 'Skills' },
  { id: 'supernatural', label: 'Supernatural' },
  { id: 'backgrounds', label: 'Backgrounds' },
];

const SheetTabs = ({ activeTab, onTabChange }) => {
  return (
    <nav className="sheet-tabs">
      <div className="sheet-tabs__scroll-container">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            className={`sheet-tab ${activeTab === tab.id ? 'sheet-tab_active' : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </nav>
  );
};

export default SheetTabs;
