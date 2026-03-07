import { QueryClient, QueryFunction } from "@tanstack/react-query";

const API_BASE = "https://skyforge-api.onrender.com";

function toUrl(u: string): string {
  if (/^https?:\/\//i.test(u)) return u;
  
  // In development, if we're on a different port than the API, use the proxy
  // This handles both standalone Vite (5173) and Express-Vite (5000)
  if (import.meta.env.DEV) {
    const path = u.startsWith("/") ? u : `/${u}`;
    return path;
  }
  
  const path = u.startsWith("/") ? u : `/${u}`;
  return `${API_BASE}${path}`;
}

async function throwIfResNotOk(res: Response) {
  if (!res.ok) {
    const text = (await res.text()) || res.statusText;
    throw new Error(`${res.status}: ${text}`);
  }
}

export async function apiRequest(
  method: string,
  url: string,
  data?: unknown | undefined,
): Promise<Response> {
  const target = toUrl(url);
  const options: RequestInit = {
    method,
    headers: data ? { 
      "Content-Type": "application/json",
      "Accept": "application/json"
    } : {
      "Accept": "application/json"
    },
    body: data ? JSON.stringify(data) : undefined,
  };

  try {
    const res = await fetch(target, options);
    await throwIfResNotOk(res);
    return res;
  } catch (err) {
    // If local fetch fails (e.g. server down or proxy error), try direct Render fallback in DEV
    if (import.meta.env.DEV && !url.startsWith("http")) {
      const fallbackTarget = `${API_BASE}${url.startsWith("/") ? url : `/${url}`}`;
      console.warn(`Local fetch failed, trying direct Render fallback: ${fallbackTarget}`, err);
      try {
        const res = await fetch(fallbackTarget, { ...options, mode: 'cors' });
        await throwIfResNotOk(res);
        return res;
      } catch (fallbackErr) {
        console.error(`Fallback API request failed: ${fallbackTarget}`, fallbackErr);
        throw fallbackErr;
      }
    }
    
    console.error(`API request failed: ${method} ${target}`, err);
    throw err;
  }
}

type UnauthorizedBehavior = "returnNull" | "throw";
export const getQueryFn: <T>(options: {
  on401: UnauthorizedBehavior;
}) => QueryFunction<T> =
  ({ on401: unauthorizedBehavior }) =>
  async ({ queryKey }) => {
    const res = await fetch(toUrl(queryKey.join("/") as string));

    if (unauthorizedBehavior === "returnNull" && res.status === 401) {
      return null;
    }

    await throwIfResNotOk(res);
    return await res.json();
  };

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: getQueryFn({ on401: "throw" }),
      refetchInterval: false,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
});
