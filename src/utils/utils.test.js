import { describe, it, expect, vi, beforeEach } from "vitest";
import { register, login, getUserData } from "./auth";
import { getToken, handleToken } from "./token";
import * as api from "./api";

// Mock fetch
global.fetch = vi.fn();

describe("Auth Utils", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("register calls fetch with correct params", async () => {
    fetch.mockResolvedValue({
      json: () => Promise.resolve({ name: "Test" }),
    });

    await register({ name: "Test", email: "test@ex.com", password: "123" });

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/signup"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ name: "Test", email: "test@ex.com", password: "123" }),
      })
    );
  });

  it("login calls fetch with correct params", async () => {
    fetch.mockResolvedValue({
      json: () => Promise.resolve({ token: "fake-token" }),
    });

    await login("test@ex.com", "123");

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/signin"),
      expect.objectContaining({
        method: "POST",
        body: JSON.stringify({ email: "test@ex.com", password: "123" }),
      })
    );
  });
});

describe("Token Utils", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("handleToken sets and removes token", () => {
    handleToken("my-token");
    expect(localStorage.getItem("jwt")).toBe("my-token");
    expect(getToken()).toBe("my-token");

    handleToken(null);
    expect(localStorage.getItem("jwt")).toBeNull();
  });
});

describe("API Utils", () => {
  beforeEach(() => {
    fetch.mockClear();
    localStorage.clear();
  });

  it("getCharacters includes auth header if token exists", async () => {
    handleToken("fake-jwt");
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([]),
    });

    await api.getCharacters();

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/characters"),
      expect.objectContaining({
        headers: expect.objectContaining({
          Authorization: "Bearer fake-jwt",
        }),
      })
    );
  });

  it("rollDice calls correct endpoint", async () => {
    fetch.mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({}),
    });

    await api.rollDice(5, 1, 2);

    expect(fetch).toHaveBeenCalledWith(
      expect.stringContaining("/dice/5/1/2"),
      expect.any(Object)
    );
  });
});
