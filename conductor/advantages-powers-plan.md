# Advantages & Powers Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement Disciplines, Merits, Flaws, Backgrounds, and Lore Sheets with stat reorganization and smart rolling.

**Architecture:** 
1.  **Data Layer:** `v5data.json` repository for trait metadata.
2.  **Stat Grouping:** UI reorganization of Attributes/Skills into Physical/Social/Mental.
3.  **New Tabs:** "Supernatural" and "Advantages" tabs in `CharacterSheet`.
4.  **Builder Components:** Generic "Pick and Tag" forms for adding traits.

**Tech Stack:** React, Vitest.

---

## Chunk 1: Stat Reorganization

### Task 1: Reorganize Attributes and Skills

**Files:**
- Modify: `FRONTEND_sanguihedral/src/Components/CharacterSheet/CharacterSheet.jsx`

- [ ] **Step 1: Group stats in AttributesView**
Update the rendering logic to display attributes in three distinct sections: Physical, Social, Mental.

- [ ] **Step 2: Group stats in SkillsView**
Update the rendering logic to group skills similarly.

- [ ] **Step 3: Commit**
`git add . && git commit -m "feat: reorganize stats into Physical, Social, and Mental groups"`

---

## Chunk 2: Data Repository & Schema

### Task 2: Update Backend Schema & Create Frontend Repo

**Files:**
- Modify: `BACKEND_sanguihedral/models/character.js`
- Create: `FRONTEND_sanguihedral/src/utils/v5data.json`

- [ ] **Step 1: Update Character model**
Add `disciplines`, `advantages`, `flaws`, `loreSheets`, and `rituals` arrays to the Mongoose schema.

- [ ] **Step 2: Create v5data.json**
Add a core set of Disciplines and common powers (summaries + page refs) to the new repository.

- [ ] **Step 3: Commit**
`git add . && git commit -m "feat: update backend schema and initialize v5 data repository"`

---

## Chunk 3: The New Tabs

### Task 3: Implement Supernatural Tab (Disciplines & Rituals)

**Files:**
- Modify: `FRONTEND_sanguihedral/src/Components/CharacterSheet/CharacterSheet.jsx`
- Create: `FRONTEND_sanguihedral/src/Components/PowerPicker/PowerPicker.jsx`

- [ ] **Step 1: Add Supernatural Tab**
Create the tab and implement the Discipline dot-trackers.

- [ ] **Step 2: Implement Power selection**
Add the ability to select powers under each discipline and display their summaries.

- [ ] **Step 3: Add collapsible Rituals section**
Implement the specific UI for Rituals.

- [ ] **Step 4: Commit**
`git add . && git commit -m "feat: implement Supernatural tab with Disciplines and Rituals"`

---

## Chunk 4: Advantages & Smart Rolling

### Task 4: Implement Advantages Tab & Smart Roller

**Files:**
- Modify: `FRONTEND_sanguihedral/src/Components/CharacterSheet/CharacterSheet.jsx`
- Modify: `FRONTEND_sanguihedral/src/Components/DiceRoller/DiceRoller.jsx`

- [ ] **Step 1: Add Advantages Tab**
Implement the "Pick and Tag" UI for Merits, Flaws, and Backgrounds.

- [ ] **Step 2: Add Lore Sheets section**
Implement Lore Sheet tracking.

- [ ] **Step 3: Implement Smart Roll button**
Add the "Roll" icon next to powers/advantages that links to the Dice Roller with pre-filled stats.

- [ ] **Step 4: Commit**
`git add . && git commit -m "feat: implement Advantages tab and Smart Rolling integration"`
