import React from 'react';
import './Help.css';

const Help = () => {
  return (
    <div className="help-page">
      <header className="help-header">
        <h1>Help & Troubleshooting</h1>
        <p className="subtitle">Mastering the Sanguihedral Experience</p>
      </header>

      <section className="help-section">
        <h2>📱 How to Install (Full Screen Mode)</h2>
        <p>Sanguihedral is a Progressive Web App (PWA). You can "install" it on your phone to remove the browser bar and use it like a native app.</p>
        
        <div className="install-grid">
          <div className="install-card">
            <h3>Android (Chrome)</h3>
            <ol>
              <li>Open <strong>Sanguihedral</strong> in Chrome.</li>
              <li>Tap the <strong>three dots (⋮)</strong> in the top right.</li>
              <li>Select <strong>"Add to Home screen"</strong>.</li>
              <li>Launch from your home screen for a full-screen experience.</li>
            </ol>
          </div>
          
          <div className="install-card">
            <h3>iOS / iPhone (Safari)</h3>
            <ol>
              <li>Open <strong>Sanguihedral</strong> in Safari.</li>
              <li>Tap the <strong>Share</strong> button (square with an up arrow).</li>
              <li>Scroll down and tap <strong>"Add to Home Screen"</strong>.</li>
              <li>Launch from your home screen to hide Safari's navigation bar.</li>
            </ol>
          </div>
        </div>
      </section>

      <section className="help-section">
        <h2>🎲 Dice Roller FAQ</h2>
        <div className="faq-item">
          <h3>How do I combine stats?</h3>
          <p>On your character sheet, click <strong>"Roll Selection"</strong> at the top. Tap any Attribute and any Skill (or Discipline) to build your pool. Hit the red button at the bottom to roll!</p>
        </div>
        <div className="faq-item">
          <h3>What do the colors mean?</h3>
          <p>
            <span style={{color: 'var(--color-accent)'}}>●</span> <strong>Gold:</strong> Normal successes.<br />
            <span style={{color: 'var(--color-blood)'}}>●</span> <strong>Red:</strong> Hunger dice successes or failures.
          </p>
        </div>
        <div className="faq-item">
          <h3>Can I reroll?</h3>
          <p>Once a roll is resolved, the button changes to <strong>"CLOSE"</strong> to prevent accidental rerolls. If you need to roll again, close the window and re-select your stats.</p>
        </div>
      </section>

      <section className="help-section">
        <h2>🛠 Troubleshooting</h2>
        <div className="faq-item">
          <h3>The "Add to Home Screen" button isn't appearing.</h3>
          <p>Make sure you are using <strong>Chrome</strong> on Android or <strong>Safari</strong> on iOS. Third-party browsers (like the Facebook or Reddit in-app browsers) do not support PWA installation.</p>
        </div>
        <div className="faq-item">
          <h3>I'm seeing browser chrome even after installing.</h3>
          <p>If we recently pushed an update, your phone might be using a cached manifest. Try deleting the home screen shortcut, clearing your browser cache, and adding it again.</p>
        </div>
        <div className="faq-item">
          <h3>My character data didn't save.</h3>
          <p>Ensure you hit the <strong>"Save Changes"</strong> button that appears at the top of the sheet when you make edits. The sheet uses a "Draft" mode so your changes aren't permanent until you commit them.</p>
        </div>
      </section>

      <footer className="help-footer">
        <p>Still having trouble? Contact the developer via <a href="https://ko-fi.com/uncletallest" target="_blank" rel="noreferrer">Ko-fi</a>.</p>
      </footer>
    </div>
  );
};

export default Help;
