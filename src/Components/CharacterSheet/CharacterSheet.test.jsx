import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { CharacterProvider } from "../../contexts/CharacterContext";
import CharacterSheet from "./CharacterSheet";
import * as api from "../../utils/api";

vi.mock("../../utils/api", () => ({
  getCharacters: vi.fn(),
  updateCharacter: vi.fn(),
}));

const mockCharacter = {
  _id: "123",
  name: "Marcus",
  clan: "Gangrel",
  attributes: {
    strength: 2, dexterity: 1, stamina: 1,
    charisma: 1, manipulation: 1, composure: 1,
    intelligence: 1, wits: 1, resolve: 1
  },
  skills: { brawl: 2 },
  hunger: 1,
  bloodPotency: 1,
  humanity: 7
};

describe("CharacterSheet Container", () => {
  it("renders loading state initially", () => {
    api.getCharacters.mockResolvedValue([]);
    render(
      <MemoryRouter initialEntries={["/characters/123"]}>
        <CharacterProvider isLoggedIn={true}>
          <Routes>
            <Route path="/characters/:id" element={<CharacterSheet />} />
          </Routes>
        </CharacterProvider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Loading character/i)).toBeInTheDocument();
  });

  it("renders core tab and displays character name when character is found", async () => {
    api.getCharacters.mockResolvedValue([mockCharacter]);
    render(
      <MemoryRouter initialEntries={["/characters/123"]}>
        <CharacterProvider isLoggedIn={true}>
          <Routes>
            <Route path="/characters/:id" element={<CharacterSheet />} />
          </Routes>
        </CharacterProvider>
      </MemoryRouter>
    );
    
    expect(await screen.findByDisplayValue("Marcus")).toBeInTheDocument();
  });

  it("shows save button only when changes are made", async () => {
    api.getCharacters.mockResolvedValue([mockCharacter]);
    render(
      <MemoryRouter initialEntries={["/characters/123"]}>
        <CharacterProvider isLoggedIn={true}>
          <Routes>
            <Route path="/characters/:id" element={<CharacterSheet />} />
          </Routes>
        </CharacterProvider>
      </MemoryRouter>
    );
    
    const nameInput = await screen.findByDisplayValue("Marcus");
    
    // Save button should not exist initially
    expect(screen.queryByRole("button", { name: /save changes/i })).not.toBeInTheDocument();

    // Modify name
    fireEvent.change(nameInput, { target: { value: "Marcus Modified" } });

    // Save button should appear
    expect(screen.getByRole("button", { name: /save changes/i })).toBeInTheDocument();
  });
});
