import { Button, withBaseColor } from '../../HOC/Button';

export const PrimarySmallButton = withBaseColor(
  Button,
  'text-sm text-white font-bold py-2.5 px-15 bg-main-purple hover:bg-main-purple-hover disabled:hover:bg-main-purple disabled:opacity-25 rounded-[1.25rem] w-full'
);
