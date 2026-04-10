declare module '@supabase/supabase-js' {
  export type RealtimePostgresChangesFilter<T extends string> = {
    event: '*' | 'INSERT' | 'UPDATE' | 'DELETE';
    schema: string;
    table: T;
  };

  export interface SupabaseQueryResult<T> {
    data: T;
    error: Error | null;
  }

  export interface SupabaseQueryBuilder<T> {
    select(columns?: string): Promise<SupabaseQueryResult<T[]>>;
    insert(values: Partial<T> | Partial<T>[]): Promise<SupabaseQueryResult<T[]>>;
    update(values: Partial<T>): {
      eq(column: string, value: string): Promise<SupabaseQueryResult<T[]>>;
    };
    delete(): {
      eq(column: string, value: string): Promise<SupabaseQueryResult<T[]>>;
      in(column: string, values: string[]): Promise<SupabaseQueryResult<T[]>>;
    };
    upsert(values: Partial<T> | Partial<T>[]): Promise<SupabaseQueryResult<T[]>>;
    eq(column: string, value: string): SupabaseQueryBuilder<T>;
    in(column: string, values: string[]): SupabaseQueryBuilder<T>;
    order(column: string, options?: { ascending?: boolean }): SupabaseQueryBuilder<T>;
  }

  export interface RealtimeChannel {
    on(
      type: 'postgres_changes',
      filter: RealtimePostgresChangesFilter<string>,
      callback: () => void,
    ): RealtimeChannel;
    subscribe(): RealtimeChannel;
  }

  export interface SupabaseClient {
    from<T = Record<string, unknown>>(table: string): SupabaseQueryBuilder<T>;
    channel(name: string): RealtimeChannel;
    removeChannel(channel: RealtimeChannel): Promise<'ok' | 'error' | 'timed out'>;
  }

  export function createClient(url: string, key: string): SupabaseClient;
}
