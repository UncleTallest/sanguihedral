import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import { CharacterProvider } from "../../contexts/CharacterContext";
import DiceRoller from "./DiceRoller";
import * as api from "../../utils/api";

// Mock the API
vi.mock("../../utils/api", () => ({
  rollDice: vi.fn(),
  getCharacters: vi.fn(),
}));

const mockCharacter = {
  _id: "123",
  name: "Marcus",
  hunger: 2,
  attributes: { strength: 3, dexterity: 2, resolve: 2, wits: 2 },
  skills: { brawl: 2, firearms: 1, awareness: 3, composure: 2 }
};

describe("DiceRoller Container", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders with default values and pre-fills hunger from character", () => {
    api.getCharacters.mockResolvedValue([]);
    render(
      <MemoryRouter>
        <CharacterProvider isLoggedIn={false}>
          <DiceRoller />
        </CharacterProvider>
      </MemoryRouter>
    );
    expect(screen.getByRole("button", { name: /ROLL/i })).toBeInTheDocument();
  });

  it("triggers a roll and shows results after animation", async () => {
    const mockResponse = {
      totalSuccesses: 3,
      regularResults: [10, 8, 2],
      hungerResults: [1, 1],
      messyCritical: false,
      bestialFailure: true,
      criticalSuccesses: 0,
    };
    
    api.rollDice.mockResolvedValue(mockResponse);
    api.getCharacters.mockResolvedValue([mockCharacter]);

    render(
      <MemoryRouter initialEntries={["/dice?charId=123"]}>
        <CharacterProvider isLoggedIn={true}>
          <DiceRoller />
        </CharacterProvider>
      </MemoryRouter>
    );
    
    const rollButton = screen.getByRole("button", { name: /ROLL/i });
    fireEvent.click(rollButton);

    // Wait for result to appear
    await waitFor(() => {
      expect(screen.getByText("Total Successes: 3")).toBeInTheDocument();
    }, { timeout: 2000 });

    expect(screen.getByText(/BESTIAL FAILURE/i)).toBeInTheDocument();
  });

  it("updates total pool when a preset is clicked", async () => {
    api.getCharacters.mockResolvedValue([mockCharacter]);
    render(
      <MemoryRouter initialEntries={["/dice?charId=123"]}>
        <CharacterProvider isLoggedIn={true}>
          <DiceRoller />
        </CharacterProvider>
      </MemoryRouter>
    );
    
    const presetButton = await screen.findByRole("button", { name: /Str \+ Brawl/i });
    fireEvent.click(presetButton);
    
    // Toggle advanced mode to see the Total Pool value
    fireEvent.click(screen.getByText(/Advanced Mode/i));
    
    // Str(3) + Brawl(2) = 5
    expect(screen.getByText("5")).toBeInTheDocument();
  });
});
