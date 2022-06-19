import type { ComponentProps } from 'react';

export type ButtonProps = ComponentProps<'button'>;

export const Button = (props: ButtonProps) => {
  return <button>{props.children}</button>;
};
