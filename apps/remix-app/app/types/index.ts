import type {
  DataFunctionArgs as RemixDataFunctionArgs,
  Session,
  SessionStorage,
} from '@remix-run/cloudflare';

import type { SupabaseClient } from '@supabase/supabase-js';

export interface AppLoadContext {
  cache: Cache;
  supabase: SupabaseClient;
  env: Env;
  session: Session;
  sessionStorage: SessionStorage;
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
