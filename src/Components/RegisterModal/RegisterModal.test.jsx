import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import RegisterModal from "./RegisterModal";

describe("RegisterModal Component", () => {
  const defaultProps = {
    isOpen: true,
    modalName: "register",
    closeActiveModal: vi.fn(),
    onRegistration: vi.fn(),
    onLogin: vi.fn(),
    setActiveModal: vi.fn(),
    setIsLoading: vi.fn(),
    isLoading: false,
  };

  it("renders correctly when open", () => {
    render(<RegisterModal {...defaultProps} />);
    
    expect(screen.getByText("Sign up")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Avatar")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "or Login" })).toBeInTheDocument();
  });

  it("calls onRegistration with correct data on submit", () => {
    render(<RegisterModal {...defaultProps} />);
    
    const emailInput = screen.getByPlaceholderText("Email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const nameInput = screen.getByPlaceholderText("Name");
    const avatarInput = screen.getByPlaceholderText("Avatar");
    const submitButton = screen.getByRole("button", { name: "Next" });

    fireEvent.change(emailInput, { target: { value: "new@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "pass123" } });
    fireEvent.change(nameInput, { target: { value: "New User" } });
    fireEvent.change(avatarInput, { target: { value: "https://avatar.com/1" } });
    
    fireEvent.click(submitButton);

    expect(defaultProps.setIsLoading).toHaveBeenCalledWith(true);
    expect(defaultProps.onRegistration).toHaveBeenCalledWith({
      user: {
        email: "new@example.com",
        password: "pass123",
        name: "New User",
        avatar: "https://avatar.com/1"
      }
    });
  });

  it("calls setActiveModal when 'or Login' is clicked", () => {
    render(<RegisterModal {...defaultProps} />);
    
    const altButton = screen.getByRole("button", { name: "or Login" });
    fireEvent.click(altButton);

    expect(defaultProps.setActiveModal).toHaveBeenCalledWith("login");
  });
});
