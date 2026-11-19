const API_URL = "https://spotifyapp-spx5.onrender.com/";

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
        "https://spotifyapp-spx5.onrender.com//genre-breakdown",
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