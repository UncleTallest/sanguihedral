# Character List Dashboard Design

## 1. Overview
The Character List Dashboard (`/characters`) serves as the central hub for authenticated users. It provides a high-level overview of all characters owned by the user, including vital stats (Health, Willpower, Hunger), and offers quick navigation to the Character Sheet or Dice Roller.

## 2. Visual Theme
*   **Background:** The page will utilize the `bloody_background.png` from the public folder, tiled as a background to reinforce the Vampire: The Masquerade aesthetic.
*   **Readability:** Character cards will use a semi-opaque dark background (e.g., `rgba(20, 20, 20, 0.9)`) to ensure clear contrast against the blood-spattered background.

## 3. Component: CharacterCard (Informative)
Each character is represented by a card containing:
*   **Header:** Character Name (large), Clan and Sect (subtext).
*   **Status Indicators:**
    *   **Health Mini-Tracker:** A compact representation of damage boxes.
    *   **Willpower Mini-Tracker:** A compact representation of willpower damage boxes.
    *   **Hunger:** A simplified dot row (0-5).
*   **Visual Accents:** Red highlights for filled damage/hunger to provide immediate visual feedback.

## 4. Dashboard Features
*   **Empty State:** A clear message and button for users with no characters: "No characters found. Create your first one!"
*   **Global Actions:** A "New Character" button prominently placed at the top of the list.
*   **Character Menu:** Tapping a card opens a context menu with the following options:
    *   **View Sheet:** Navigates to `/characters/:id`.
    *   **Dice Roller:** Navigates to `/dice?charId=:id`.
    *   **Delete:** Opens a confirmation dialog.

## 5. Technical Details
*   **Data Fetching:** Fetch character list from `GET /characters` on mount.
*   **Routing:** Integrated with React Router.
*   **Responsive Design:** Grid layout that collapses to a single column on mobile devices.
