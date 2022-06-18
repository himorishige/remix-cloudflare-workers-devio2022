import { getAssetFromKV } from '@cloudflare/kv-asset-handler';
import type { AppLoadContext } from '@remix-run/cloudflare';
import { createRequestHandler } from '@remix-run/cloudflare';
import manifestJSON from '__STATIC_CONTENT_MANIFEST';

import * as build from 'remix-dashboard';

import { createSupabaseClient } from './supabase';

const assetManifest = JSON.parse(manifestJSON);
const handleRemixRequest = createRequestHandler(build, process.env.NODE_ENV);

export const remixAdapter = async (
  request: Request,
  env: Env,
  ctx?: ExecutionContext | FetchEvent,
): Promise<Response> => {
  try {
    let url = new URL(request.url);
    let ttl = url.pathname.startsWith('/build/')
      ? 60 * 60 * 24 * 365 // 1 year
      : 60 * 5; // 5 minutes
    return await getAssetFromKV(
      {
        request,
        waitUntil(promise) {
          return ctx?.waitUntil(promise);
        },
      },
      {
        ASSET_NAMESPACE: env.__STATIC_CONTENT,
        ASSET_MANIFEST: assetManifest,
        cacheControl: {
          browserTTL: ttl,
          edgeTTL: ttl,
        },
      },
    );
  } catch (error) {}
  try {
    const supabase = createSupabaseClient(env);
    const loadContext: AppLoadContext = { env, supabase };

    return await handleRemixRequest(request, loadContext);
  } catch (error) {
    console.log(error);
    return new Response('An unexpected error occurred', { status: 500 });
  }
};
