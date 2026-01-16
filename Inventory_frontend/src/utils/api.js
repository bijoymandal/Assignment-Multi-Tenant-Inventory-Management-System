const API_BASE = import.meta.env.VITE_API_BASE_URL;

export async function apiFetch(url, options = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API_BASE}${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers
    }
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.message || "API Error");
  }

  return await res.json();
}
