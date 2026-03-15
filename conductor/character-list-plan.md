# Character List Dashboard Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-responsive Character List Dashboard with tiled blood-spattered background and informative character cards.

**Architecture:** 
1.  **Dashboard Component:** Main container that fetches character data and manages the grid layout.
2.  **CharacterCard Component:** Informative card displaying vital stats at a glance.
3.  **CharacterMenu:** Context menu for actions (View, Roll, Delete).

**Tech Stack:** React, React Router, Vitest.

---

## Chunk 1: UI Foundation & Background

### Task 1: Create Dashboard Component with Themed Background

**Files:**
- Create: `FRONTEND_sanguihedral/src/Components/Dashboard/Dashboard.jsx`
- Create: `FRONTEND_sanguihedral/src/Components/Dashboard/Dashboard.css`
- Create: `FRONTEND_sanguihedral/src/Components/Dashboard/Dashboard.test.jsx`

- [ ] **Step 1: Write the failing test**
Create `Dashboard.test.jsx` to verify it renders the "My Characters" header and a "New Character" button.

- [ ] **Step 2: Run test to verify it fails**
Run: `cd FRONTEND_sanguihedral && npm test`

- [ ] **Step 3: Write minimal implementation**
Implement `Dashboard.jsx` with basic structure and `Dashboard.css` using the tiled `bloody_background.png`.

- [ ] **Step 4: Run test to verify it passes**
Run: `cd FRONTEND_sanguihedral && npm test`

- [ ] **Step 5: Commit**
`git add . && git commit -m "feat: add Dashboard component with themed background"`

---

## Chunk 2: Informative Character Card

### Task 2: Create the CharacterCard Component

**Files:**
- Create: `FRONTEND_sanguihedral/src/Components/CharacterCard/CharacterCard.jsx`
- Create: `FRONTEND_sanguihedral/src/Components/CharacterCard/CharacterCard.css`
- Create: `FRONTEND_sanguihedral/src/Components/CharacterCard/CharacterCard.test.jsx`

- [ ] **Step 1: Write the failing test**
Test that `CharacterCard` displays Name, Clan, Sect, and stat summaries correctly.

- [ ] **Step 2: Run test to verify it fails**
Run: `cd FRONTEND_sanguihedral && npm test`

- [ ] **Step 3: Write implementation**
Implement the card with semi-opaque background and mini-trackers for Health/Willpower/Hunger.

- [ ] **Step 4: Run test to verify it passes**
Run: `cd FRONTEND_sanguihedral && npm test`

- [ ] **Step 5: Commit**
`git add . && git commit -m "feat: add informative CharacterCard component"`

---

## Chunk 3: Actions & Integration

### Task 3: Implement Actions Menu and List Rendering

**Files:**
- Modify: `FRONTEND_sanguihedral/src/Components/Dashboard/Dashboard.jsx`

- [ ] **Step 1: Write the failing test**
Update `Dashboard.test.jsx` to verify it renders a list of characters when data is provided.

- [ ] **Step 2: Run test to verify it fails**
Run: `cd FRONTEND_sanguihedral && npm test`

- [ ] **Step 3: Implement list rendering and actions**
Map over character data to render `CharacterCard`s and implement the context menu for navigation/deletion.

- [ ] **Step 4: Run test to verify it passes**
Run: `cd FRONTEND_sanguihedral && npm test`

- [ ] **Step 5: Commit**
`git add . && git commit -m "feat: implement character list rendering and actions"`
