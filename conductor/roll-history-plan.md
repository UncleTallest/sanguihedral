# Roll History Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement a persistent Roll History Drawer with a 25-roll limit.

**Architecture:** 
1.  **useRollHistory Hook:** Custom hook for managing state and `localStorage`.
2.  **HistoryDrawer Component:** UI for the slide-out panel.
3.  **Integration:** Connect DiceRoller to the history system.

**Tech Stack:** React, Vitest.

---

## Chunk 1: History Logic

### Task 1: Create useRollHistory Hook

**Files:**
- Create: `FRONTEND_sanguihedral/src/hooks/useRollHistory.js`
- Create: `FRONTEND_sanguihedral/src/hooks/useRollHistory.test.js`

- [ ] **Step 1: Write the failing test**
Verify adding rolls, the 25-roll limit, and persistence.

- [ ] **Step 2: Run test to verify it fails**
Run: `cd FRONTEND_sanguihedral && npm run test run`

- [ ] **Step 3: Write minimal implementation**
Implement the hook using `useState`, `useEffect`, and `localStorage`.

- [ ] **Step 4: Run test to verify it passes**
Run: `cd FRONTEND_sanguihedral && npm run test run`

- [ ] **Step 5: Commit**
`git add . && git commit -m "feat: add useRollHistory hook with 25-roll limit"`

---

## Chunk 2: UI Component

### Task 2: Create HistoryDrawer Component

**Files:**
- Create: `FRONTEND_sanguihedral/src/Components/HistoryDrawer/HistoryDrawer.jsx`
- Create: `FRONTEND_sanguihedral/src/Components/HistoryDrawer/HistoryDrawer.css`

- [ ] **Step 1: Implement the slide-out UI**
Design the drawer with a list of roll entries, "Delete" buttons, and "Clear All".

- [ ] **Step 2: Add styles**
Implement the themed, semi-opaque aesthetic.

- [ ] **Step 3: Commit**
`git add . && git commit -m "feat: add themed HistoryDrawer component"`

---

## Chunk 3: Integration

### Task 3: Connect DiceRoller to History

**Files:**
- Modify: `FRONTEND_sanguihedral/src/Components/DiceRoller/DiceRoller.jsx`

- [ ] **Step 1: Integrate addRoll**
Call `addRoll` from the hook inside `handleRoll`'s success path.

- [ ] **Step 2: Add Drawer trigger**
Add the "History" icon button to the DiceRoller header.

- [ ] **Step 3: Commit**
`git add . && git commit -m "feat: integrate roll history into DiceRoller"`
