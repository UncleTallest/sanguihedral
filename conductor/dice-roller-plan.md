# Dice Roller Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a themed V5 Dice Roller with preset pools, hunger dice replacement, rolling animations, and dramatic outcome reveals.

**Architecture:** 
1.  **DiceTray Component:** Displays individual dice results with specialized icons for standard vs hunger dice.
2.  **PoolSelector Component:** Handles presets and custom attribute/skill combinations.
3.  **DiceRoller Container:** Orchestrates state, handles API calls, and manages the "Dramatic Reveal" animation.

**Tech Stack:** React, Vitest.

---

## Chunk 1: Dice Visuals

### Task 1: Create the DiceIcon Component

**Files:**
- Create: `FRONTEND_sanguihedral/src/Components/DiceIcon/DiceIcon.jsx`
- Create: `FRONTEND_sanguihedral/src/Components/DiceIcon/DiceIcon.css`
- Create: `FRONTEND_sanguihedral/src/Components/DiceIcon/DiceIcon.test.jsx`

- [ ] **Step 1: Write the failing test**
Create `DiceIcon.test.jsx` to test rendering of standard vs hunger dice and different outcomes (success, failure, bestial, crit).

- [ ] **Step 2: Run test to verify it fails**
Run: `cd FRONTEND_sanguihedral && npm run test run`

- [ ] **Step 3: Write minimal implementation**
Implement `DiceIcon` using CSS shapes/colors or emojis for now (e.g., 💀 for bestial failure, 🩸 for success).

- [ ] **Step 4: Run test to verify it passes**
Run: `cd FRONTEND_sanguihedral && npm run test run`

- [ ] **Step 5: Commit**
`git add . && git commit -m "feat: add DiceIcon component"`

---

## Chunk 2: Roller Logic & API

### Task 2: Create the DiceRoller Container

**Files:**
- Create: `FRONTEND_sanguihedral/src/Components/DiceRoller/DiceRoller.jsx`
- Create: `FRONTEND_sanguihedral/src/Components/DiceRoller/DiceRoller.css`
- Create: `FRONTEND_sanguihedral/src/Components/DiceRoller/DiceRoller.test.jsx`

- [ ] **Step 1: Write the failing test**
Create `DiceRoller.test.jsx` testing state changes when the roll button is clicked and API response handling.

- [ ] **Step 2: Run test to verify it fails**
Run: `cd FRONTEND_sanguihedral && npm run test run`

- [ ] **Step 3: Write minimal implementation**
Implement `DiceRoller` container. Use `api.rollDice` from `utils/api.js`. Implement a basic "rolling" timer before showing the result.

- [ ] **Step 4: Run test to verify it passes**
Run: `cd FRONTEND_sanguihedral && npm run test run`

- [ ] **Step 5: Commit**
`git add . && git commit -m "feat: add DiceRoller logic and API integration"`

---

## Chunk 3: Presets & Advanced Mode

### Task 3: Implement Pool Selection UI

**Files:**
- Modify: `FRONTEND_sanguihedral/src/Components/DiceRoller/DiceRoller.jsx`

- [ ] **Step 1: Write the failing test**
Update `DiceRoller.test.jsx` to verify preset buttons update the dice pool correctly.

- [ ] **Step 2: Run test to verify it fails**
Run: `cd FRONTEND_sanguihedral && npm run test run`

- [ ] **Step 3: Implement Presets and Advanced toggles**
Add a list of standard V5 presets. Add toggles for custom Attribute + Skill selection.

- [ ] **Step 4: Run test to verify it passes**
Run: `cd FRONTEND_sanguihedral && npm run test run`

- [ ] **Step 5: Commit**
`git add . && git commit -m "feat: add pool presets and custom selectors to DiceRoller"`
