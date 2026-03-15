# Dice Roller Design

## 1. Overview
The Dice Roller is the core mechanic of Sanguihedral, providing a tension-filled "Dramatic Reveal" for V5 dice rolls. It integrates with the VampyreByte API via the backend proxy and handles complex V5 outcomes like Messy Criticals and Bestial Failures.

## 2. UI Components

### Pool Selection
*   **Quick Presets:** Buttons for common combinations (e.g., Strength + Brawl, Dexterity + Stealth, Wits + Awareness).
*   **Advanced Mode:** Toggle to reveal two selection lists (Attributes and Skills) for custom pools.
*   **Manual Adjustment:** `+/-` steppers for **Difficulty** and **Hunger**. Hunger is pre-filled if a character is selected.

### The Dice Tray (Visuals)
*   **Animation:** A "rolling" state where dice icons rapidly cycle through values while the API request is in flight.
*   **Standard Dice:** Row of dice icons. Successes (6-10) show a sect symbol. Criticals (10) are highlighted.
*   **Hunger Dice:** Row of red-accented dice icons. 
    *   Success (6-10): Sect symbol.
    *   Bestial Failure (1): Red Skull icon.
    *   Messy Critical: Triggered if a critical success includes at least one Hunger 10.

### Outcome Display
*   **Total Successes:** Large number display.
*   **Status Text:** Bold, themed labels for:
    *   `CRITICAL SUCCESS` (Gold/White)
    *   `MESSY CRITICAL` (Flashing Red)
    *   `BESTIAL FAILURE` (Flashing Dark Red/Black)
    *   `FAILURE` (Grey)

## 3. Data Integration
*   **Backend Endpoint:** `GET /dice/:totalDice/:hungerDice/:difficulty`
*   **Response Structure (VampyreByte):**
    ```json
    {
      "total_successes": number,
      "margin": number,
      "success": boolean,
      "dice_results": number[],
      "hunger_results": number[],
      "messy_critical": boolean,
      "bestial_failure": boolean,
      "critical_success": boolean
    }
    ```

## 4. State Management
*   **Active Pool:** Tracks selected Attribute and Skill.
*   **Inputs:** Tracks Difficulty and Hunger values.
*   **Roll State:** `idle`, `rolling`, `resolved`, `error`.
*   **Result State:** Stores the last API response.

## 5. Testing Strategy
*   **Unit Tests:** Test dice result mapping logic (values to icons/labels).
*   **Integration Tests:** Verify API calling and state transitions (idle -> rolling -> resolved).
*   **UI Tests:** Ensure presets correctly calculate the total pool based on character stats.
