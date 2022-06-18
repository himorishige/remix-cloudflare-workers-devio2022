import { json, redirect } from '@remix-run/cloudflare';
import { Form } from '@remix-run/react';
import { commitSession, getSession } from '~/session.server';
import type { ActionFunction, LoaderFunction } from '~/types';
import { authHandler } from '~/utils/auth/authHandler.server';

export const action: ActionFunction = async ({
  request,
  context: { env, supabase },
}) => {
  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  if (typeof email !== 'string' || email.length === 0) {
    return json({ errors: { title: 'Email is required' } }, { status: 422 });
  }

  if (typeof password !== 'string' || password.length === 0) {
    return json({ errors: { title: 'Password is required' } }, { status: 422 });
  }

  // sing in
  const {
    user,
    session: sessionData,
    error: signInError,
  } = await supabase.auth.signIn({ email, password });

  console.log(sessionData);

  if (sessionData?.access_token) {
    const session = await getSession(request.headers.get('Cookie'), env);
    session.set('access_token', sessionData?.access_token);
    session.set('reflesh_token', sessionData?.refresh_token);

    return redirect('/dashboard', {
      headers: {
        'Set-Cookie': await commitSession(session, env),
      },
    });
  }

  return json({ user, signInError });
};

export const loader: LoaderFunction = async ({
  request,
  context: { env, supabase },
}) => {
  return authHandler(
    request,
    env,
    supabase,
    () => redirect('/dashboard'),
    () => json({}),
  );
};

export default function Login() {
  return (
    <div>
      <h1>Log In</h1>
      <Form method="post">
        <div>
          <input type="text" name="email" placeholder="email" />
        </div>
        <div>
          <input type="password" name="password" placeholder="password" />
        </div>
        <button type="submit">Log in</button>
      </Form>
    </div>
  );
}
