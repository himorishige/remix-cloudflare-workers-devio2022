import type { ComponentProps } from 'react';

export type AboutProps = ComponentProps<'section'>;

export const About = (props: AboutProps) => {
  return (
    <section className="bg-white dark:bg-gray-800">
      <div className="container py-24 px-6 mx-auto">
        <div className="items-center lg:flex">
          <div className="lg:w-1/2">
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100">
              Who I am
            </h2>
            <p className="mt-4 text-gray-500 dark:text-gray-400 lg:max-w-md">
              Hi I am _himorishige , software engineer{' '}
              <a
                className="font-bold text-blue-600 dark:text-blue-400"
                href="https://twitter.com/_himorishige"
              >
                @_himorishige
              </a>{' '}
              , Lorem ipsum, dolor sit amet consectetur adipisicing elit. Illum
              in sed non alias, fugiat, commodi nemo ut fugit corrupti dolorem
              sequi ex veniam consequuntur id, maiores beatae ipsa omnis
              aliquam?
            </p>
            <div className="flex items-center -mx-2 mt-6">
              <a
                className="mx-2"
                href="https://twitter.com/_himorishige"
                aria-label="Twitter"
              >
                <svg
                  className="w-5 h-5 text-gray-700 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-400 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M492 109.5c-17.4 7.7-36 12.9-55.6 15.3 20-12 35.4-31 42.6-53.6-18.7 11.1-39.4 19.2-61.5 23.5C399.8 75.8 374.6 64 346.8 64c-53.5 0-96.8 43.4-96.8 96.9 0 7.6.8 15 2.5 22.1-80.5-4-151.9-42.6-199.6-101.3-8.3 14.3-13.1 31-13.1 48.7 0 33.6 17.2 63.3 43.2 80.7-16-.4-31-4.8-44-12.1v1.2c0 47 33.4 86.1 77.7 95-8.1 2.2-16.7 3.4-25.5 3.4-6.2 0-12.3-.6-18.2-1.8 12.3 38.5 48.1 66.5 90.5 67.3-33.1 26-74.9 41.5-120.3 41.5-7.8 0-15.5-.5-23.1-1.4C62.8 432 113.7 448 168.3 448 346.6 448 444 300.3 444 172.2c0-4.2-.1-8.4-.3-12.5C462.6 146 479 129 492 109.5z" />
                </svg>
              </a>
              <a
                className="mx-2"
                href="https://github.com/himorishige"
                aria-label="Github"
              >
                <svg
                  className="w-5 h-5 text-gray-700 hover:text-gray-600 dark:text-gray-200 dark:hover:text-gray-400 fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <path d="M256 32C132.3 32 32 134.9 32 261.7c0 101.5 64.2 187.5 153.2 217.9 1.4.3 2.6.4 3.8.4 8.3 0 11.5-6.1 11.5-11.4 0-5.5-.2-19.9-.3-39.1-8.4 1.9-15.9 2.7-22.6 2.7-43.1 0-52.9-33.5-52.9-33.5-10.2-26.5-24.9-33.6-24.9-33.6-19.5-13.7-.1-14.1 1.4-14.1h.1c22.5 2 34.3 23.8 34.3 23.8 11.2 19.6 26.2 25.1 39.6 25.1 10.5 0 20-3.4 25.6-6 2-14.8 7.8-24.9 14.2-30.7-49.7-5.8-102-25.5-102-113.5 0-25.1 8.7-45.6 23-61.6-2.3-5.8-10-29.2 2.2-60.8 0 0 1.6-.5 5-.5 8.1 0 26.4 3.1 56.6 24.1 17.9-5.1 37-7.6 56.1-7.7 19 .1 38.2 2.6 56.1 7.7 30.2-21 48.5-24.1 56.6-24.1 3.4 0 5 .5 5 .5 12.2 31.6 4.5 55 2.2 60.8 14.3 16.1 23 36.6 23 61.6 0 88.2-52.4 107.6-102.3 113.3 8 7.1 15.2 21.1 15.2 42.5 0 30.7-.3 55.5-.3 63 0 5.4 3.1 11.5 11.4 11.5 1.2 0 2.6-.1 4-.4C415.9 449.2 480 363.1 480 261.7 480 134.9 379.7 32 256 32z" />
                </svg>
              </a>
            </div>
          </div>
          <div className="mt-8 lg:mt-0 lg:w-1/2">
            <div className="flex justify-center items-center lg:justify-end">
              <div className="max-w-lg">
                <img
                  className="object-cover object-center w-full h-64 rounded-md shadow"
                  src="/images/profile.jpg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
