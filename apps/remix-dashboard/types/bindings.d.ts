declare module '__STATIC_CONTENT_MANIFEST' {
  const manifestJSON: string;
  export default manifestJSON;
}

interface Env {
  __STATIC_CONTENT: KVNamespace;

  SESSION_SECRET: string;

  SUPABASE_URL: string;
  SUPABASE_ANON_KEY: string;
}
