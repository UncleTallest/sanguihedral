# Health and Core Views Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement the Core and Health views for the V5 Character Sheet Editor, including a specialized `DamageTracker` component and dynamic stats calculation.

**Architecture:** 
1.  **DamageTracker:** A specialized UI component for health/willpower boxes.
2.  **Core View:** A form for narrative fields and standard dot stats (Hunger, etc.).
3.  **Health View:** A dynamic view that calculates Max Health/Willpower from attributes and manages damage state.

**Tech Stack:** React, Vitest.

---

## Chunk 1: DamageTracker Component

### Task 1: Create the DamageTracker Component

**Files:**
- Create: `FRONTEND_sanguihedral/src/Components/DamageTracker/DamageTracker.jsx`
- Create: `FRONTEND_sanguihedral/src/Components/DamageTracker/DamageTracker.css`
- Create: `FRONTEND_sanguihedral/src/Components/DamageTracker/DamageTracker.test.jsx`

- [ ] **Step 1: Write the failing test**
Create `DamageTracker.test.jsx` testing the 3-state cycle (Empty -> / -> X -> Empty).

- [ ] **Step 2: Run test to verify it fails**
Run: `cd FRONTEND_sanguihedral && npm run test run`

- [ ] **Step 3: Write minimal implementation**
Implement the component logic to handle `superficial` and `aggravated` damage counts, rendering Aggravated (X) first, then Superficial (/), then Empty.

- [ ] **Step 4: Run test to verify it passes**
Run: `cd FRONTEND_sanguihedral && npm run test run`

- [ ] **Step 5: Commit**
`git add . && git commit -m "feat: add DamageTracker component"`

---

## Chunk 2: Core Tab Implementation

### Task 2: Implement CoreView in CharacterSheet

**Files:**
- Modify: `FRONTEND_sanguihedral/src/Components/CharacterSheet/CharacterSheet.jsx`

- [ ] **Step 1: Write the failing test**
Update `CharacterSheet.test.jsx` to verify that fields like "Clan" and "Hunger" are rendered in the Core tab.

- [ ] **Step 2: Run test to verify it fails**
Run: `cd FRONTEND_sanguihedral && npm run test run`

- [ ] **Step 3: Implement CoreView**
Replace the simple `CoreView` stub with a full form containing inputs for Name, Clan, Sect, etc., and reuse `DotTracker` for Hunger, Blood Potency, and Humanity.

- [ ] **Step 4: Run test to verify it passes**
Run: `cd FRONTEND_sanguihedral && npm run test run`

- [ ] **Step 5: Commit**
`git add . && git commit -m "feat: implement full Core tab view"`

---

## Chunk 3: Health Tab & Dynamic Logic

### Task 3: Implement HealthView with Max Calculations

**Files:**
- Modify: `FRONTEND_sanguihedral/src/Components/CharacterSheet/CharacterSheet.jsx`

- [ ] **Step 1: Write the failing test**
Verify that Health/Willpower maximums update when Stamina or Composure are changed.

- [ ] **Step 2: Run test to verify it fails**
Run: `cd FRONTEND_sanguihedral && npm run test run`

- [ ] **Step 3: Implement HealthView**
Replace the `Health View (TODO)` stub. Calculate `maxHealth` (Stamina + 3) and `maxWillpower` (Composure + Resolve) dynamically from the `draftState`.

- [ ] **Step 4: Run test to verify it passes**
Run: `cd FRONTEND_sanguihedral && npm run test run`

- [ ] **Step 5: Commit**
`git add . && git commit -m "feat: implement Health view with dynamic calculations"`
