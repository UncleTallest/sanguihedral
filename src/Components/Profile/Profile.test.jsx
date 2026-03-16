import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { CharacterProvider } from "../../contexts/CharacterContext";
import Profile from "./Profile";

// Mock the API for CharacterProvider
vi.mock("../../utils/api", () => ({
  getCharacters: vi.fn(() => Promise.resolve([])),
}));

describe("Profile Component", () => {
  const mockUser = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://example.com/avatar.jpg"
  };

  it("renders user information correctly", () => {
    render(
      <CharacterProvider isLoggedIn={false}>
        <Profile currentUser={mockUser} onSignOut={() => {}} />
      </CharacterProvider>
    );
    
    expect(screen.getByText("Welcome, John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByAltText("John Doe's avatar")).toHaveAttribute("src", mockUser.avatar);
  });

  it("calls onSignOut when 'Sign Out' button is clicked", () => {
    const onSignOut = vi.fn();
    render(
      <CharacterProvider isLoggedIn={false}>
        <Profile currentUser={mockUser} onSignOut={onSignOut} />
      </CharacterProvider>
    );
    
    const signOutButton = screen.getByRole("button", { name: /sign out/i });
    fireEvent.click(signOutButton);
    
    expect(onSignOut).toHaveBeenCalled();
  });

  it("renders fallback message for no characters", () => {
    render(
      <CharacterProvider isLoggedIn={false}>
        <Profile currentUser={mockUser} onSignOut={() => {}} />
      </CharacterProvider>
    );
    expect(screen.getByText("No characters yet.")).toBeInTheDocument();
  });

  it("does not render avatar if not provided", () => {
    const userNoAvatar = { name: "No Avatar", email: "no@example.com" };
    render(
      <CharacterProvider isLoggedIn={false}>
        <Profile currentUser={userNoAvatar} onSignOut={() => {}} />
      </CharacterProvider>
    );
    
    expect(screen.queryByAltText("No Avatar's avatar")).not.toBeInTheDocument();
  });
});
