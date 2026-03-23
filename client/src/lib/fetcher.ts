import { UseQueryOptions, useQuery } from '@tanstack/react-query';

const isDevelopment = import.meta.env.DEV;

export async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(path, { headers: { Accept: 'application/json' } });

  if (!response.ok) {
    throw new Error(`Failed to fetch ${path}: ${response.status} ${response.statusText}`.trim());
  }

  const contentType = response.headers.get('content-type')?.toLowerCase() ?? '';
  if (contentType.includes('application/json')) {
    return response.json() as Promise<T>;
  }

  const body = await response.text();
  const preview = body.replace(/\s+/g, ' ').trim().slice(0, 180);
  const previewSuffix = body.length > 180 ? '…' : '';
  const debugPreview = isDevelopment && preview ? ` Response preview: ${preview}${previewSuffix}` : '';

  throw new Error(
    `Expected JSON from ${path}, but received ${contentType || 'an unknown content type'}. ` +
      `This often means the request was rewritten to HTML instead of serving the JSON asset.${debugPreview}`,
  );
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
