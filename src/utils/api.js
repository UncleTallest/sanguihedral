import { BASE_URL } from "./constants";
import { getToken } from "./token";

const makeRequest = (endpoint, options = {}) => {
  const token = getToken();
  return fetch(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
    ...options,
  }).then((res) => {
    if (res.ok) {
      return res.json();
    }
    return res.json().then((err) => Promise.reject(err));
  });
};

export const getCharacters = () => makeRequest("/characters");

export const getCharacter = (id) => makeRequest(`/characters/${id}`);

export const createCharacter = (data) =>
  makeRequest("/characters", {
    method: "POST",
    body: JSON.stringify(data),
  });

export const updateCharacter = (id, data) =>
  makeRequest(`/characters/${id}`, {
    method: "PATCH",
    body: JSON.stringify(data),
  });

export const deleteCharacter = (id) =>
  makeRequest(`/characters/${id}`, {
    method: "DELETE",
  });

export const rollDice = (totalDice, hungerDice, difficulty) =>
  makeRequest(`/dice/${totalDice}/${hungerDice}/${difficulty}`);
