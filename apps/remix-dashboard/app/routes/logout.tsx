import type { ActionFunction, LoaderFunction } from '~/types';
import { redirect } from '@remix-run/cloudflare';

export const loader: LoaderFunction = () => {
  return redirect('/dashboard');
};

export const action: ActionFunction = async ({ request, context: { env } }) => {
  const response = await env.AUTH_SERVICE.fetch('http://.../logout', {
    method: 'POST',
    headers: request.headers,
  });

  const data = await response.json<{ success: boolean }>();
  console.log(data);

  return redirect('/dashboard/login', {
    headers: {
      'Set-Cookie': response.headers.get('Set-Cookie') || '',
    },
  });
};

export default function Logout() {
  return null;
}
