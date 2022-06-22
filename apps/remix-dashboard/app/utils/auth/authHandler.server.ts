import {
  getUserByAccessToken,
  hasActiveAuthSession,
  refreshUserToken,
  setAuthSession,
} from '~/utils/auth/auth.server';

import { redirect } from '@remix-run/cloudflare';
import type { User, SupabaseClient } from '@supabase/supabase-js';
import { commitSession, getSession } from '~/session.server';

export const authHandler = async (
  request: Request,
  env: Env,
  onSuccess: (user: User) => Response | Promise<Response>,
  onFailure: () => Response | Promise<Response>,
  redirectTo?: string,
): Promise<Response> => {
  try {
    // let session = await getSession(request.headers.get('Cookie'), env);

    const url = new URL(request.url);
    const redirectUrl =
      redirectTo || `${url.origin}${url.pathname}${url.search}`;

    const { isActiveAuthSession } = await fetch(
      'http://localhost:8082/is-active-auth-session',
      {
        headers: request.headers,
      },
    ).then((res) => res.json<{ isActiveAuthSession: boolean }>());

    console.log('isAuth', isActiveAuthSession);

    // const isActiveAuthSession = await hasActiveAuthSession(session, supabase);
    if (!isActiveAuthSession) {
      // const { accessToken, refreshToken, error } = await refreshUserToken(
      //   session,
      //   supabase,
      // );
      const response = await fetch('http://localhost:8082/refresh-token', {
        headers: request.headers,
      });
      const { accessToken, refreshToken, error } = await response.json<{
        accessToken: string;
        refreshToken: string;
        error?: string;
      }>();

      if (error || !accessToken || !refreshToken) {
        throw new Error('refreshUserToken ' + error);
      }

      // session = setAuthSession(session, accessToken, refreshToken);
      return redirect(redirectUrl, {
        headers: {
          'Set-Cookie': response.headers.get('Set-Cookie') || '',
        },
      });
    }

    const response = await fetch(
      'http://localhost:8082/get-user-by-access-token',
      {
        headers: request.headers,
      },
    );
    const { user, error } = await response.json<{
      user: User;
      error?: string;
    }>();

    // const { user, error: accessTokenError } = await getUserByAccessToken(
    //   session.get('access_token'),
    //   supabase,
    // );

    if (error || !user || !user.email || !user.id) {
      throw new Error('getUserByAccessToken ' + error);
    }

    return await onSuccess(user);
  } catch (error) {
    console.log(error); // You should log this error to your logging system
    return onFailure();
  }
};
