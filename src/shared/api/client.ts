import axios from 'axios';

/**
 * Axios instance for RealWorld API: injects `Authorization: Token …` from `getToken`, sets JSON base URL from `VITE_API_URL`.
 * Returned client is extended in `app/api.ts` (401 → logout). Do not import axios directly in features—use this factory.
 */
export const createApiClient = (getToken: () => string | undefined, logout: () => void) => {
  const client = axios.create({
    baseURL: import.meta.env.VITE_API_URL ?? 'http://localhost:3000/api',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  client.interceptors.request.use((config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Token ${token}`;
    }
    return config;
  });
  client.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        logout();
      }
      return Promise.reject(error);
    },
  );

  return client;
};

export type ApiClient = ReturnType<typeof createApiClient>;
