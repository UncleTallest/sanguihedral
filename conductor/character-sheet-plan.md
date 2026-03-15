# Character Sheet Editor Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a mobile-friendly, tabbed Character Sheet Editor for V5 characters with a "Draft State + Commit" save mechanism and interactive dot trackers.

**Architecture:** A main `CharacterSheet` container manages state (`initialState` vs `draftState`) and renders a tabbed navigation system. The form is broken into four distinct tab views (Core, Attributes, Skills, Health). The `DotTracker` component is heavily reused for standard V5 1-5 dot mechanics.

**Tech Stack:** React, React Router, Vitest (for TDD).

---

## Chunk 1: Foundation and UI Components

### Task 1: Create the DotTracker Component

**Files:**
- Create: `FRONTEND_sanguihedral/src/Components/DotTracker/DotTracker.jsx`
- Create: `FRONTEND_sanguihedral/src/Components/DotTracker/DotTracker.css`
- Create: `FRONTEND_sanguihedral/src/Components/DotTracker/DotTracker.test.jsx`

- [ ] **Step 1: Write the failing test**
Create `DotTracker.test.jsx` and write basic render and interaction tests.

- [ ] **Step 2: Run test to verify it fails**
Run: `cd FRONTEND_sanguihedral && npm run test run`

- [ ] **Step 3: Write minimal implementation**
Create `DotTracker.jsx` with an array mapping up to `max` value, handling click to update value and reset on click of first dot. Include CSS.

- [ ] **Step 4: Run test to verify it passes**
Run: `cd FRONTEND_sanguihedral && npm run test run`

- [ ] **Step 5: Commit**
`git add . && git commit -m "feat: add DotTracker component with tests"`

### Task 2: Create the Tab Navigation Component

**Files:**
- Create: `FRONTEND_sanguihedral/src/Components/SheetTabs/SheetTabs.jsx`
- Create: `FRONTEND_sanguihedral/src/Components/SheetTabs/SheetTabs.css`
- Create: `FRONTEND_sanguihedral/src/Components/SheetTabs/SheetTabs.test.jsx`

- [ ] **Step 1: Write the failing test**
Create tests for rendering tabs and triggering `onTabChange`.

- [ ] **Step 2: Run test to verify it fails**
Run: `cd FRONTEND_sanguihedral && npm run test run`

- [ ] **Step 3: Write minimal implementation**
Create sticky footer nav with Core, Attributes, Skills, and Health tabs.

- [ ] **Step 4: Run test to verify it passes**
Run: `cd FRONTEND_sanguihedral && npm run test run`

- [ ] **Step 5: Commit**
`git add . && git commit -m "feat: add SheetTabs navigation component"`

## Chunk 2: Character Sheet Container & State

### Task 3: Create Character Sheet Container with Draft State

**Files:**
- Create: `FRONTEND_sanguihedral/src/Components/CharacterSheet/CharacterSheet.jsx`
- Create: `FRONTEND_sanguihedral/src/Components/CharacterSheet/CharacterSheet.test.jsx`

- [ ] **Step 1: Write the failing test**
Test default tab render, changing tabs, and showing "Save Changes" conditionally.

- [ ] **Step 2: Run test to verify it fails**
Run: `cd FRONTEND_sanguihedral && npm run test run`

- [ ] **Step 3: Write minimal implementation**
Implement draft state vs initial state comparison, a save handler, and a simple switch-case for rendering active tabs.

- [ ] **Step 4: Run test to verify it passes**
Run: `cd FRONTEND_sanguihedral && npm run test run`

- [ ] **Step 5: Commit**
`git add . && git commit -m "feat: add CharacterSheet container with draft state logic"`

## Chunk 3: Building the Tab Views

### Task 4: Implement Attributes and Skills Views

**Files:**
- Modify: `FRONTEND_sanguihedral/src/Components/CharacterSheet/CharacterSheet.jsx`
- Modify: `FRONTEND_sanguihedral/src/Components/CharacterSheet/CharacterSheet.test.jsx`

- [ ] **Step 1: Write the failing tests**
Ensure Attributes and Skills tabs render the properties of the character and trigger draft updates.

- [ ] **Step 2: Run test to verify it fails**
Run: `cd FRONTEND_sanguihedral && npm run test run`

- [ ] **Step 3: Implement Views**
Build `AttributesView` and `SkillsView` iterating over `draft.attributes` and `draft.skills` utilizing the `DotTracker` component.

- [ ] **Step 4: Run test to verify it passes**
Run: `cd FRONTEND_sanguihedral && npm run test run`

- [ ] **Step 5: Commit**
`git add . && git commit -m "feat: implement Attributes and Skills tab views"`
