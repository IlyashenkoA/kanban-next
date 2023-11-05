import { Button, withBaseColor } from '../Button';

export const DestructiveButton = withBaseColor(
  Button,
  'text-sm text-white font-bold py-2.5 px-15 bg-red hover:bg-red-hover disabled:hover:bg-red disabled:opacity-25 rounded-[1.25rem] w-full'
);
