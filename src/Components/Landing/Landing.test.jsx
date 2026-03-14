import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Landing from "./Landing";

describe("Landing Component", () => {
  it("renders the app title and logo", () => {
    render(<Landing onOpenModal={() => {}} />);
    
    expect(screen.getByText("Sanguihedral")).toBeInTheDocument();
    expect(screen.getByAltText("Sanguihedral logo")).toBeInTheDocument();
  });

  it("renders the description blurb", () => {
    render(<Landing onOpenModal={() => {}} />);
    
    const blurb = screen.getByText(/cross-platform, sect-agnostic dice roller/i);
    expect(blurb).toBeInTheDocument();
  });

  it("calls onOpenModal when 'Register or Log In' button is clicked", () => {
    const onOpenModal = vi.fn();
    render(<Landing onOpenModal={onOpenModal} />);
    
    const button = screen.getByRole("button", { name: /register or log in/i });
    fireEvent.click(button);
    
    expect(onOpenModal).toHaveBeenCalledWith("login");
  });

  it("renders the kofi badge in the footer", () => {
    render(<Landing onOpenModal={() => {}} />);
    
    const kofiBadge = screen.getByAltText("Buy me a coffee on Ko-fi");
    expect(kofiBadge).toBeInTheDocument();
  });
});
