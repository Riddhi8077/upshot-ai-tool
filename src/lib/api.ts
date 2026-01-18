const API_BASE = "https://upshotx.com/upshot-api";

export const apiFetch = async (
  endpoint: string,
  options: RequestInit & { noAuth?: boolean } = {}
) => {
  const token = localStorage.getItem("token");

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string>),
  };

  // ✅ Attach token unless explicitly disabled
  if (!options.noAuth && token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const res = await fetch(`${API_BASE}${endpoint}`, {
    ...options,
    headers,
  });

  // ✅ READ RAW TEXT FIRST (prevents JSON crash)
  const text = await res.text();

  let data: any = null;

  // ✅ Safely parse JSON only if present
  if (text) {
    try {
      data = JSON.parse(text);
    } catch (err) {
      console.error("Invalid JSON from API:", text);
      throw new Error("Server returned invalid response");
    }
  }

  // ✅ Proper error handling
  if (!res.ok) {
    throw new Error(
      data?.error ||
      data?.message ||
      `API Error (${res.status})`
    );
  }

  return data;
};
