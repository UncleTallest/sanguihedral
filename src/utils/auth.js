import { BASE_URL } from "./constants";

const makeRequest = (endpoint, options = {}) =>
  fetch(`${BASE_URL}${endpoint}`, {
    headers: { "Content-Type": "application/json", ...options.headers },
    ...options,
  }).then((res) => res.json());

export const register = ({ name, email, password }) =>
  makeRequest("/signup", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

export const login = (email, password) =>
  makeRequest("/signin", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

export const getUserData = (token) =>
  makeRequest("/users/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
