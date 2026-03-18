# Implementation Plan: Character Sheet Roll Selection Mode

This plan outlines the steps to add a "Roll Selection Mode" to the character sheet, allowing users to combine any stats and trigger a dice roll modal.

## Phase 1: Preparation & Refactoring

- [ ] **Task 1: Refactor DiceRoller for Modal Support**
  - Modify `DiceRoller.jsx` to accept `isModal` and `onClose` props.
  - Update `App.jsx` to render `DiceRoller` as a global modal when requested (similar to LoginModal).
  - Test the modal trigger from a dummy button on the Dashboard.

## Phase 2: Selection Mode Logic

- [ ] **Task 2: State Management in CharacterSheet**
  - Add `isSelectionMode` boolean to `CharacterSheet.jsx`.
  - Add `selectedStats` (array of objects with { name, value }) to state.
  - Create a toggle button for Selection Mode in the character sheet header.

- [ ] **Task 3: Update Sub-Views for Selectability**
  - Update `AttributesView`, `SkillsView`, and `SupernaturalView` to pass a `selectable` prop to their stat rows.
  - When `selectable` is true, clicking the row (not the dots) should toggle its inclusion in `selectedStats`.

## Phase 3: UI Implementation

- [ ] **Task 4: Create the Floating Roll Button**
  - Add a sticky/fixed button in `CharacterSheet.jsx` that only appears when `selectedStats.length > 0`.
  - Display the calculated total (sum of selected stats + hunger) and the labels.
  - Clicking this button should open the `DiceRoller` modal with the `pool`, `hunger`, and `name` (labels) pre-populated.

## Phase 4: Integration & Testing

- [ ] **Task 5: Final Wiring & Aesthetics**
  - Apply CSS transitions for selection highlights (e.g., blood-red border/glow on selected stats).
  - Ensure the "Roll" navigation param correctly handles multiple selected stats.
  - Verify that saving character changes is still functional and independent of selection mode.

- [ ] **Task 6: Verification**
  - Perform manual tests for: 
    - Combining 1 Attribute + 1 Skill.
    - Combining 1 Discipline + 1 Attribute.
    - Arbitrary combinations (e.g., 3 stats for a complex task).
    - Closing the modal and returning to the exact state of the sheet.
