import { renderHook, act } from "@testing-library/react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import useRollHistory from "./useRollHistory";

describe("useRollHistory Hook", () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it("initializes with an empty array if localStorage is empty", () => {
    const { result } = renderHook(() => useRollHistory());
    expect(result.current.history).toEqual([]);
  });

  it("adds a roll to the history", () => {
    const { result } = renderHook(() => useRollHistory());
    const newRoll = { id: 1, totalSuccesses: 3 };

    act(() => {
      result.current.addRoll(newRoll);
    });

    expect(result.current.history).toHaveLength(1);
    expect(result.current.history[0]).toEqual(expect.objectContaining(newRoll));
  });

  it("enforces the 25-roll limit (FIFO)", () => {
    const { result } = renderHook(() => useRollHistory());

    act(() => {
      for (let i = 1; i <= 30; i++) {
        result.current.addRoll({ id: i, val: i });
      }
    });

    expect(result.current.history).toHaveLength(25);
    // The oldest rolls (1-5) should be gone, index 0 should be the most recent (30)
    expect(result.current.history[0].id).toBe(30);
    expect(result.current.history[24].id).toBe(6);
  });

  it("persists history to localStorage", () => {
    const { result } = renderHook(() => useRollHistory());
    
    act(() => {
      result.current.addRoll({ id: "persist-test" });
    });

    const stored = JSON.parse(localStorage.getItem("sanguihedral_roll_history"));
    expect(stored[0].id).toBe("persist-test");
  });
});
