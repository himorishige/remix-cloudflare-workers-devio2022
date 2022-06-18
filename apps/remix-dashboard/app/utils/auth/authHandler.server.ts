import {
  getUserByAccessToken,
  hasActiveAuthSession,
  refreshUserToken,
  setAuthSession,
} from '~/utils/auth/auth.server';

import { redirect } from '@remix-run/cloudflare';
import type { User } from '@supabase/supabase-js';
import { commitSession, getSession } from '~/session.server';

export const authHandler = async (
  request: Request,
  env: Env,
  onSuccess: (user: User) => Response | Promise<Response>,
  onFailure: () => Response | Promise<Response>,
  redirectTo?: string,
): Promise<Response> => {
  try {
    let session = await getSession(request.headers.get('Cookie'), env);
    const url = new URL(request.url);
    const redirectUrl =
      redirectTo || `${url.origin}${url.pathname}${url.search}`;

    const isActiveAuthSession = await hasActiveAuthSession(session);
    if (!isActiveAuthSession) {
      const { accessToken, refreshToken, error } = await refreshUserToken(
        session,
      );
      if (error || !accessToken || !refreshToken) {
        throw new Error('refreshUserToken ' + error);
      }
      session = setAuthSession(session, accessToken, refreshToken);
      return redirect(redirectUrl, {
        headers: {
          'Set-Cookie': await commitSession(session, env),
        },
      });
    }

    const { user, error: accessTokenError } = await getUserByAccessToken(
      session.get('access_token'),
    );

    if (accessTokenError || !user || !user.email || !user.id) {
      throw new Error('getUserByAccessToken ' + accessTokenError);
    }

    return await onSuccess(user);
  } catch (error) {
    console.log(error); // You should log this error to your logging system
    return onFailure();
  }
};
