import { signOutUser } from '~/utils/auth/auth.server';

import type { ActionFunction, LoaderFunction } from '~/types';
import { redirect } from '@remix-run/cloudflare';
import { destroySession, getSession } from '~/session.server';

export const loader: LoaderFunction = () => {
  return redirect('/dashboard');
};

export const action: ActionFunction = async ({
  request,
  context: { env, supabase },
}) => {
  let session = await getSession(request.headers.get('Cookie'), env);
  if (!session) {
    return redirect('/dashboard/login');
  }

  const { done, error } = await signOutUser(session, supabase);
  if (error || !done) {
    console.log('Error signing out user in supabase', error);
  }

  return redirect('/dashboard/login', {
    headers: { 'Set-Cookie': await destroySession(session, env) },
  });
};

export default function Logout() {
  return null;
}
