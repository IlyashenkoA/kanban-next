import { useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/store/reducers';
import { IColumn } from '@/types/kanban';

export const DropDown: React.FC<{
  defaultValue?: string;
  onChange: (value: string) => void;
}> = ({ defaultValue, onChange }) => {
  const [opened, setOpened] = useState<boolean>(false);
  const { currentBoard } = useSelector(
    (state: RootState) => state.KanbanReducer
  );
  const [status, setStatus] = useState<string>(
    defaultValue ? defaultValue : currentBoard.columns[0].status
  );

  return (
    <div className='dropdown-container relative flex flex-col gap-y-2 text-sm'>
      <button
        type='button'
        className='dropdown-toggle inline-flex items-center justify-between bg-transparent
        text-black dark:text-white placeholder-black/[0.25] dark:placeholder-white/[0.25]
          px-4 py-2 focus:outline-none border border-medium-grey/[0.248914] hover:border-main-purple
          rounded-sm min-w-[18.4375rem]'
        onClick={() => setOpened(prev => !prev)}
      >
        <span>{status}</span>
        <svg
          width='11'
          height='8'
          viewBox='0 0 11 8'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M0.79834 1.54858L5.49682 6.24707L10.1953 1.54858'
            stroke='#635FC7'
            strokeWidth='2'
          />
        </svg>
      </button>
      {opened === true ? (
        <ul
          className='dropdown-list absolute top-12 w-full flex flex-col gap-y-2
          p-4 text-medium-grey rounded-lg bg-white dark:bg-dark-bg
          shadow-[0_10px_20px_0_rgba(54,78,126,0.25)]'
        >
          {currentBoard.columns.map(item => {
            return (
              <li
                className='hover:text-main-purple cursor-pointer'
                key={item._id}
                onClick={() => {
                  setStatus(item.status);
                  setOpened(false);
                  onChange(item._id as keyof IColumn);
                }}
              >
                {item.status}
              </li>
            );
          })}
        </ul>
      ) : null}
    </div>
  );
};
