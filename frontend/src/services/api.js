const API_URL = import.meta.env.PROD
  ? "/api"
  : "http://localhost:3333/api";

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

  try {
    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      throw new Error(data.error || "Erro na requisição");
    }

    return data;
  } catch (error) {
    console.error("API ERROR:", error);

    throw new Error(
      error.message || "Erro ao conectar com o servidor"
    );
  }
}

/* AUTH */

export function login(email, password) {
  return apiFetch("/auth/login", {
    method: "POST",
    body: JSON.stringify({
      email,
      password,
    }),
  });
}

export function register(name, email, password) {
  return apiFetch("/auth/register", {
    method: "POST",
    body: JSON.stringify({
      name,
      email,
      password,
    }),
  });
}

export function logout() {
  localStorage.clear();
}

/* CHALLENGES */

export function getChallenges() {
  return apiFetch("/challenges");
}

export function completeChallenge(id) {
  return apiFetch(`/challenges/${id}/complete`, {
    method: "POST",
  });
}

/* RANKING */

export function getRanking() {
  return apiFetch("/ranking");
}