import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Profile from "./Profile";

describe("Profile Component", () => {
  const mockUser = {
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://example.com/avatar.jpg"
  };

  it("renders user information correctly", () => {
    render(<Profile currentUser={mockUser} onSignOut={() => {}} />);
    
    expect(screen.getByText("Welcome, John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByAltText("John Doe's avatar")).toHaveAttribute("src", mockUser.avatar);
  });

  it("calls onSignOut when 'Sign Out' button is clicked", () => {
    const onSignOut = vi.fn();
    render(<Profile currentUser={mockUser} onSignOut={onSignOut} />);
    
    const signOutButton = screen.getByRole("button", { name: /sign out/i });
    fireEvent.click(signOutButton);
    
    expect(onSignOut).toHaveBeenCalled();
  });

  it("renders fallback message for no characters", () => {
    render(<Profile currentUser={mockUser} onSignOut={() => {}} />);
    expect(screen.getByText("No characters yet.")).toBeInTheDocument();
  });

  it("does not render avatar if not provided", () => {
    const userNoAvatar = { name: "No Avatar", email: "no@example.com" };
    render(<Profile currentUser={userNoAvatar} onSignOut={() => {}} />);
    
    const avatar = screen.queryByRole("img", { name: /avatar/i });
    // The kofi badge is an img, so we check specifically for the user avatar
    expect(screen.queryByAltText("No Avatar's avatar")).not.toBeInTheDocument();
  });
});
