// backend base URL
const BASE_URL = "http://localhost:5000";

// get token from localStorage
function getToken() {
  return localStorage.getItem("token");
}

// save token
function setToken(token) {
  localStorage.setItem("token", token);
}

// remove token (logout)
function clearToken() {
  localStorage.removeItem("token");
}

// auth header helper
function authHeader() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
