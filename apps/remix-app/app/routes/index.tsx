import type { LoaderFunction } from '@remix-run/cloudflare';
import { json } from '@remix-run/cloudflare';
import { Form, useLoaderData } from '@remix-run/react';
import { About } from '~/components/About/About';
import { getSession } from '~/session.server';

type LoaderData = {
  username?: string;
};

export const loader: LoaderFunction = async ({ context: { env }, request }) => {
  const sessionPromise = getSession(request, env);

  const session = await sessionPromise;
  const username = (session.get('username') || undefined) as string | undefined;

  return json<LoaderData>({ username });
};

export default function Index() {
  const { username } = useLoaderData() as LoaderData;

  return (
    <main>
      <About />
    </main>
  );
}
