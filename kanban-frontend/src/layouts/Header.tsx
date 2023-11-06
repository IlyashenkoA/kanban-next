import { useState } from 'react';
import { useSelector } from 'react-redux';

import { EditBoard } from '@/components/EditBoard';
import { PrimaryLargeButton } from '@/components/HOC/Buttons/PrimaryLargeButton';
import { AddNewTaskModal } from '@/components/Modal/Task/AddNewTaskModal';

import { MobileBoardMenu } from '@/layouts/MobileBoardMenu';

import { RootState } from '@/store/reducers';
import { KanbanResponse } from '@/types/kanban';

export const Header: React.FC<{
  data: KanbanResponse;
}> = ({ data }) => {
  const { currentBoard } = useSelector(
    (state: RootState) => state.KanbanReducer
  );
  const [toggleAddTaskModal, setToggleAddTaskModal] = useState<boolean>(false);

  return (
    <>
      {toggleAddTaskModal && (
        <AddNewTaskModal toggleModal={setToggleAddTaskModal} />
      )}
      <header className='relative flex items-center gap-x-4 md:gap-x-6 p-4 w-full md:pl-6 md:pr-8 md:pt-5 md:pb-7.5 lg:pb-8 bg-white dark:bg-dark-grey'>
        <div className='md:w-[14.625rem] lg:w-[17.25rem]'>
          <i className='block min-w-[1.5rem] h-7 bg-mobile-logo bg-no-repeat md:bg-light-desktop-logo md:dark:bg-dark-desktop-logo md:h-[1.75rem] md:min-w-[9.6rem]' />
          <span className='hidden absolute top-0 left-[16.25rem] lg:left-[18.75rem] md:block w-px h-full bg-light-lines dark:bg-dark-lines'></span>
        </div>
        <nav className='inline-flex flex-auto justify-between'>
          <div className='inline-flex items-center gap-2 max-w-xs'>
            <h1
              className='text-l lg:text-xl font-bold text-black dark:text-white w-max
                text-ellipsis whitespace-nowrap overflow-hidden'
            >
              {currentBoard?.name}
            </h1>
            <MobileBoardMenu data={data} />
          </div>
          <div className='inline-flex items-center gap-x-4 md:gap-x-6'>
            <PrimaryLargeButton
              label={
                <>
                  <svg
                    className='md:hidden w-3 h-3'
                    width='12'
                    height='12'
                    viewBox='0 0 12 12'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M7.368 12V7.344H12V4.632H7.368V0H4.656V4.632H0V7.344H4.656V12H7.368Z'
                      fill='white'
                    />
                  </svg>
                  <p className='hidden md:inline-block text-m font-bold'>
                    + Add New Task
                  </p>
                </>
              }
              disabled={currentBoard?.columns.length > 0 ? false : true}
              onClick={() => setToggleAddTaskModal(true)}
            />
            <EditBoard />
          </div>
        </nav>
      </header>
    </>
  );
};
