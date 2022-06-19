import type { MetaFunction } from '@remix-run/cloudflare';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useCatch,
  useMatches,
} from '@remix-run/react';
import { Footer, Header } from 'ui';
import type { PropsWithChildren } from 'react';
import styles from './styles/app.css';

export const meta: MetaFunction = () => ({
  charset: 'utf-8',
  title: 'New Remix App',
  viewport: 'width=device-width,initial-scale=1',
});

export const links = () => {
  return [{ rel: 'stylesheet', href: styles }];
};

const Document = ({ children }: PropsWithChildren<{}>) => {
  const matches = useMatches();
  const root = matches.find((match) => match.id === 'root');
  console.log('root', root);

  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-white dark:bg-gray-900">
        <Header />
        {children}
        <Footer />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
};

export default function App() {
  return (
    <Document>
      <Outlet />
    </Document>
  );
}

export const CatchBoundary = () => {
  let { status, statusText } = useCatch();

  return (
    <Document>
      <main>
        <h1>{status}</h1>
        {statusText && <p>{statusText}</p>}
      </main>
    </Document>
  );
};

export const ErrorBoundary = ({ error }: { error: Error }) => {
  console.log(error);

  return (
    <Document>
      <main>
        <h1>Oops, looks like something went wrong 😭</h1>
      </main>
    </Document>
  );
};
