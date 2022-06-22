import { json, redirect } from '@remix-run/cloudflare';
import { Form, Link } from '@remix-run/react';
import { commitSession, getSession } from '~/session.server';
import type { ActionFunction, LoaderFunction } from '~/types';
import { loginUser, setAuthSession } from '~/utils/auth/auth.server';
import { authHandler } from '~/utils/auth/authHandler.server';

type ActionData = {
  formError?: string;
  fields?: { email: string };
};

export const action: ActionFunction = async ({ request, context: { env } }) => {
  // const session = await getSession(request.headers.get('Cookie'), env);

  const formData = await request.formData();
  const email = formData.get('email');
  const password = formData.get('password');

  if (typeof email !== 'string' || email.length === 0) {
    return json({ errors: { title: 'Email is required' } }, { status: 422 });
  }

  if (typeof password !== 'string' || password.length === 0) {
    return json({ errors: { title: 'Password is required' } }, { status: 422 });
  }

  const response = await fetch('http://localhost:8082/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = (await response.json()) as {
    accessToken: string;
    refreshToken: string;
  };

  console.log(data);

  // return json({});
  // return redirect('/dashboard/');

  // // sing in
  // const { accessToken, refreshToken, error } = await loginUser({
  //   email,
  //   password,
  //   supabase,
  // });
  // if (error || !accessToken || !refreshToken) {
  //   return json<ActionData>(
  //     { formError: error || 'Something went wrong', fields: { email } },
  //     403,
  //   );
  // }

  // const newSession = setAuthSession(
  //   session,
  //   data.accessToken,
  //   data.refreshToken,
  // );

  return redirect('/dashboard/', {
    headers: {
      'Set-Cookie': response.headers.get('Set-Cookie') || '',
    },
  });
};

export const loader: LoaderFunction = async ({ request, context: { env } }) => {
  return await authHandler(
    request,
    env,
    () => redirect('/dashboard/'),
    () => json({}),
  );
};

export default function Login() {
  return (
    <div className="flex justify-center items-center min-h-[calc(100vh_-_68px_-_61px)]">
      <div className="overflow-hidden mx-auto w-full max-w-sm bg-white dark:bg-gray-800 rounded-lg shadow-md">
        <div className="py-4 px-6">
          <h2 className="text-3xl font-bold text-center text-gray-700 dark:text-white">
            DevelopersIO 2022
          </h2>
          <h3 className="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">
            Welcome Back
          </h3>
          <p className="mt-1 text-center text-gray-500 dark:text-gray-400">
            Login or create account
          </p>
          <Form method="post">
            <div className="mt-4 w-full">
              <input
                className="block py-2 px-4 mt-2 w-full text-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 bg-white dark:bg-gray-800 rounded-md border focus:border-blue-400 dark:border-gray-600 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300/40"
                type="email"
                placeholder="Email Address"
                aria-label="Email Address"
                name="email"
              />
            </div>
            <div className="mt-4 w-full">
              <input
                className="block py-2 px-4 mt-2 w-full text-gray-700 placeholder:text-gray-500 dark:placeholder:text-gray-400 bg-white dark:bg-gray-800 rounded-md border focus:border-blue-400 dark:border-gray-600 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300/40"
                type="password"
                placeholder="Password"
                aria-label="Password"
                name="password"
              />
            </div>
            <div className="flex justify-between items-center mt-4">
              <a
                href="/"
                className="text-sm text-gray-600 hover:text-gray-500 dark:text-gray-200"
              >
                Forget Password?
              </a>
              <button
                className="py-2 px-4 leading-5 text-white bg-gray-700 hover:bg-gray-600 rounded focus:outline-none transition-colors duration-200"
                type="submit"
              >
                Login
              </button>
            </div>
          </Form>
        </div>
        <div className="flex justify-center items-center py-4 text-center bg-gray-50 dark:bg-gray-700">
          <span className="text-sm text-gray-600 dark:text-gray-200">
            Don't have an account?{' '}
          </span>
          <Link
            to="/dashboard/register"
            className="mx-2 text-sm font-bold text-blue-500 dark:text-blue-400 hover:underline"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}
