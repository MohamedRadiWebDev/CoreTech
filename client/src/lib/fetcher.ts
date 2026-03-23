import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(path, { headers: { Accept: 'application/json' } });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status}`);
  }
  return response.json() as Promise<T>;
}

export function useJsonQuery<T>(
  queryKey: readonly unknown[],
  path: string,
  options?: Omit<UseQueryOptions<T, Error, T, readonly unknown[]>, 'queryKey' | 'queryFn'>,
) {
  return useQuery<T, Error, T, readonly unknown[]>({
    queryKey,
    queryFn: () => fetchJson<T>(path),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    ...options,
  });
}
