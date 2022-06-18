import type { LoaderFunction } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { Form, useLoaderData } from '@remix-run/react';
import { getSession } from '~/session.server';

type LoaderData = {
  access_token?: string;
  refresh_token?: string;
};

export const loader: LoaderFunction = async ({ context: { env }, request }) => {
  const sessionPromise = getSession(request, env);

  const session = await sessionPromise;
  const access_token = (session.get('access_token') || undefined) as
    | string
    | undefined;
  const refresh_token = (session.get('refresh_token') || undefined) as
    | string
    | undefined;

  return json<LoaderData>({ access_token, refresh_token });
};

export default function Index() {
  const { access_token, refresh_token } = useLoaderData() as LoaderData;

  return (
    <main>
      <div>
        <p>{access_token}</p>
        <p>{refresh_token}</p>
      </div>
      <Form method="post" id="username-form" action="/login">
        <div>
          <input
            name="username"
            type="text"
            placeholder="Choose a Username"
            required
            maxLength={32}
          />
          <button type="submit">Login</button>
        </div>
      </Form>
      <Form method="post" action="/dashboard/logout">
        <button type="submit">Logout</button>
      </Form>
    </main>
  );
}
