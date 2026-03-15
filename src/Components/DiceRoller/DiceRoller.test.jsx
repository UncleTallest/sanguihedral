import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import DiceRoller from "./DiceRoller";
import * as api from "../../utils/api";

// Mock the API
vi.mock("../../utils/api", () => ({
  rollDice: vi.fn(),
}));

describe("DiceRoller Container", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders with default values", () => {
    render(<DiceRoller />);
    expect(screen.getByText(/Total Pool/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /ROLL/i })).toBeInTheDocument();
  });

  it("triggers a roll and shows results after animation", async () => {
    const mockResponse = {
      total_successes: 3,
      dice_results: [10, 8, 2],
      hunger_results: [1],
      messy_critical: false,
      bestial_failure: true,
      critical_success: false,
    };
    
    api.rollDice.mockResolvedValue(mockResponse);

    render(<DiceRoller />);
    const rollButton = screen.getByRole("button", { name: /ROLL/i });
    
    fireEvent.click(rollButton);

    // Should show "Rolling..." or similar state
    expect(screen.getByText(/Rolling/i)).toBeInTheDocument();

    // Wait for result to appear
    await waitFor(() => {
      expect(screen.getByText("Total Successes: 3")).toBeInTheDocument();
    }, { timeout: 2000 });

    expect(screen.getByText(/BESTIAL FAILURE/i)).toBeInTheDocument();
  });
});
