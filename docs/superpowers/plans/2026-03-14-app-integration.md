# App Integration & Navigation Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Integrate Character Dashboard, Character Sheet, and Dice Roller into the main app with global navigation and centralized state.

**Architecture:** Use React Context for character state, `react-router-dom` for navigation, and a global Header component.

**Tech Stack:** React, React Router, Vitest.

---

## Chunk 1: Data Layer (Character Context)

### Task 1: Create CharacterContext

**Files:**
- Create: `FRONTEND_sanguihedral/src/contexts/CharacterContext.jsx`
- Modify: `FRONTEND_sanguihedral/src/Components/App/App.jsx` (Provider setup)

- [ ] **Step 1: Create the context and provider**
Implement `CharacterContext` with `characters`, `isLoading`, `error` state and `fetchCharacters`, `addCharacter`, `updateCharacter`, `deleteCharacter` actions.

- [ ] **Step 2: Wrap App with CharacterProvider**
In `App.jsx`, import `CharacterProvider` and wrap the `Routes`.

- [ ] **Step 3: Trigger fetch on login**
In `App.jsx`, call `fetchCharacters` from the context when `isLoggedIn` becomes true.

- [ ] **Step 4: Commit**
`git add . && git commit -m "feat: add CharacterContext and Provider setup"`

---

## Chunk 2: Global Navigation

### Task 2: Create Header Component

**Files:**
- Create: `FRONTEND_sanguihedral/src/Components/Header/Header.jsx`
- Create: `FRONTEND_sanguihedral/src/Components/Header/Header.css`

- [ ] **Step 1: Implement Header component**
Show logo, title, and navigation links (Dashboard, Dice, Profile, Sign Out) based on login status.

- [ ] **Step 2: Add Header to App.jsx**
Place `<Header />` above `<Routes />` in `App.jsx`.

- [ ] **Step 3: Commit**
`git add . && git commit -m "feat: add global Header component"`

### Task 3: Hybridize Landing Page

**Files:**
- Modify: `FRONTEND_sanguihedral/src/Components/Landing/Landing.jsx`

- [ ] **Step 1: Update Landing to show login-dependent buttons**
If `isLoggedIn`, show "Go to Dashboard" and "View Profile" buttons.

- [ ] **Step 2: Commit**
`git add . && git commit -m "feat: hybridize Landing page for logged-in users"`

---

## Chunk 3: Routing & Integration

### Task 4: Complete Routing Table in App.jsx

**Files:**
- Modify: `FRONTEND_sanguihedral/src/Components/App/App.jsx`

- [ ] **Step 1: Add character routes**
Add routes for `/characters`, `/characters/:id`, and `/dice`.

- [ ] **Step 2: Commit**
`git add . && git commit -m "feat: finalize app routing table"`

### Task 5: Dashboard Context Integration

**Files:**
- Modify: `FRONTEND_sanguihedral/src/Components/Dashboard/Dashboard.jsx`

- [ ] **Step 1: Use CharacterContext in Dashboard**
Replace mock characters with `characters` from context. Use navigation functions for menu actions.

- [ ] **Step 2: Commit**
`git add . && git commit -m "feat: integrate Dashboard with CharacterContext"`

### Task 6: CharacterSheet Context Integration

**Files:**
- Modify: `FRONTEND_sanguihedral/src/Components/CharacterSheet/CharacterSheet.jsx`

- [ ] **Step 1: Load character by ID from context**
Use `useParams` to find the character in the context.

- [ ] **Step 2: Connect save button to context action**
Call `updateCharacter` from context when saving.

- [ ] **Step 3: Commit**
`git add . && git commit -m "feat: integrate CharacterSheet with CharacterContext"`

### Task 7: DiceRoller Character Link

**Files:**
- Modify: `FRONTEND_sanguihedral/src/Components/DiceRoller/DiceRoller.jsx`

- [ ] **Step 1: Support query params for charId**
Use `useSearchParams` to pre-load a character from the context if `?charId=` is present.

- [ ] **Step 2: Commit**
`git add . && git commit -m "feat: link DiceRoller to character stats via query params"`
