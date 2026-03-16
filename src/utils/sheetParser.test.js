import { describe, it, expect } from "vitest";
import { convertToCsvUrl, parseCSVData, mapHeadersToCharacter } from "./sheetParser";

describe("sheetParser Utility", () => {
  describe("convertToCsvUrl", () => {
    it("converts a standard sharing URL to a CSV export URL", () => {
      const sharingUrl = "https://docs.google.com/spreadsheets/d/1MyKI-ALMPVFh8Tl2KyeuDLsZ4GLGP48oWY3-IuZbNhE/edit?usp=sharing";
      const expectedUrl = "https://docs.google.com/spreadsheets/d/1MyKI-ALMPVFh8Tl2KyeuDLsZ4GLGP48oWY3-IuZbNhE/export?format=csv";
      expect(convertToCsvUrl(sharingUrl)).toBe(expectedUrl);
    });

    it("returns the same URL if it's already a CSV export link", () => {
      const csvUrl = "https://docs.google.com/spreadsheets/d/12345/export?format=csv";
      expect(convertToCsvUrl(csvUrl)).toBe(csvUrl);
    });
  });

  describe("mapHeadersToCharacter", () => {
    it("maps exact header names to character properties", () => {
      const headers = ["Name", "Clan", "Sect", "Strength", "Brawl"];
      const data = ["Marcus", "Gangrel", "Camarilla", "2", "3"];
      
      const result = mapHeadersToCharacter(headers, data);
      
      expect(result.name).toBe("Marcus");
      expect(result.clan).toBe("Gangrel");
      expect(result.sect).toBe("Camarilla");
      expect(result.attributes.strength).toBe(2);
      expect(result.skills.brawl).toBe(3);
    });

    it("performs fuzzy matching for abbreviations and case differences", () => {
      const headers = ["NAME", "cln", "STR", "dex", "sta", "Athl", "brwl"];
      const data = ["Viktor", "Brujah", "4", "3", "4", "3", "4"];
      
      const result = mapHeadersToCharacter(headers, data);
      
      expect(result.name).toBe("Viktor");
      expect(result.clan).toBe("Brujah");
      expect(result.attributes.strength).toBe(4);
      expect(result.attributes.dexterity).toBe(3);
      expect(result.attributes.stamina).toBe(4);
      expect(result.skills.athletics).toBe(3);
      expect(result.skills.brawl).toBe(4);
    });
  });
});
