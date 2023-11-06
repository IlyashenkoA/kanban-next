import { Dispatch, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AddBoardButton } from '@/components/Buttons/AddBoardButton';
import { SelectBoardButton } from '@/components/Buttons/SelectBoardButton';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

import { setActiveBoard } from '@/store/action-creators/action-creators';
import { RootState } from '@/store/reducers';
import { KanbanResponse } from '@/types/kanban';

export const Sidebar: React.FC<{
  data: KanbanResponse;
  showSidebar: boolean;
  setShowSidebar: Dispatch<SetStateAction<boolean>>;
}> = ({ data, showSidebar, setShowSidebar }) => {
  const { currentBoard } = useSelector(
    (state: RootState) => state.KanbanReducer
  );
  const {
    data: { boards },
  } = data;
  const dispatch = useDispatch();

  return (
    <aside
      className={`sidebar flex flex-col w-[16.3rem] lg:w-[18.8rem] pb-8
      bg-white dark:bg-dark-grey border-r border-light-lines dark:border-dark-lines
      duration-300 ${showSidebar ? 'show' : 'hide'}`}
    >
      <h2 className='pt-4 pb-5 px-6 text-s text-medium-grey uppercase font-bold tracking-wide'>
        All Boards ({`${boards.length ? boards.length : 0}`})
      </h2>
      <ul className='mb-4 flex-auto max-h-[60vh] overflow-y-auto overflow-x-hidden pr-6'>
        {boards.map(item => (
          <li key={item._id}>
            <SelectBoardButton
              name={item.name}
              onClick={() => {
                const board = boards.filter(board => board._id === item._id);
                dispatch(setActiveBoard(board[0]));
              }}
              active={item._id === currentBoard?._id}
            />
          </li>
        ))}
        <li key={Date.now()}>
          <AddBoardButton />
        </li>
      </ul>
      <div className='flex flex-col flex-auto gap-y-2 justify-end'>
        <div className='px-6'>
          <ThemeSwitcher />
        </div>
        <button
          className='group inline-flex items-center gap-x-3 font-bold
          hover:bg-main-purple/[0.1] active:bg-main-purple/[0.1]
          hover:dark:bg-white active:dark:bg-white pl-6 pr-12 py-4
            w-[15rem] lg:w-[17.25rem] rounded-br-full rounded-tr-full'
          onClick={() => setShowSidebar(false)}
        >
          <svg
            width='18'
            height='16'
            viewBox='0 0 18 16'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              className='group-hover:fill-main-purple group-active:fill-main-purple'
              fillRule='evenodd'
              clipRule='evenodd'
              d='M17.7923 8.76153C16.7538 10.5238 15.1854 11.941 13.3062 12.8081L14.8099 14.9563C14.9286 15.1259 14.8874 15.3598 14.7177 15.4785L14.0697 15.9322C13.9 16.051 13.6662 16.0097 13.5474 15.84L3.19013 1.04373C3.07135 0.874074 3.11263 0.64023 3.28229 0.521481L3.93032 0.067825C4.09998 -0.050956 4.33382 -0.00967486 4.45257 0.159981L6.18775 2.63888C7.08163 2.38573 8.02525 2.25001 9 2.25001C12.7456 2.25001 16.0311 4.24982 17.7923 7.23847C18.0692 7.7084 18.0692 8.2916 17.7923 8.76153ZM1.50001 8C2.99714 10.5406 5.79513 12.25 9 12.25C9.07946 12.2499 9.15892 12.2487 9.23834 12.2465L10.239 13.676C9.82784 13.7253 9.4141 13.75 9 13.75C5.25438 13.75 1.96889 11.7502 0.207702 8.76156C-0.069234 8.29163 -0.069234 7.7084 0.207702 7.23847C0.997544 5.89816 2.09379 4.75732 3.4001 3.90623L4.26076 5.13569C3.12813 5.86432 2.17986 6.84635 1.50001 8ZM8.52194 11.2231C6.00685 10.9415 4.26532 8.50791 4.86788 6.00303L8.52194 11.2231ZM9.74494 3.78104C12.6351 4.02282 15.1201 5.65835 16.5 8C15.5721 9.57456 14.1446 10.8297 12.4302 11.5566L11.596 10.3649C13.2731 9.06931 13.7072 6.7886 12.75 4.99869L12.75 5C12.75 5.9665 11.9665 6.75 11 6.75C10.0335 6.75 9.25 5.9665 9.25 5C9.25 4.52594 9.43881 4.09619 9.74494 3.78104Z'
              fill='#828FA3'
            />
          </svg>
          <p
            className='text-m text-medium-grey group-hover:text-main-purple
            group-active:text-main-purple text-ellipsis whitespace-nowrap'
          >
            Hide Sidebar
          </p>
        </button>
      </div>
    </aside>
  );
};
