# Design Spec: Foxit PDF Export & Form Filling

**Date:** 2026-03-18  
**Status:** Draft  
**Goal:** Automate the export of Sanguihedral character data into high-quality V5 PDF character sheets using the Foxit PDF SDK for Web.

## 1. Architecture Overview

The integration consists of three layers:
1.  **Backend License Provider:** A secure Express endpoint that serves the Foxit `licenseKey` and `licenseSN` only to authenticated users.
2.  **PDF Controller (Frontend):** A React service/hook that manages the lifecycle of the Foxit SDK instance and handles the fetching of PDF templates.
3.  **Mapping Engine:** A translation layer that maps internal `CharacterContext` JSON keys to the specific Form Field IDs within the target PDF.

## 2. Technical Requirements

-   **SDK:** `@foxitsoftware/foxit-pdf-sdk-for-web-library`
-   **Storage:** 
    -   Templates: `/FRONTEND_sanguihedral/public/pdf-templates/`
    -   SDK Assets: `/FRONTEND_sanguihedral/public/foxit-lib/` (Workers, fonts, UI fragments)
-   **Security:** Foxit keys stored in backend `.env` and fetched via `GET /api/config/pdf-license`.

## 3. Data Mapping Strategy

### 3.1 Template JSON Mappings
Each supported PDF will have a corresponding `.mapping.json` file.
```json
{
  "template_id": "v5-core-official",
  "mappings": {
    "name": "CharacterName_Field",
    "attributes.strength": ["Str_Dot_1", "Str_Dot_2", "Str_Dot_3", "Str_Dot_4", "Str_Dot_5"],
    "skills.brawl": ["Brawl_Dot_1", "Brawl_Dot_2", "Brawl_Dot_3", "Brawl_Dot_4", "Brawl_Dot_5"]
  }
}
```

### 3.2 Dot Filling Logic
A utility function will iterate through the character's dot values. For a value of `N`:
1.  Lookup the array of field IDs for that stat.
2.  Set the first `N` fields to `true` (checked).
3.  Set the remaining fields to `false` (unchecked).

## 4. Components

### 4.1 `PDFExportButton.jsx`
A UI component placed on the Character Sheet that:
1.  Fetches the license from the backend.
2.  Initializes the Foxit SDK in a "headless" or hidden mode.
3.  Loads the selected template.
4.  Triggers the `fillForm()` process and initiates the browser download.

### 4.2 `PDFMapperUI` (Post-MVP)
A later phase feature allowing users to upload a custom PDF and manually click fields to assign Sanguihedral data keys, generating a new local mapping.

## 5. Implementation Phases

-   **Phase 1 (Preparation):** Acquire license keys and set up backend provider.
-   **Phase 2 (Scaffolding):** Copy Foxit static assets to `public/` and configure Vite to ignore them in the bundle but serve them.
-   **Phase 3 (Core Logic):** Implement the `fillForm` utility and the mapping logic for the first "Sheet Candidate."
-   **Phase 4 (UI):** Add the Export button and template selection modal to the Character Sheet.

## 6. Success Criteria
-   User can click "Export to PDF" and receive a correctly filled character sheet.
-   Dot trackers (1-5) are accurately represented by checkboxes/radio buttons in the PDF.
-   Sensitive license keys are not exposed in the public frontend source code or git history.
