import type { LoaderFunction } from '~/types';
import { redirect } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { Form, useLoaderData } from '@remix-run/react';
import { Button } from 'ui';
import { destroySession, getSession } from '~/session.server';
import { authHandler } from '~/utils/auth/authHandler.server';

type LoaderData = {
  access_token?: string;
  refresh_token?: string;
  file?: string;
};

export const loader: LoaderFunction = async ({
  context: { env, supabase },
  request,
}) => {
  const sessionPromise = getSession(request, env);
  const session = await sessionPromise;
  const access_token = (session.get('access_token') || undefined) as
    | string
    | undefined;
  const refresh_token = (session.get('refresh_token') || undefined) as
    | string
    | undefined;

  // const response = await fetch('https://devio2022.himorishige.com/api/coffee');
  const response = await env.API_GATEWAY.fetch('https://.../api/coffee');
  const data = await response.json<{ file: string }>();

  // return json<LoaderData>({ access_token, refresh_token, file: data.file });

  return authHandler(
    request,
    env,
    supabase,
    () => json<LoaderData>({ access_token, refresh_token, file: data.file }),
    () => redirect('/dashboard/login'),
  );
};

export default function Index() {
  const { access_token, refresh_token, file } = useLoaderData() as LoaderData;

  return (
    <main>
      <div>
        <p>{access_token}</p>
        <p>{refresh_token}</p>
      </div>
      <Form method="post" action="/dashboard/logout">
        <Button type="submit">Logout</Button>
      </Form>
      <div className="overflow-hidden mx-auto max-w-xs bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <img className="object-cover w-full h-56" src={file} alt="avatar" />

        <div className="py-5 text-center">
          <a
            href="#"
            className="block text-2xl font-bold text-gray-800 dark:text-white"
          >
            John Doe
          </a>
          <span className="text-sm text-gray-700 dark:text-gray-200">
            Software Engineer
          </span>
        </div>
      </div>
    </main>
  );
}
