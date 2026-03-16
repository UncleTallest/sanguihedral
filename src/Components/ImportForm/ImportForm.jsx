import React, { useState } from 'react';
import './ImportForm.css';

const ImportForm = ({ onImport, onCancel, isLoading }) => {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url) {
      onImport(url);
    }
  };

  return (
    <div className="import-form">
      <h2 className="import-form__title">Import from Google Sheet</h2>
      <p className="import-form__description">
        Paste the link to your Google Sheet character sheet. 
        Ensure it is <strong>Published to the Web</strong> as <strong>CSV</strong>.
      </p>
      
      <form onSubmit={handleSubmit} className="import-form__form">
        <input
          type="url"
          className="import-form__input"
          placeholder="https://docs.google.com/spreadsheets/d/..."
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        
        <div className="import-form__actions">
          <button 
            type="button" 
            className="import-form__btn import-form__btn_secondary"
            onClick={onCancel}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="import-form__btn import-form__btn_primary"
            disabled={isLoading || !url}
          >
            {isLoading ? 'Parsing...' : 'Import Character'}
          </button>
        </div>
      </form>

      <div className="import-form__instructions">
        <h3>How to get your link:</h3>
        <ol>
          <li>Open your Google Sheet.</li>
          <li>Go to <code>File &gt; Share &gt; Publish to web</code>.</li>
          <li>Choose <code>Link</code>, select your character sheet tab.</li>
          <li>Change <code>Web Page</code> to <code>Comma-separated values (.csv)</code>.</li>
          <li>Click <code>Publish</code>, then copy the generated link.</li>
        </ol>
      </div>
    </div>
  );
};

export default ImportForm;
