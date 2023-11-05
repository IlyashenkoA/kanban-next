import { RegisterOptions, UseFormRegister } from 'react-hook-form';

import { IFormValues } from '@/lib/react-hook-form';

type TextFieldProps<T extends keyof IFormValues> = {
  id: string;
  name: T;
  placeholder: string;
  register: UseFormRegister<IFormValues>;
  registerOptions?: RegisterOptions<IFormValues, T>;
};

export const TextArea = <T extends keyof IFormValues>({
  id,
  name,
  placeholder,
  register,
  registerOptions,
}: TextFieldProps<T>) => {
  return (
    <textarea
      id={id}
      className='bg-transparent text-black dark:text-white placeholder-black/[0.25]
        dark:placeholder-white/[0.25] text-sm px-4 py-2 focus:outline-none border border-medium-grey/[0.248914]
          rounded w-full min-h-[7rem] hover:border-main-purple cursor-pointer resize-none overflow-y-auto'
      placeholder={placeholder}
      {...register(name, registerOptions)}
      onClick={e => e.stopPropagation()}
    />
  );
};
