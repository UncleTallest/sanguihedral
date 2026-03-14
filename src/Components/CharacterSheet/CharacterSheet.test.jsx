import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CharacterSheet from "./CharacterSheet";

const mockCharacter = {
  _id: "123",
  name: "Marcus",
  clan: "Gangrel",
  attributes: {
    strength: 2, dexterity: 1, stamina: 1,
    charisma: 1, manipulation: 1, composure: 1,
    intelligence: 1, wits: 1, resolve: 1
  },
  skills: { brawl: 2 }
};

describe("CharacterSheet Container", () => {
  it("renders core tab by default and displays character name and core fields", () => {
    render(<CharacterSheet initialCharacter={mockCharacter} onSave={() => {}} />);
    expect(screen.getByDisplayValue("Marcus")).toBeInTheDocument();
    expect(screen.getByText(/Clan/i)).toBeInTheDocument();
    expect(screen.getByText(/Hunger/i)).toBeInTheDocument();
  });

  it("allows updating core narrative fields", () => {
    render(<CharacterSheet initialCharacter={mockCharacter} onSave={() => {}} />);
    const clanSelect = screen.getByLabelText(/Clan/i);
    fireEvent.change(clanSelect, { target: { value: "Brujah" } });
    expect(screen.getByRole("button", { name: /save changes/i })).toBeInTheDocument();
  });

  it("shows save button only when changes are made", () => {
    render(<CharacterSheet initialCharacter={mockCharacter} onSave={() => {}} />);
    
    // Save button should not exist initially
    expect(screen.queryByRole("button", { name: /save changes/i })).not.toBeInTheDocument();

    // Modify name
    const nameInput = screen.getByDisplayValue("Marcus");
    fireEvent.change(nameInput, { target: { value: "Marcus Modified" } });

    // Save button should appear
    expect(screen.getByRole("button", { name: /save changes/i })).toBeInTheDocument();
  });

  it("calls onSave with updated draft state", () => {
    const handleSave = vi.fn();
    render(<CharacterSheet initialCharacter={mockCharacter} onSave={handleSave} />);
    
    fireEvent.change(screen.getByDisplayValue("Marcus"), { target: { value: "New Name" } });
    fireEvent.click(screen.getByRole("button", { name: /save changes/i }));

    expect(handleSave).toHaveBeenCalledWith(expect.objectContaining({
      name: "New Name",
      clan: "Gangrel"
    }));
  });

  it("renders Attributes view when tab is clicked and allows editing", () => {
    render(<CharacterSheet initialCharacter={mockCharacter} onSave={() => {}} />);
    
    // Switch to attributes tab
    fireEvent.click(screen.getByRole("button", { name: /attributes/i }));
    
    // Should see strength label
    expect(screen.getByText("strength")).toBeInTheDocument();
    
    // Check dot tracker interaction triggers draft change
    // Using a broad check since DotTracker renders buttons without accessible names by default
    const dots = screen.getAllByRole("button", { name: /set to/i });
    fireEvent.click(dots[4]); // Set strength to 5
    
    expect(screen.getByRole("button", { name: /save changes/i })).toBeInTheDocument();
  });

  it("renders Skills view when tab is clicked", () => {
    render(<CharacterSheet initialCharacter={mockCharacter} onSave={() => {}} />);
    fireEvent.click(screen.getByRole("button", { name: /skills/i }));
    expect(screen.getByText("brawl")).toBeInTheDocument();
  });

  it("calculates Max Health and Willpower dynamically from attributes", () => {
    render(<CharacterSheet initialCharacter={mockCharacter} onSave={() => {}} />);
    
    // Switch to health tab
    fireEvent.click(screen.getByRole("button", { name: /health/i }));
    
    // Default Stamina(1) + 3 = 4 boxes
    const healthSection = document.querySelector('.health-tracker');
    const healthBoxes = healthSection.querySelectorAll('.damage-box');
    expect(healthBoxes).toHaveLength(4);

    // Switch to attributes and change Stamina
    fireEvent.click(screen.getByRole("button", { name: /attributes/i }));
    expect(screen.getByText(/strength/i)).toBeInTheDocument();
    
    const dots = screen.getAllByRole("button", { name: /set to/i });
    // Sorted: charisma, composure, dexterity, intelligence, manipulation, resolve, stamina, strength, wits
    // stamina is at index 6 (0-based)
    // dots 30-34 are stamina dots.
    fireEvent.click(dots[34]); // Set stamina to 5

    // Switch back to health
    fireEvent.click(screen.getByRole("button", { name: /health/i }));
    const newHealthBoxes = document.querySelector('.health-tracker').querySelectorAll('.damage-box');
    expect(newHealthBoxes).toHaveLength(8); // 5 + 3 = 8
  });
});

