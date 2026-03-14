import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import CharacterCard from "./CharacterCard";

describe("CharacterCard Component", () => {
  const mockCharacter = {
    _id: "123",
    name: "Marcus Gruene",
    clan: "Gangrel",
    sect: "Camarilla",
    hunger: 2,
    attributes: { stamina: 3, composure: 2, resolve: 2 },
    superficialDamage: 1,
    aggravatedDamage: 1,
    superficialWillpowerDamage: 0,
    aggravatedWillpowerDamage: 1,
  };

  it("renders character identity information", () => {
    render(<CharacterCard character={mockCharacter} />);
    
    expect(screen.getByText("Marcus Gruene")).toBeInTheDocument();
    expect(screen.getByText(/Gangrel/i)).toBeInTheDocument();
    expect(screen.getByText(/Camarilla/i)).toBeInTheDocument();
  });

  it("renders vital stats summaries", () => {
    render(<CharacterCard character={mockCharacter} />);
    
    expect(screen.getByText(/Health/i)).toBeInTheDocument();
    expect(screen.getByText(/Willpower/i)).toBeInTheDocument();
    expect(screen.getByText(/Hunger/i)).toBeInTheDocument();
  });
});
