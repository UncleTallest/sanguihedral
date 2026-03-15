import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import { CharacterProvider } from "../../contexts/CharacterContext";
import * as api from "../../utils/api";
import Dashboard from "./Dashboard";

vi.mock("../../utils/api", () => ({
  getCharacters: vi.fn(),
  createCharacter: vi.fn(),
  deleteCharacter: vi.fn(),
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

  it("renders a list of characters when data is provided", async () => {
    const mockCharacters = [
      { _id: "1", name: "Marcus", clan: "Gangrel", sect: "Camarilla", hunger: 1 },
      { _id: "2", name: "Sarah", clan: "Toreador", sect: "Camarilla", hunger: 2 }
    ];
    api.getCharacters.mockResolvedValue(mockCharacters);
    
    render(
      <BrowserRouter>
        <CharacterProvider isLoggedIn={true}>
          <Dashboard />
        </CharacterProvider>
      </BrowserRouter>
    );
    
    expect(await screen.findByText("Marcus")).toBeInTheDocument();
    expect(await screen.findByText("Sarah")).toBeInTheDocument();
  });
});
