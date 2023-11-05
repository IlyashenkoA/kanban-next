import { ChangeEvent, useState } from 'react';

const getDefaultStatus = () =>
  localStorage.theme === 'dark' ||
  (!('theme' in localStorage) &&
    window.matchMedia('(prefers-color-scheme: dark)').matches)
    ? true
    : false;

export const ThemeSwitcher = () => {
  const [checked, setChecked] = useState<boolean>(getDefaultStatus());

  const toggleTheme = (e: ChangeEvent<HTMLInputElement>) => {
    localStorage.setItem('theme', e.target.checked ? 'dark' : 'light');
    e.target.checked
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark');
    setChecked(e.target.checked);
  };

  return (
    <div className='inline-flex gap-x-6 px-4 py-3.5 bg-light-bg dark:bg-dark-bg rounded-md justify-center w-full'>
      <i className='block w-4.5 h-4.5 bg-sun bg-no-repeat bg-center bg-contain'></i>
      <label
        htmlFor='switch'
        className='theme-switcher inline-flex items-center w-10 h-5 bg-main-purple hover:bg-main-purple-hover rounded-xl cursor-pointer'
      >
        <input
          className='hidden'
          id='switch'
          type='checkbox'
          onChange={e => toggleTheme(e)}
          checked={checked}
        />
        <span className='inline-block w-3.5 h-3.5 rounded-[50%] translate-x-[0.1875rem] bg-white duration-300 ease-in-out'></span>
      </label>
      <i className='block w-4.5 h-4.5 bg-moon bg-no-repeat bg-center'></i>
    </div>
  );
};
