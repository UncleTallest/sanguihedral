# Google Sheets CSV Importer Design

## 1. Overview
The Google Sheets Importer allows users to quickly onboard their characters by pasting a link to a Google Sheet. It uses a hybrid approach: specific coordinate parsing for the standard Austin LARP template and fuzzy header matching for all other sheets.

## 2. The Import Flow
1.  **Trigger:** User clicks "New Character" on the Dashboard.
2.  **Input:** A "Import from Google Sheet" field is prominently displayed at the top of the creation form.
3.  **URL Conversion:** The app automatically attempts to convert a standard Google Sheets URL (ending in `/edit...`) into a CSV export URL (ending in `/export?format=csv`).
4.  **Parsing:**
    *   **Phase 1 (Coordinate Check):** If the sheet matches the known Austin LARP template signature (specific values in specific cells), use approach A (coordinate parsing).
    *   **Phase 2 (Fuzzy Mapping):** If approach A fails, use `papaparse` to read headers and map them using fuzzy matching (e.g., "Str", "Strength", "STRE" all map to `attributes.strength`).
5.  **Review & Confirm:** A summary screen shows the mapped data. The user confirms, and the character is saved to the database.

## 3. Technical Components
*   **Utility:** `sheetParser.js` (Handles URL conversion, fetching, and mapping logic).
*   **Component:** `ImportForm.jsx` (A sub-component of the creation flow for link input and instructions).
*   **Dependencies:** `papaparse` for CSV parsing.

## 4. Instructions UI
Per the chosen approach (Q2-A), a small "How to get your link" guide will be included:
1.  Open your Google Sheet.
2.  Go to `File > Share > Publish to web`.
3.  Choose `Link`, select `Whole Document` (or character sheet tab) and change `Web Page` to `Comma-separated values (.csv)`.
4.  Copy the generated link and paste it here.

## 5. Testing Strategy
*   **Unit Tests:** Test the fuzzy matcher with various header abbreviations.
*   **Integration Tests:** Verify the URL conversion logic.
*   **End-to-End:** Mock a successful CSV fetch and ensure the character is added to the Dashboard.
