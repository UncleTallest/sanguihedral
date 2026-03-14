import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import DamageTracker from "./DamageTracker";

describe("DamageTracker Component", () => {
  const defaultProps = {
    superficial: 2,
    aggravated: 1,
    max: 5,
    onChange: vi.fn(),
  };

  it("renders the correct number of boxes with appropriate symbols", () => {
    render(<DamageTracker {...defaultProps} />);
    const boxes = screen.getAllByRole("button");
    expect(boxes).toHaveLength(5);
    
    // Aggravated (X) should be first
    expect(boxes[0]).toHaveTextContent("X");
    // Superficial (/) should follow
    expect(boxes[1]).toHaveTextContent("/");
    expect(boxes[2]).toHaveTextContent("/");
    // Empty boxes last
    expect(boxes[3]).toHaveTextContent("");
    expect(boxes[4]).toHaveTextContent("");
  });

  it("cycles from empty to superficial on click", () => {
    const onChange = vi.fn();
    render(<DamageTracker superficial={0} aggravated={0} max={5} onChange={onChange} />);
    const boxes = screen.getAllByRole("button");
    
    fireEvent.click(boxes[0]);
    expect(onChange).toHaveBeenCalledWith({ superficial: 1, aggravated: 0 });
  });

  it("cycles from superficial to aggravated on click", () => {
    const onChange = vi.fn();
    render(<DamageTracker superficial={1} aggravated={0} max={5} onChange={onChange} />);
    const boxes = screen.getAllByRole("button");
    
    // Box 0 is the superficial one
    fireEvent.click(boxes[0]);
    expect(onChange).toHaveBeenCalledWith({ superficial: 0, aggravated: 1 });
  });

  it("cycles from aggravated to empty on click", () => {
    const onChange = vi.fn();
    render(<DamageTracker superficial={0} aggravated={1} max={5} onChange={onChange} />);
    const boxes = screen.getAllByRole("button");
    
    // Box 0 is the aggravated one
    fireEvent.click(boxes[0]);
    expect(onChange).toHaveBeenCalledWith({ superficial: 0, aggravated: 0 });
  });

  it("handles overflow: adding superficial to a full track converts one to aggravated", () => {
    const onChange = vi.fn();
    // 5 boxes, 5 superficial
    render(<DamageTracker superficial={5} aggravated={0} max={5} onChange={onChange} />);
    const boxes = screen.getAllByRole("button");
    
    // Click any box (they are all superficial)
    fireEvent.click(boxes[4]);
    expect(onChange).toHaveBeenCalledWith({ superficial: 4, aggravated: 1 });
  });
});
