# Mobile Optimization Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Optimize Sanguihedral for mobile devices with a consolidated tab system, sticky vital stats, and enhanced touch targets.

**Architecture:** 
1.  **Vitals Dashboard:** Move Health/Willpower to Core tab and create a persistent "Vitals Bar" fixed above the footer.
2.  **Bottom Nav:** Transition SheetTabs to a horizontally scrollable bottom-fixed bar.
3.  **Sticky Roller:** Refactor DiceRoller to keep the result tray fixed at the top on mobile.

**Tech Stack:** React, CSS Flexbox/Grid.

---

## Chunk 1: Tab Consolidation & Health Move

### Task 1: Merge Health into Core Tab

**Files:**
- Modify: `FRONTEND_sanguihedral/src/Components/CharacterSheet/CharacterSheet.jsx`
- Modify: `FRONTEND_sanguihedral/src/Components/SheetTabs/SheetTabs.jsx`

- [ ] **Step 1: Update TABS list**
Remove "Health" tab and ensure only 5 tabs remain.

- [ ] **Step 2: Move HealthView content into CoreView**
Integrate the `DamageTracker`s for Health and Willpower into the `CoreView` fieldset.

- [ ] **Step 3: Update CSS**
Ensure the new Core tab layout flows well vertically on mobile.

- [ ] **Step 4: Commit**
`git add . && git commit -m "feat: merge Health view into Core tab for mobile optimization"`

---

## Chunk 2: Persistent Vitals Bar

### Task 2: Create and Integrate Vitals Bar

**Files:**
- Modify: `FRONTEND_sanguihedral/src/Components/CharacterSheet/CharacterSheet.jsx`
- Modify: `FRONTEND_sanguihedral/src/Components/CharacterSheet/CharacterSheet.css`

- [ ] **Step 1: Implement VitalsBar sub-component**
Create a compact horizontal bar showing Hunger, Health (dmg/max), and Willpower (dmg/max).

- [ ] **Step 2: Fix VitalsBar to bottom**
Position it just above the `SheetTabs` component using `position: sticky` or `fixed`.

- [ ] **Step 3: Conditional Visibility**
Ensure it only displays when a character is active and the user is authenticated.

- [ ] **Step 4: Commit**
`git add . && git commit -m "feat: add persistent sticky Vitals Bar above navigation"`

---

## Chunk 3: Navigation & Roller Polish

### Task 3: Bottom Nav and Sticky Tray

**Files:**
- Modify: `FRONTEND_sanguihedral/src/Components/SheetTabs/SheetTabs.css`
- Modify: `FRONTEND_sanguihedral/src/Components/DiceRoller/DiceRoller.css`
- Modify: `FRONTEND_sanguihedral/src/Components/DotTracker/DotTracker.css`
- Modify: `FRONTEND_sanguihedral/src/Components/DamageTracker/DamageTracker.css`

- [ ] **Step 1: Implement scrollable bottom nav**
Update `SheetTabs.css` to handle horizontal overflow and fix to the bottom.

- [ ] **Step 2: Implement sticky dice tray**
Update `DiceRoller.css` to fix the tray to the top of the viewport on mobile.

- [ ] **Step 3: Scale touch targets**
Update `DotTracker` and `DamageTracker` CSS to ensure 48px minimum hitboxes.

- [ ] **Step 4: Commit**
`git add . && git commit -m "feat: finalize mobile navigation and sticky dice tray"`
