import type { ComponentProps } from 'react';

export type ButtonProps = ComponentProps<'button'>;

export const Button = (props: ButtonProps) => {
  return (
    <button className="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
      {props.children}
    </button>
  );
};