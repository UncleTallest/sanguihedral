const TOKEN_KEY = "jwt";

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const handleToken = (token) => {
  if (token) {
    localStorage.setItem(TOKEN_KEY, token);
    return token;
  }
  localStorage.removeItem(TOKEN_KEY);
};
