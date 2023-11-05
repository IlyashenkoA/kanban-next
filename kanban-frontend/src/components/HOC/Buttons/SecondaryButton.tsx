import { Button, withBaseColor } from '../../HOC/Button';

export const SecondaryButton = withBaseColor(
  Button,
  `text-sm text-main-purple font-bold py-2.5 px-15 bg-main-purple/[0.1]
    hover:bg-main-purple/[0.25] dark:bg-white dark:hover:bg-white rounded-[1.25rem]
    disabled:hover:bg-main-purple/[0.1] dark:disabled:hover:bg-white disabled:opacity-25 w-full`
);
