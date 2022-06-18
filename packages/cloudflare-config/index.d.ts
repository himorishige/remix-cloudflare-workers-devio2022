interface Env {
  __STATIC_CONTENT: KVNamespace;

  SESSION_KV: KVNamespace;

  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;

  SESSION_SECRET: string;
}
