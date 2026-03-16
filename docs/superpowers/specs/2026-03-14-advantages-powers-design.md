# Advantages & Powers Design

## 1. Overview
This feature expands the Sanguihedral character sheet to include Disciplines, Merits, Flaws, Backgrounds, Lore Sheets, and Rituals. It also reorganizes the base stats to match the official V5 "Physical, Social, Mental" grouping.

## 2. Stat Reorganization
*   **Attributes & Skills:** Both will be displayed in a 3-column or 3-section layout (Physical, Social, Mental) to ensure familiarity for players used to the paper sheets.

## 3. Tab Structure
*   **Tab 5: Supernatural**
    *   **Disciplines:** Dot-trackers for each discipline.
    *   **Powers:** Under each discipline, a list of selected powers with short summaries and "Roll" buttons.
    *   **Rituals (Collapsible):** A specific section for Blood Sorcery/Oblivion rituals.
*   **Tab 6: Advantages**
    *   **Merits & Flaws:** Grouped list using "Pick and Tag" (Select type, add custom name/spec).
    *   **Backgrounds:** Same structure as Merits.
    *   **Lore Sheets:** Specific section for Lore Sheet dots and individual power unlocks.

## 4. Backend Schema Updates
```javascript
{
  disciplines: [{ name: String, dots: Number, powers: [String] }],
  advantages: [{ name: String, type: String, dots: Number, specification: String }],
  flaws: [{ name: String, dots: Number, specification: String }],
  loreSheets: [{ name: String, dots: Number, specification: String }],
  rituals: [String]
}
```

## 5. Smart Rolling (Direct UI Link)
Every power or advantage defined in the `v5data.json` repository will include a `dice_pool` property (e.g., `["strength", "brawl"]`). If a character owns that power, a "Roll" icon will appear next to it on the sheet. Clicking it navigates to the Dice Roller and pre-populates the pool.

## 6. Integration
*   **Pick and Tag UI:** A searchable dropdown to select the base trait, followed by an input for the specific details (e.g., "Ally: [Police Chief]").
*   **Compliance:** All traits will include a "Summary" and "Page Reference" to comply with the Dark Pack agreement.
