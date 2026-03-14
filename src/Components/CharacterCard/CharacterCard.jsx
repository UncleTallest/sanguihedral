import React from 'react';
import './CharacterCard.css';

const CharacterCard = ({ character, onClick }) => {
  const {
    name,
    clan,
    sect,
    hunger,
    attributes = {},
    superficialDamage = 0,
    aggravatedDamage = 0,
    superficialWillpowerDamage = 0,
    aggravatedWillpowerDamage = 0,
  } = character;

  const stamina = attributes.stamina || 1;
  const composure = attributes.composure || 1;
  const resolve = attributes.resolve || 1;

  const maxHealth = stamina + 3;
  const maxWillpower = composure + resolve;

  const totalHealthDamage = superficialDamage + aggravatedDamage;
  const totalWillpowerDamage = superficialWillpowerDamage + aggravatedWillpowerDamage;

  return (
    <div className="character-card" onClick={onClick}>
      <div className="character-card__header">
        <h2 className="character-card__name">{name}</h2>
        <p className="character-card__identity">
          {clan} | {sect}
        </p>
      </div>

      <div className="character-card__stats">
        <div className="character-card__stat">
          <span className="character-card__stat-label">Health</span>
          <div className="character-card__bar-container">
            <div 
              className="character-card__bar character-card__bar_health" 
              style={{ width: `${(totalHealthDamage / maxHealth) * 100}%` }}
            />
          </div>
          <span className="character-card__stat-value">{totalHealthDamage}/{maxHealth}</span>
        </div>

        <div className="character-card__stat">
          <span className="character-card__stat-label">Willpower</span>
          <div className="character-card__bar-container">
            <div 
              className="character-card__bar character-card__bar_willpower" 
              style={{ width: `${(totalWillpowerDamage / maxWillpower) * 100}%` }}
            />
          </div>
          <span className="character-card__stat-value">{totalWillpowerDamage}/{maxWillpower}</span>
        </div>

        <div className="character-card__stat">
          <span className="character-card__stat-label">Hunger</span>
          <div className="character-card__hunger-dots">
            {Array.from({ length: 5 }).map((_, i) => (
              <div 
                key={i} 
                className={`character-card__hunger-dot ${i < hunger ? 'character-card__hunger-dot_filled' : ''}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterCard;
