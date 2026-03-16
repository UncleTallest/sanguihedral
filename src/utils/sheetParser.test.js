import { describe, it, expect } from "vitest";
import { convertToCsvUrl, mapGridToCharacter } from "./sheetParser";

describe("sheetParser Utility (Grid Mode)", () => {
  it("converts a standard sharing URL to a CSV export URL", () => {
    const sharingUrl = "https://docs.google.com/spreadsheets/d/1MyKI-ALMPVFh8Tl2KyeuDLsZ4GLGP48oWY3-IuZbNhE/edit?usp=sharing";
    const expectedUrl = "https://docs.google.com/spreadsheets/d/1MyKI-ALMPVFh8Tl2KyeuDLsZ4GLGP48oWY3-IuZbNhE/export?format=csv";
    expect(convertToCsvUrl(sharingUrl)).toBe(expectedUrl);
  });

  it("maps values from a 2D grid (Form style)", () => {
    const grid = [
      ["", "Name", "Marcus Gruene", "", "Clan", "Gangrel"],
      ["", "Strength", "2", "", "Charisma", "3"],
      ["Health", "", "", "", "", ""],
      ["7", "", "", "", "", ""]
    ];
    
    const result = mapGridToCharacter(grid);
    
    expect(result.name).toBe("Marcus Gruene");
    expect(result.clan).toBe("Gangrel");
    expect(result.attributes.strength).toBe(2);
    expect(result.attributes.charisma).toBe(3);
    expect(result.maxHealth).toBe(7);
  });

  it("handles empty and malformed grids gracefully by defaulting attributes to 1", () => {
    const grid = [["Random", "Data"], ["No", "Labels"]];
    const result = mapGridToCharacter(grid);
    expect(result.attributes.strength).toBe(1);
    expect(result.name).toBeUndefined();
  });
});
