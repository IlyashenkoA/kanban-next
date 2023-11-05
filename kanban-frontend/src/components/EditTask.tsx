import { useState } from 'react';

import { DeleteTaskModal } from '@/components/Modal/Task/DeleteTaskModal';
import { EditTaskModal } from '@/components/Modal/Task/EditTaskModal';

import { ITask } from '@/types/kanban';

export const EditTask: React.FC<{ data: ITask }> = ({ data }) => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [toggleEditBoardModal, setToggleEditBoardModal] =
    useState<boolean>(false);
  const [toggleDeleteBoardModal, setToggleDeleteBoardModal] =
    useState<boolean>(false);

  return (
    <>
      {toggleDeleteBoardModal ? (
        <DeleteTaskModal
          deleteItem={data}
          toggleModal={setToggleDeleteBoardModal}
        />
      ) : null}
      {toggleEditBoardModal ? (
        <EditTaskModal task={data} toggleModal={setToggleEditBoardModal} />
      ) : null}
      <button
        className='h-4 lg:h-5 w-2.5 bg-center bg-no-repeat bg-mobile-board-expand
          lg:bg-desktop-board-expand bg-no-repeat'
        onClick={() => setToggleMenu(prev => !prev)}
        type='button'
      ></button>
      {toggleMenu && (
        <div
          className='absolute -right-[20%] top-[90%] flex flex-col
          gap-y-4 p-4 w-48 bg-white dark:bg-dark-bg rounded-lg
          shadow-primary-shadow z-10'
        >
          <button
            className='text-medium-grey font-medium text-left text-sm'
            onClick={() => {
              setToggleEditBoardModal(true);
              setToggleMenu(false);
            }}
          >
            Edit Task
          </button>
          <button
            className='text-red font-medium text-left text-sm'
            onClick={() => {
              setToggleDeleteBoardModal(true);
              setToggleMenu(false);
            }}
          >
            Delete Task
          </button>
        </div>
      )}
    </>
  );
};
