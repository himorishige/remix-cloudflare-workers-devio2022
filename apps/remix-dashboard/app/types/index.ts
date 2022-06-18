import type { DataFunctionArgs as RemixDataFunctionArgs } from '@remix-run/cloudflare';

import type { SupabaseClient } from '@supabase/supabase-js';

export interface AppLoadContext {
  cache: Cache;
  supabase: SupabaseClient;
  env: Env;
}

export interface DataFunctionArgs
  extends Omit<RemixDataFunctionArgs, 'context'> {
  context: AppLoadContext;
}

export interface ActionFunction {
  (args: DataFunctionArgs): null | Response | Promise<Response>;
}

export interface LoaderFunction {
  (args: DataFunctionArgs): null | Response | Promise<Response>;
}

export type TypedWindow = Window &
  typeof globalThis & {
    ENV: {
      SUPABASE_URL: string;
      SUPABASE_ANON_KEY: string;
    };
  };

export type Error = { error?: string };
