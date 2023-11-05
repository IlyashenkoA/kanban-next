import { Button, withBaseColor } from '../../HOC/Button';

export const PrimaryLargeButton = withBaseColor(
  Button,
  'text-m text-white font-bold py-3.5 px-5 bg-main-purple hover:bg-main-purple-hover disabled:hover:bg-main-purple disabled:opacity-25 rounded-3xl'
);
