import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import LoginModal from "./LoginModal";

describe("LoginModal Component", () => {
  const defaultProps = {
    isOpen: true,
    modalName: "login",
    closeActiveModal: vi.fn(),
    handleLogin: vi.fn(),
    setActiveModal: vi.fn(),
    setIsLoading: vi.fn(),
    isLoading: false,
  };

  it("renders correctly when open", () => {
    render(<LoginModal {...defaultProps} />);
    
    expect(screen.getByText("Log In")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("email")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Next" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "or Register" })).toBeInTheDocument();
  });

  it("calls handleLogin with email and password on submit", () => {
    render(<LoginModal {...defaultProps} />);
    
    const emailInput = screen.getByPlaceholderText("email");
    const passwordInput = screen.getByPlaceholderText("Password");
    const submitButton = screen.getByRole("button", { name: "Next" });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });
    fireEvent.click(submitButton);

    expect(defaultProps.setIsLoading).toHaveBeenCalledWith(true);
    expect(defaultProps.handleLogin).toHaveBeenCalledWith("test@example.com", "password123");
  });

  it("calls setActiveModal when 'or Register' is clicked", () => {
    render(<LoginModal {...defaultProps} />);
    
    const altButton = screen.getByRole("button", { name: "or Register" });
    fireEvent.click(altButton);

    expect(defaultProps.setActiveModal).toHaveBeenCalledWith("register");
  });

  it("displays '...' on button when isLoading is true", () => {
    render(<LoginModal {...defaultProps} isLoading={true} />);
    
    expect(screen.getByRole("button", { name: "..." })).toBeInTheDocument();
  });

  it("calls closeActiveModal when close button is clicked", () => {
    render(<LoginModal {...defaultProps} />);
    
    const closeButton = screen.getByRole("button", { name: "" }); // ModalWithForm's close button has no text
    fireEvent.click(closeButton);

    expect(defaultProps.closeActiveModal).toHaveBeenCalled();
  });
});
