'use client';

import Portal from './HOC/Portal';

export const Loader = () => {
  return (
    <Portal>
      <div className='loader-wrapper absolute top-0 w-full h-full bg-black/[0.5] min-w-[375px] z-20'>
        <div className='absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4'>
          <div className='w-20 h-20 rounded-full animate-spin border-4 border-solid border-main-purple border-t-transparent'></div>
        </div>
      </div>
    </Portal>
  );
};
