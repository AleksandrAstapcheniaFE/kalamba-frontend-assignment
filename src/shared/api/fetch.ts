import type { ApiClient } from './client';

/** Typed helpers on `ApiClient`; each returns `response.data` as `T`. */
export const post = async <T>(client: ApiClient, path: string, payload: unknown): Promise<T> => {
  const response = await client.post<T>(path, payload);
  return response.data;
};
export const get = async <T>(client: ApiClient, path: string): Promise<T> => {
  const response = await client.get<T>(path);
  return response.data;
};

export const put = async <T>(client: ApiClient, path: string, payload: unknown): Promise<T> => {
  const response = await client.put<T>(path, payload);
  return response.data;
};

export const del = async <T>(client: ApiClient, path: string): Promise<T> => {
  const response = await client.delete<T>(path);
  return response.data;
};
