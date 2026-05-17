const API_URL = "http://localhost:3333/api";

export function getToken() {
  return localStorage.getItem("token");
}

export async function apiFetch(endpoint, options = {}) {
  const token = getToken();

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(data.error || "Erro na requisição");
  }

  return data;
}

export function login(email, password) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function register(name, email, password) {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });
}

export function getChallenges() {
  return apiFetch("/challenges");
}

export function completeChallenge(id) {
  return apiFetch(`/challenges/${id}/complete`, {
    method: "POST",
  });
}

export function getRanking() {
  return apiFetch("/ranking");
}

export function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}