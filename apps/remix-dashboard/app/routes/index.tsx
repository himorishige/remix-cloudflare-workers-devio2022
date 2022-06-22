import type { LoaderFunction } from '~/types';
import { redirect } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { Form, useLoaderData } from '@remix-run/react';
import { Button } from 'ui';
import { authHandler } from '~/utils/auth/authHandler.server';
import { LineChart } from '~/components/LineChart';

type LoaderData = {
  access_token?: string;
  refresh_token?: string;
  file?: string;
};

export const loader: LoaderFunction = async ({ context: { env }, request }) => {
  const response = await fetch('https://devio2022.himorishige.com/api/coffee');
  // const response = await env.API_GATEWAY.fetch('https://.../api/coffee');
  const data = await response.json<{ file: string }>();

  const sessionResponse = await fetch('http://localhost:8082/session', {
    headers: {
      Cookie: request.headers.get('Cookie') || '',
    },
  });
  const { sessionData } = await sessionResponse.json<{
    sessionData: {
      access_token: string;
      refresh_token: string;
    };
  }>();

  return authHandler(
    request,
    env,
    () =>
      json<LoaderData>({
        access_token: sessionData.access_token,
        refresh_token: sessionData.refresh_token,
        file: data.file,
      }),
    () => redirect('/dashboard/login'),
  );
};

export default function Index() {
  const { access_token, refresh_token, file } = useLoaderData() as LoaderData;
  console.log(access_token, refresh_token);

  return (
    <main className="container mx-auto">
      <Form method="post" action="/dashboard/logout">
        <Button type="submit">Logout</Button>
      </Form>
      <div className="grid grid-cols-2 gap-4">
        <div className="overflow-hidden mx-auto w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <img className="object-cover w-full h-56" src={file} alt="avatar" />
          {/* <div className="w-full">
            <LineChart />
          </div> */}

          <div className="py-5 text-center">
            <span className="block text-2xl font-bold text-gray-800 dark:text-white">
              John Doe
            </span>
            <span className="text-sm text-gray-700 dark:text-gray-200">
              Software Engineer
            </span>
          </div>
        </div>
        <div className="overflow-hidden mx-auto w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          {/* <img className="object-cover w-full h-56" src={file} alt="avatar" /> */}
          <div className="w-full">
            <LineChart />
          </div>

          <div className="py-5 text-center">
            <span className="block text-2xl font-bold text-gray-800 dark:text-white">
              John Doe
            </span>
            <span className="text-sm text-gray-700 dark:text-gray-200">
              Software Engineer
            </span>
          </div>
        </div>
      </div>
    </main>
  );
}
