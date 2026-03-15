# Health and Core Views Design

## 1. Overview
The Core and Health tabs provide critical narrative and vital tracking for V5 characters. The design focuses on standard V5 mechanics while allowing for the flexibility required by local LARP variants.

## 2. Core Tab (Tab 1) Implementation
The Core tab handles the identity and "Always On" stats of the character.

### Narrative Fields
*   **Searchable Dropdowns:** `Clan` and `Sect` will use a searchable component.
    *   **Standard Clans:** Brujah, Gangrel, Malkavian, Nosferatu, Toreador, Tremere, Ventrue, Lasombra, Hecata, Ravnos, Banu Haqim, Salubri, Ministry, Tzimisce.
    *   **Standard Sects:** Camarilla, Anarch, Autarkis, Sabbat.
    *   **"Other" Option:** Users can select "Other" to reveal a free-text input for homebrew or local LARP specifics.
*   **Free Text Fields:** `Name`, `Concept`, `Sire`, `Predator Type`, and `Generation` (numeric) will be simple inputs.

### Vital Trackers
*   **Reusable `DotTracker`:** Will be used for `Hunger` (0-5), `Blood Potency` (0-10), and `Humanity` (0-10).

## 3. Health & Willpower Tab (Tab 4) Implementation
This tab uses a specialized tracker to manage V5 damage types.

### `DamageTracker` Component
*   **Visuals:** Squares (`[ ]`) instead of circles to match the standard character sheet.
*   **Calculated Max:**
    *   `Max Health` = `Stamina + 3`
    *   `Max Willpower` = `Composure + Resolve`
    *   **Dependency:** These values will dynamically update if the user modifies Attributes in Tab 2.
*   **Sequential Cycle Interaction:**
    *   Tapping an empty box -> **Superficial (/)**
    *   Tapping a superficial box -> **Aggravated (X)**
    *   Tapping an aggravated box -> **Empty ( )**
*   **Overflow Logic ("Turning Over"):** If a user adds Superficial damage to a full track, one existing Superficial damage will be converted to Aggravated damage.
*   **Impaired Status:** A visual warning will appear if all boxes in a track are filled (representing the "Impaired" state in V5).
*   **Logic:** The component will receive the current `superficial` and `aggravated` damage counts from the character data and render the appropriate symbols in sequence (Aggravated symbols always appear to the left of Superficial ones).

## 4. Validation & Constraints
*   **Required Fields:** `Name` and `Clan` must be populated before saving.
*   **Numeric Limits:** 
    *   `Generation`: 4 - 16.
    *   `Blood Potency`: 0 - 10 (further constrained by Generation in future updates).
*   **Draft Integrity:** Validation will be performed when the user clicks "Save Changes."

## 4. Testing Strategy
*   **Component Tests:** Verify the `DamageTracker` correctly cycles through states and handles calculated maximums.
*   **Form Tests:** Ensure the searchable dropdowns in the Core tab correctly switch between predefined options and custom text input.
