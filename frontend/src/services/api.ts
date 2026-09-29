const API_URL = "http://127.0.0.1:8000";

export async function getProfile() {
  const res = await apiFetch("/profile");
    if (!res.ok) {
        throw new Error("Failed to fetch profile");
    }

    return res.json();
}

// frontend/src/api.ts
export async function getGenres() {
    const response = await fetch(
        "http://127.0.0.1:8000/genre-breakdown",
        {
            credentials: "include"
        }
    );

    if (!response.ok) {
        throw new Error("Failed to fetch genres");
    }

    return response.json();
}


export function apiFetch(path: string, options: RequestInit = {}) {
  return fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
  });
}