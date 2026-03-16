# Google Sheets Importer Implementation Plan

> **For agentic workers:** REQUIRED: Use superpowers:executing-plans to implement this plan. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a character importer that parses Google Sheets CSV data via URL.

**Architecture:** 
1.  **sheetParser Utility:** Logic for URL conversion, fetching, and fuzzy mapping.
2.  **Import Modal/Component:** UI for link input and instructions.
3.  **Integration:** Hook the importer into the "New Character" flow on the Dashboard.

**Tech Stack:** React, PapaParse, Vitest.

---

## Chunk 1: Parsing Logic

### Task 1: Create sheetParser Utility

**Files:**
- Create: `FRONTEND_sanguihedral/src/utils/sheetParser.js`
- Create: `FRONTEND_sanguihedral/src/utils/sheetParser.test.js`

- [ ] **Step 1: Install PapaParse**
`cd FRONTEND_sanguihedral && npm install papaparse`

- [ ] **Step 2: Write the failing tests**
Verify URL conversion (edit -> export) and fuzzy mapping for attributes/skills.

- [ ] **Step 3: Implement sheetParser**
Add logic to convert URLs, fetch CSV data, and map headers to the V5 character object.

- [ ] **Step 4: Run test to verify it passes**
Run: `cd FRONTEND_sanguihedral && npm run test run`

- [ ] **Step 5: Commit**
`git add . && git commit -m "feat: add sheetParser utility with fuzzy mapping"`

---

## Chunk 2: User Interface

### Task 2: Create Import Interface in Character Creation

**Files:**
- Modify: `FRONTEND_sanguihedral/src/Components/Dashboard/Dashboard.jsx` (Link trigger)
- Modify: `FRONTEND_sanguihedral/src/Components/CharacterSheet/CharacterSheet.jsx` (Auto-fill logic)

- [ ] **Step 1: Add Import Input to Dashboard**
Include a field for the Google Sheet URL in the character creation flow.

- [ ] **Step 2: Implement "Review" Summary**
Show the user what data was parsed from the sheet before saving.

- [ ] **Step 3: Commit**
`git add . && git commit -m "feat: add sheet import UI to dashboard"`

---

## Chunk 3: Final Integration

### Task 3: Link Fetching & Saving

**Files:**
- Modify: `FRONTEND_sanguihedral/src/Components/Dashboard/Dashboard.jsx`

- [ ] **Step 1: Complete the fetch lifecycle**
Trigger the parse, show loading, and call `addCharacter` on success.

- [ ] **Step 2: Final testing**
Verify with a real (mocked) Google Sheet URL.

- [ ] **Step 3: Commit**
`git add . && git commit -m "feat: finalize google sheets import integration"`
