'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
import axios, { AxiosError, AxiosResponse } from 'axios';

import { PrimarySmallButton } from '@/components/HOC/Buttons/PrimarySmallButton';
import { InputLogin } from '@/components/Input/Input';

import { ILoginFormValues } from '@/lib/react-hook-form';

export default function SignUp() {
  const [loginError, setLoginError] = useState<boolean>(false);
  const [loginErrorMessage, setLoginErrorMessage] = useState<string>('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILoginFormValues>();
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/login`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(response => {
        const { redirect } = response.data;

        if (redirect) {
          router.push('/');
        }
      });
  }, []);

  const { mutate } = useMutation({
    mutationFn: async (user: ILoginFormValues) => {
      return await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/auth/signup`,
        user
      );
    },
    onSuccess: (data: AxiosResponse) => {
      const { token } = data.data;
      localStorage.setItem('token', token);

      router.push('/');
    },
    onError: (error: AxiosError) => {
      setLoginError(true);
      setLoginErrorMessage((error.response?.data as { error: string })?.error);
    },
  });

  const onSubmit: SubmitHandler<ILoginFormValues> = data => {
    const { email, password } = data;

    mutate({ email, password });
  };

  return (
    <div className='grid place-items-center h-screen max-w-[30rem] m-auto'>
      <form
        className='bg-white dark:bg-dark-grey
          rounded-lg shadow-secondary-shadow p-8 w-11/12'
        onSubmit={handleSubmit(onSubmit)}
      >
        <h1 className='font-bold uppercase m-0 pb-8 text-black dark:text-white text-xl text-center'>
          Signup
        </h1>
        <div className='pb-6'>
          <label
            className='block pb-2 font-bold text-black text-s dark:text-white'
            htmlFor='email'
          >
            Email
          </label>
          <InputLogin
            id='email'
            type='email'
            name='email'
            placeholder='Your Email'
            register={register}
            registerOptions={{
              required: `Email is required`,
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Email is invalid',
              },
            }}
            errors={errors}
            render={errors => {
              return errors.email ? (
                <>
                  {errors.email.type === 'required' && (
                    <p className='pr-4 textfield-error text-red'>
                      {errors.email.message}
                    </p>
                  )}
                  {errors.email.type === 'pattern' && (
                    <p className='pr-4 textfield-error text-red'>
                      {errors.email.message}
                    </p>
                  )}
                </>
              ) : null;
            }}
          />
        </div>
        <div className='pb-6'>
          <label
            className='block pb-2 font-bold text-black text-s dark:text-white'
            htmlFor='password'
          >
            Password
          </label>
          <InputLogin
            id='password'
            type='password'
            name='password'
            placeholder='Your Password'
            register={register}
            registerOptions={{
              required: `Password is required`,
              validate: {
                minLength: value =>
                  value.length > 6 ||
                  'Password must be at least 6 characters long',
              },
            }}
            errors={errors}
            render={errors => {
              return (
                <>
                  {errors.password ? (
                    <>
                      {errors.password.type === 'required' && (
                        <p className='pr-4 textfield-error text-red'>
                          {errors.password.message}
                        </p>
                      )}
                      {errors.password.type === 'minLength' && (
                        <p className='pr-4 textfield-error text-red'>
                          {errors.password.message}
                        </p>
                      )}
                    </>
                  ) : null}
                </>
              );
            }}
          />
          {loginError && (
            <p className='pt-2 text-s text-red font-bold'>
              {loginErrorMessage}
            </p>
          )}
        </div>
        <PrimarySmallButton label='SIGNUP' submit={true} />
        <div className='text-center pt-6 text-m text-main-purple font-bold'>
          <p>
            Already a user?{' '}
            <a href='/login' className='hover:text-main-purple-hover underline'>
              LOGIN
            </a>
          </p>
        </div>
      </form>
    </div>
  );
}
