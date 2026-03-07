import { QueryClient, QueryFunction } from "@tanstack/react-query";

function toUrl(u: string): string {
  if (/^https?:\/\//i.test(u)) return u;
  return u.startsWith("/") ? u : `/${u}`;
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
