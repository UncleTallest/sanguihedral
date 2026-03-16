import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import SheetTabs from "./SheetTabs";

describe("SheetTabs Component", () => {
  it("renders all tab buttons", () => {
    render(<SheetTabs activeTab="core" onTabChange={() => {}} />);
    expect(screen.getByRole("button", { name: /core/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /attributes/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /skills/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /supernatural/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /advantages/i })).toBeInTheDocument();
  });

  it("calls onTabChange when a tab is clicked", () => {
    const handleTabChange = vi.fn();
    render(<SheetTabs activeTab="core" onTabChange={handleTabChange} />);
    fireEvent.click(screen.getByRole("button", { name: /skills/i }));
    expect(handleTabChange).toHaveBeenCalledWith("skills");
  });
});
