import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { BrowserRouter } from "react-router-dom";
import Dashboard from "./Dashboard";

describe("Dashboard Component", () => {
  it("renders the My Characters header and New Character button", () => {
    render(
      <BrowserRouter>
        <Dashboard characters={[]} />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/My Characters/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /New Character/i })).toBeInTheDocument();
  });

  it("renders empty state message when no characters are provided", () => {
    render(
      <BrowserRouter>
        <Dashboard characters={[]} />
      </BrowserRouter>
    );
    
    expect(screen.getByText(/No characters found/i)).toBeInTheDocument();
  });

  it("renders a list of characters when data is provided", () => {
    const mockCharacters = [
      { _id: "1", name: "Marcus", clan: "Gangrel", sect: "Camarilla", hunger: 1 },
      { _id: "2", name: "Sarah", clan: "Toreador", sect: "Camarilla", hunger: 2 }
    ];
    
    render(
      <BrowserRouter>
        <Dashboard characters={mockCharacters} />
      </BrowserRouter>
    );
    
    expect(screen.getByText("Marcus")).toBeInTheDocument();
    expect(screen.getByText("Sarah")).toBeInTheDocument();
  });
});
