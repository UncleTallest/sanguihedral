import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Landing from "./Landing";

describe("Landing Component", () => {
  it("renders the app title and logo", () => {
    render(
      <BrowserRouter>
        <Landing isLoggedIn={false} onOpenModal={() => {}} />
      </BrowserRouter>
    );
    
    expect(screen.getByText("Sanguihedral")).toBeInTheDocument();
    expect(screen.getByAltText("Sanguihedral logo")).toBeInTheDocument();
  });

  it("renders the description blurb", () => {
    render(
      <BrowserRouter>
        <Landing isLoggedIn={false} onOpenModal={() => {}} />
      </BrowserRouter>
    );
    
    const blurb = screen.getByText(/cross-platform, sect-agnostic dice roller/i);
    expect(blurb).toBeInTheDocument();
  });

  it("calls onOpenModal when 'Register or Log In' button is clicked", () => {
    const onOpenModal = vi.fn();
    render(
      <BrowserRouter>
        <Landing isLoggedIn={false} onOpenModal={onOpenModal} />
      </BrowserRouter>
    );
    
    const button = screen.getByRole("button", { name: /register or log in/i });
    fireEvent.click(button);
    
    expect(onOpenModal).toHaveBeenCalledWith("login");
  });

  it("renders 'Go to Dashboard' when logged in", () => {
    render(
      <BrowserRouter>
        <Landing isLoggedIn={true} onOpenModal={() => {}} />
      </BrowserRouter>
    );
    
    expect(screen.getByRole("button", { name: /go to dashboard/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /view profile/i })).toBeInTheDocument();
  });

  it("renders the kofi badge in the footer", () => {
    render(
      <BrowserRouter>
        <Landing isLoggedIn={false} onOpenModal={() => {}} />
      </BrowserRouter>
    );
    
    const kofiBadge = screen.getByAltText("Buy me a coffee on Ko-fi");
    expect(kofiBadge).toBeInTheDocument();
  });
});
