import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { CharacterProvider } from "../../contexts/CharacterContext";
import * as api from "../../utils/api";
import * as sheetParser from "../../utils/sheetParser";
import Dashboard from "./Dashboard";

vi.mock("../../utils/api", () => ({
  getCharacters: vi.fn(),
  createCharacter: vi.fn(),
  deleteCharacter: vi.fn(),
}));

vi.mock("../../utils/sheetParser", () => ({
  fetchAndParseSheet: vi.fn(),
}));

describe("Dashboard Component", () => {
  it("renders the My Characters header and New Character button", async () => {
    api.getCharacters.mockResolvedValue([]);
    render(
      <BrowserRouter>
        <CharacterProvider isLoggedIn={true}>
          <Dashboard />
        </CharacterProvider>
      </BrowserRouter>
    );
    
    expect(await screen.findByText(/My Characters/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /New Character/i })).toBeInTheDocument();
  });

  it("opens the import form when New Character is clicked", async () => {
    api.getCharacters.mockResolvedValue([]);
    render(
      <BrowserRouter>
        <CharacterProvider isLoggedIn={true}>
          <Dashboard />
        </CharacterProvider>
      </BrowserRouter>
    );
    
    const newBtn = await screen.findByRole("button", { name: /New Character/i });
    fireEvent.click(newBtn);
    
    // Check for the title in the form specifically
    expect(screen.getByRole("heading", { name: /Import from Google Sheet/i })).toBeInTheDocument();
  });

  it("shows parsed data review after successful fetch", async () => {
    api.getCharacters.mockResolvedValue([]);
    const mockParsed = {
      name: "Imported Marcus",
      clan: "Gangrel",
      sect: "Camarilla",
      attributes: { strength: 3 },
      skills: { brawl: 2 }
    };
    sheetParser.fetchAndParseSheet.mockResolvedValue(mockParsed);

    render(
      <BrowserRouter>
        <CharacterProvider isLoggedIn={true}>
          <Dashboard />
        </CharacterProvider>
      </BrowserRouter>
    );
    
    fireEvent.click(await screen.findByRole("button", { name: /New Character/i }));
    
    const urlInput = screen.getByPlaceholderText(/docs\.google\.com/i);
    fireEvent.change(urlInput, { target: { value: "https://docs.google.com/spreadsheets/d/123/edit" } });
    fireEvent.click(screen.getByRole("button", { name: /Import Character/i }));

    expect(await screen.findByText(/Review Parsed Data/i)).toBeInTheDocument();
    expect(screen.getByDisplayValue(/Imported Marcus/i)).toBeInTheDocument();
  });
});
