import type { ComponentProps } from 'react';
import { useState } from 'react';

export type HeaderProps = ComponentProps<'header'>;

export const Header = (props: HeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const clickHandler = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="bg-white dark:bg-gray-800">
      <nav className="px-6 py-4 shadow">
        <div className="lg:items-center lg:justify-between lg:flex">
          <div className="flex items-center justify-between">
            <div>
              <a
                className="text-2xl font-bold text-gray-800 dark:text-white lg:text-3xl hover:text-gray-700 dark:hover:text-gray-300"
                href="/"
              >
                DevelopersIO 2022
              </a>
            </div>
            {/* Mobile menu button */}
            <div className="lg:hidden">
              <button
                type="button"
                onClick={clickHandler}
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="Toggle menu"
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
                  <path d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
                </svg>
              </button>
            </div>
          </div>
          {/* Mobile Menu open: "block", Menu closed: "hidden" */}
          {isOpen ? (
            <>
              <div className="flex flex-col mt-2 -mx-2 lg:mt-0 lg:flex-row lg:block">
                <a
                  href="/"
                  className="px-2 py-2 text-sm text-gray-800 rounded-md dark:text-gray-200 hover:bg-gray-900 hover:text-gray-100 hover:font-medium lg:mx-2"
                >
                  Home
                </a>
                <a
                  href="/blog/"
                  className="px-2 py-2 text-sm text-gray-800 rounded-md dark:text-gray-200 hover:bg-gray-900 hover:text-gray-100 hover:font-medium lg:mx-2"
                >
                  Blog
                </a>
              </div>
            </>
          ) : (
            <>
              <div className="flex flex-col mt-2 -mx-2 lg:mt-0 lg:flex-row lg:block hidden">
                <a
                  href="/"
                  className="px-2 py-2 text-sm text-gray-800 rounded-md dark:text-gray-200 hover:bg-gray-900 hover:text-gray-100 hover:font-medium lg:mx-2"
                >
                  Home
                </a>
                <a
                  href="/blog/"
                  className="px-2 py-2 text-sm text-gray-800 rounded-md dark:text-gray-200 hover:bg-gray-900 hover:text-gray-100 hover:font-medium lg:mx-2"
                >
                  Blog
                </a>
              </div>
            </>
          )}
        </div>
      </nav>
    </header>
  );
};
