import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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
  humanity: 7,
  superficialDamage: 0,
  aggravatedDamage: 0
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

  it("renders core tab and displays health/willpower (now merged into Core)", async () => {
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
    // Health and Willpower should be visible in Core tab now
    expect(screen.getByText(/Health \(Max: 4\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Willpower \(Max: 2\)/i)).toBeInTheDocument();
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
    expect(screen.queryByRole("button", { name: /save changes/i })).not.toBeInTheDocument();

    fireEvent.change(nameInput, { target: { value: "Marcus Modified" } });
    expect(screen.getByRole("button", { name: /save changes/i })).toBeInTheDocument();
  });
});
