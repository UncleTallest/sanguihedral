import React from 'react';
import './SheetTabs.css';

const TABS = [
  { id: 'core', label: 'Core' },
  { id: 'attributes', label: 'Attributes' },
  { id: 'skills', label: 'Skills' },
  { id: 'supernatural', label: 'Supernatural' },
  { id: 'advantages', label: 'Advantages' },
  { id: 'health', label: 'Health' },
];

const SheetTabs = ({ activeTab, onTabChange }) => {
  return (
    <nav className="sheet-tabs">
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
    </nav>
  );
};

export default SheetTabs;
