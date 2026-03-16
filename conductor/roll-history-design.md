# Roll History Drawer Design

## 1. Overview
The Roll History feature allows players to track their recent dice results without cluttering the main Dice Roller interface. It utilizes browser persistence for immediate availability and is designed to transition to a database-backed system for future Storyteller Mode.

## 2. Logic & Persistence
*   **Storage:** `localStorage` (key: `sanguihedral_roll_history`).
*   **Capacity:** Fixed limit of **25 rolls**. When roll #26 is added, the oldest roll is removed (FIFO).
*   **Data Structure:**
    ```json
    {
      "id": "uuid-or-timestamp",
      "timestamp": "ISO-8601",
      "charName": "string|null",
      "pool": number,
      "difficulty": number,
      "result": {
        "totalSuccesses": number,
        "messyCritical": boolean,
        "bestialFailure": boolean,
        "criticalSuccesses": number,
        "regularResults": number[],
        "hungerResults": number[]
      }
    }
    ```

## 3. UI: The History Drawer
*   **Access:** A "History" icon button in the header or top corner of the Dice Roller.
*   **Component:** `HistoryDrawer.jsx`
    *   **Overlay:** Semi-opaque backdrop.
    *   **Panel:** Slides in from the right. Background: `rgba(15, 15, 15, 0.98)` with blood-accented borders.
*   **Log Entry Style:**
    *   **Header:** Character Name (if any) and relative timestamp (e.g., "5m ago").
    *   **Body:** Large success counter and colored status labels (MESSY CRIT, etc.).
    *   **Footer:** A "Delete" button for individual removals and a "Clear All" button at the bottom of the drawer.

## 4. Technical Integration
*   **Custom Hook:** `useRollHistory` will manage the array and persistence logic.
*   **Integration Point:** `DiceRoller.jsx` will call `addRoll()` from the hook immediately after a successful API response.

## 5. Testing Strategy
*   **Logic Tests:** Verify the 25-roll limit and FIFO removal.
*   **Persistence Tests:** Ensure rolls survive page refreshes.
*   **UI Tests:** Verify the drawer opens/closes and correctly displays roll metadata.
