# App Integration & Navigation Design

## 1. Overview
This specification covers the integration of the Character Dashboard, Character Sheet Editor, and Dice Roller into the main Sanguihedral application. It establishes a global navigation system, centralized state management for character data, and a robust routing table.

## 2. Architecture & State Management

### Character Context
A centralized `CharacterContext` will manage the application's character data.
- **Location:** `src/contexts/CharacterContext.js`
- **State:**
  - `characters`: Array of character objects.
  - `isLoading`: Boolean tracking API requests.
  - `error`: Error messages from the API.
- **Actions:**
  - `fetchCharacters()`: Retrieves all characters for the logged-in user.
  - `addCharacter(data)`: Creates a new character.
  - `updateCharacter(id, data)`: Updates an existing character.
  - `deleteCharacter(id)`: Removes a character.

### Data Sync Strategy
- The context will be initialized in `App.jsx`.
- Character fetching will be triggered upon successful login.
- Individual components (`Dashboard`, `CharacterSheet`, `DiceRoller`) will consume the context to read and modify data.

## 3. Navigation & Layout

### Global Header
A persistent `Header` component will provide navigation.
- **Authenticated View:** Links to `Dashboard`, `Dice Roller`, `Profile`, and a `Sign Out` button.
- **Unauthenticated View:** Title and `Log In` button.

### Hybrid Landing Page
The `Landing` component will adapt to the user's login status.
- **Logged Out:** Standard "Register or Log In" button.
- **Logged In:** Primary actions: "Go to Dashboard" and "View Profile".

## 4. Routing Table
Using `react-router-dom`:
- `/`: `Landing` (Hybrid).
- `/profile`: `Profile` (Protected).
- `/characters`: `Dashboard` (Protected).
- `/characters/:id`: `CharacterSheet` (Protected).
- `/dice`: `DiceRoller` (Public, pre-loads character if `?charId=` is present).

## 5. Dice Roller Integration
- The `DiceRoller` will support both "Anonymous" and "Character-Linked" modes.
- If a `charId` query parameter is detected, the component will find the character in the `CharacterContext`.
- Character stats will populate the Hunger level and "Quick Roll" presets.

## 6. Technical Components to Create/Modify
- **Modify:** `src/Components/App/App.jsx` (Routing, Provider setup).
- **Create:** `src/contexts/CharacterContext.jsx`.
- **Create:** `src/Components/Header/Header.jsx` & `Header.css`.
- **Modify:** `src/Components/Landing/Landing.jsx` (Hybrid view).
- **Modify:** `src/Components/Dashboard/Dashboard.jsx` (Context consumption).
- **Modify:** `src/Components/DiceRoller/DiceRoller.jsx` (Query param support).
