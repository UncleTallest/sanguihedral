import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import DiceIcon from "./DiceIcon";

describe("DiceIcon Component", () => {
  it("renders a success for standard die (value 6-9)", () => {
    render(<DiceIcon value={8} isHunger={false} />);
    expect(screen.getByText("🩸")).toBeInTheDocument();
  });

  it("renders a critical for standard die (value 10)", () => {
    render(<DiceIcon value={10} isHunger={false} />);
    expect(screen.getByText("⭐")).toBeInTheDocument();
  });

  it("renders a failure for standard die (value 1-5)", () => {
    render(<DiceIcon value={3} isHunger={false} />);
    expect(screen.getByText("·")).toBeInTheDocument();
  });

  it("renders a bestial failure for hunger die (value 1)", () => {
    render(<DiceIcon value={1} isHunger={true} />);
    expect(screen.getByText("💀")).toBeInTheDocument();
  });

  it("renders a success for hunger die (value 6-9)", () => {
    render(<DiceIcon value={7} isHunger={true} />);
    expect(screen.getByText("🩸")).toBeInTheDocument();
    // Should have hunger class
    expect(screen.getByRole("img")).toHaveClass("dice-icon_hunger");
  });
});
