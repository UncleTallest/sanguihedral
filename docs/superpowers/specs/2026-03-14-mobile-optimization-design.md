# Mobile Optimization Design (Revised)

## 1. Overview
Optimizes Sanguihedral for modern tall mobile devices (Pixel 10 Pro) with a focus on one-handed use and persistent "Battle Awareness" of character health and hunger.

## 2. Layout Strategy (The "Thumb Zone")
*   **Consolidated Tabs:** Health/Willpower tracking moved into the **Core Tab** to streamline navigation. 
    *   Current Tabs: Core, Attributes, Skills, Supernatural, Advantages.
*   **Persistent Vitals Bar:** A compact bar showing current Health, Willpower, and Hunger. 
    *   **Location:** Sticky to the bottom, immediately above the navigation tabs.
    *   **Visibility:** Persistent across all tabs of the character sheet.
*   **Bottom Navigation:** Horizontally scrollable tab row at the bottom of the screen.
*   **Sticky Dice Reveal:** In the Dice Roller, the result tray will stick to the top of the viewport during and after a roll.

## 3. Interaction & Touch Targets
*   **48px Minimum Hitboxes:** All interactive `DotTracker` and `DamageTracker` elements will be scaled for reliable thumb-tapping.
*   **Single-Column Vertical Stack:** Attributes and Skills will stack vertically (Physical -> Social -> Mental) on screens < 768px.

## 4. Components to Modify
*   **Modify:** `src/Components/SheetTabs/SheetTabs.jsx` & `SheetTabs.css` (Update tab list and implement bottom-stick behavior).
*   **Modify:** `src/Components/CharacterSheet/CharacterSheet.jsx` & `CharacterSheet.css` (Move Health to Core tab, implement Sticky Vitals Bar).
*   **Modify:** `src/Components/DiceRoller/DiceRoller.css` (Implement Sticky Tray).
*   **Modify:** `src/Components/DotTracker/DotTracker.css` (Scaling).
*   **Modify:** `src/Components/DamageTracker/DamageTracker.css` (Scaling).
