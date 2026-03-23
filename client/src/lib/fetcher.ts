import { UseQueryOptions, useQuery } from '@tanstack/react-query';

export async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(path, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Failed to fetch ${path}: ${response.status}`);
  return response.json() as Promise<T>;
}

export function useJsonQuery<TQueryFnData, TData = TQueryFnData>(
  queryKey: readonly unknown[],
  path: string,
  options?: Omit<UseQueryOptions<TQueryFnData, Error, TData, readonly unknown[]>, 'queryKey' | 'queryFn'>,
) {
  return useQuery<TQueryFnData, Error, TData, readonly unknown[]>({
    queryKey,
    queryFn: () => fetchJson<TQueryFnData>(path),
    staleTime: 1000 * 60 * 10,
    gcTime: 1000 * 60 * 30,
    ...options,
  });
}
