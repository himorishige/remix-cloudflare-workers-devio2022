import type {
  SupabaseClient,
  SupabaseClientOptions,
} from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';

const supabaseOptions: SupabaseClientOptions = {
  schema: 'public',
  persistSession: true,
  autoRefreshToken: true,
  detectSessionInUrl: true,
  fetch: fetch.bind(globalThis),
};

export const createSupabaseClient = (env: Env): SupabaseClient => {
  return createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, supabaseOptions);
};
