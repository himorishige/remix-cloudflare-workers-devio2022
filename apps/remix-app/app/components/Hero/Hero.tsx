import type { ComponentProps } from 'react';

export type HeaderProps = ComponentProps<'header'>;

export const Hero = (props: HeaderProps) => {
  return (
    <div className="flex flex-col-reverse bg-white dark:bg-gray-800 lg:flex-row">
      <div className="flex justify-center items-center py-8 px-6 w-full lg:w-1/2 lg:h-[32rem]">
        <div className="max-w-xl">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-white lg:text-3xl">
            DevelopersIO{' '}
            <span className="text-blue-600 dark:text-blue-400">2022</span>
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 lg:text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis
            commodi cum cupiditate ducimus, fugit harum id necessitatibus odio
            quam quasi, quibusdam rem tempora voluptates.
          </p>
          <div className="flex flex-col mt-6 space-y-3 lg:flex-row lg:space-y-0">
            <a
              href="/dashboard/login"
              className="block py-2 px-3 text-sm font-semibold text-center text-white bg-gray-900 hover:bg-gray-700 rounded-md transition-colors duration-200"
            >
              Get Started
            </a>
            <a
              href="/dashboard/signin"
              className="block py-2 px-3 text-sm font-semibold text-center text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md transition-colors duration-200 lg:mx-4"
            >
              Sign In
            </a>
          </div>
        </div>
      </div>
      <div className="w-full h-64 lg:w-1/2 lg:h-auto">
        <div
          className="w-full h-full bg-center bg-no-repeat bg-cover"
          style={{
            backgroundImage: 'url(/images/hero.jpg)',
          }}
        >
          <div className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};
