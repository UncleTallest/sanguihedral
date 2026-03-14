import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DotTracker from "./DotTracker";

describe("DotTracker Component", () => {
  it("renders the correct number of dots", () => {
    render(<DotTracker value={3} max={5} onChange={() => {}} />);
    const dots = screen.getAllByRole("button");
    expect(dots).toHaveLength(5);
    // Check classes to ensure 3 are filled, 2 are empty
    expect(dots[0]).toHaveClass("dot_filled");
    expect(dots[2]).toHaveClass("dot_filled");
    expect(dots[3]).toHaveClass("dot_empty");
  });

  it("calls onChange with correct value when a dot is clicked", () => {
    const handleChange = vi.fn();
    render(<DotTracker value={1} max={5} onChange={handleChange} />);
    const dots = screen.getAllByRole("button");
    fireEvent.click(dots[3]); // Clicking the 4th dot (index 3)
    expect(handleChange).toHaveBeenCalledWith(4);
  });

  it("calls onChange with 0 when the first dot is clicked and value is already 1", () => {
    const handleChange = vi.fn();
    render(<DotTracker value={1} max={5} onChange={handleChange} />);
    const dots = screen.getAllByRole("button");
    fireEvent.click(dots[0]); 
    expect(handleChange).toHaveBeenCalledWith(0);
  });
});
