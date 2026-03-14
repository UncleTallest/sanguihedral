import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import CharacterSheet from "./CharacterSheet";

const mockCharacter = {
  _id: "123",
  name: "Marcus",
  clan: "Gangrel",
  attributes: { strength: 2 },
  skills: { brawl: 2 }
};

describe("CharacterSheet Container", () => {
  it("renders core tab by default and displays character name", () => {
    render(<CharacterSheet initialCharacter={mockCharacter} onSave={() => {}} />);
    expect(screen.getByDisplayValue("Marcus")).toBeInTheDocument();
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
});
