import { Dispatch, SetStateAction } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AddBoardButton } from '@/components/Buttons/AddBoardButton';
import { SelectBoardButton } from '@/components/Buttons/SelectBoardButton';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

import { setActiveBoard } from '@/store/action-creators/action-creators';
import { RootState } from '@/store/reducers';
import { KanbanResponse } from '@/types/kanban';

export const MobileSidebar: React.FC<{
  data: KanbanResponse;
  closeModal: Dispatch<SetStateAction<boolean>>;
}> = ({ data, closeModal }) => {
  const { currentBoard } = useSelector(
    (state: RootState) => state.KanbanReducer
  );
  const {
    data: { boards },
  } = data;
  const dispatch = useDispatch();

  return (
    <div
      className='absolute md:hidden top-0 left-0 right-0 bottom-[-4.375rem] bg-black/[0.5] px-14 pt-4 z-10 min-w-[375px]'
      onClick={() => closeModal(false)}
    >
      <div
        className='bg-white dark:bg-dark-grey rounded-lg max-w-[16.5rem] m-auto mt-16'
        onClick={e => e.stopPropagation()}
      >
        <h2 className='pt-4 pl-6 text-s text-medium-grey uppercase font-bold mb-5 tracking-wide'>
          All Boards ({`${boards.length ? boards.length : 0}`})
        </h2>
        <ul className='mb-4 max-h-[10rem] overflow-y-auto'>
          {boards.map(item => {
            return (
              <li key={item._id}>
                <SelectBoardButton
                  name={item.name}
                  onClick={() => {
                    const board = boards.filter(
                      board => board._id === item._id
                    );
                    dispatch(setActiveBoard(board[0]));
                  }}
                  active={item._id === currentBoard._id}
                />
              </li>
            );
          })}
          <li>
            <AddBoardButton />
          </li>
        </ul>
        <div className='flex justify-center pb-4 px-4'>
          <ThemeSwitcher />
        </div>
      </div>
    </div>
  );
};
