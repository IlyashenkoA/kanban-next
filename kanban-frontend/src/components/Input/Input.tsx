import { HTMLInputTypeAttribute } from 'react';
import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';

import { IFormValues, ILoginFormValues } from '@/lib/react-hook-form';

type LoginTextFieldProps<T extends keyof ILoginFormValues> = {
  type: HTMLInputTypeAttribute;
  id: string;
  name: T;
  placeholder: string;
  register: UseFormRegister<ILoginFormValues>;
  registerOptions?: RegisterOptions<ILoginFormValues, T>;
  errors?: FieldErrors<ILoginFormValues>;
  render?: (errors: FieldErrors<ILoginFormValues>) => JSX.Element | null;
};

type TextFieldProps<T extends keyof IFormValues> = {
  type: HTMLInputTypeAttribute;
  id: string;
  name: T;
  placeholder: string;
  register: UseFormRegister<IFormValues>;
  registerOptions?: RegisterOptions<IFormValues, T>;
  errors?: FieldErrors<IFormValues>;
  render?: (errors: FieldErrors<IFormValues>) => JSX.Element | null;
};

export const Input = <T extends keyof IFormValues>({
  type,
  id,
  name,
  placeholder,
  register,
  registerOptions,
  errors,
  render,
}: TextFieldProps<T>) => {
  return (
    <div
      className='textfield-container inline-flex items-center justify-between
      text-sm w-full border border-medium-grey/[0.248914]
      rounded invalid:border-red hover:border-main-purple'
    >
      <input
        id={id}
        type={type}
        className='bg-transparent text-black dark:text-white placeholder-black/[0.25]
      dark:placeholder-white/[0.25] px-4 py-2 rounded focus:outline-none flex-auto cursor-pointer'
        placeholder={placeholder}
        {...register(name, registerOptions)}
        onClick={e => e.stopPropagation()}
      />
      {errors && render ? render(errors) : null}
    </div>
  );
};

export const InputLogin = <T extends keyof ILoginFormValues>({
  type,
  id,
  name,
  placeholder,
  register,
  registerOptions,
  errors,
  render,
}: LoginTextFieldProps<T>) => {
  if (type === 'textarea') {
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
  }

  return (
    <div
      className='textfield-container inline-flex items-center justify-between
      text-sm w-full border border-medium-grey/[0.248914]
      rounded invalid:border-red hover:border-main-purple'
    >
      <input
        id={id}
        type={type}
        className='bg-transparent text-black dark:text-white placeholder-black/[0.25]
      dark:placeholder-white/[0.25] px-4 py-2 rounded focus:outline-none flex-auto cursor-pointer'
        placeholder={placeholder}
        {...register(name, registerOptions)}
        onClick={e => e.stopPropagation()}
      />
      {errors && render ? render(errors) : null}
    </div>
  );
};
