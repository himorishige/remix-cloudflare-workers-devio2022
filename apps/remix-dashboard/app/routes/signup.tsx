import { json, redirect } from '@remix-run/cloudflare';
import { Form } from '@remix-run/react';
import type { ActionFunction } from '~/types';

export const action: ActionFunction = async ({
  request,
  context: { supabase },
}) => {
  const formData = await request.formData();
  const username = formData.get('username');
  const email = formData.get('email');
  const password = formData.get('password');

  if (typeof username !== 'string' || username.length === 0) {
    return json({ errors: { title: 'username is required' } }, { status: 422 });
  }

  if (typeof email !== 'string' || email.length === 0) {
    return json({ errors: { title: 'Email is required' } }, { status: 422 });
  }

  if (typeof password !== 'string' || password.length === 0) {
    return json({ errors: { title: 'Password is required' } }, { status: 422 });
  }

  await supabase.auth.signOut();

  // sing up user
  const {
    session: sessionData,
    user,
    error: signUpError,
  } = await supabase.auth.signUp({ email, password });

  if (!signUpError) {
    const { error: profileError } = await supabase
      .from('profiles')
      .insert([{ id: user?.id, username }]);

    if (profileError)
      return json({ errors: { title: profileError.message } }, { status: 422 });

    // session.set('access_token', sessionData?.access_token);
    // session.set('refresh_token', sessionData?.refresh_token);

    // return redirect('/dashboard');
    return json({ user, signUpError });
  }

  return json({ user, signUpError });
};

export default function SignUp() {
  return (
    <div>
      <h1>Sign Up</h1>
      <Form method="post">
        <div>
          <input type="text" name="email" placeholder="email" />
        </div>
        <div>
          <input type="text" name="username" placeholder="username" />
        </div>
        <div>
          <input type="password" name="password" placeholder="password" />
        </div>
        <button type="submit">Sign Up</button>
      </Form>
    </div>
  );
}
