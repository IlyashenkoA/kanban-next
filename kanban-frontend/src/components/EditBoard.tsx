import { useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '@/store/reducers';
import { DeleteBoardModal } from './Modal/Board/DeleteBoardModal';
import { EditBoardModal } from './Modal/Board/EditBoardModal';

export const EditBoard = () => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);
  const [toggleEditBoardModal, setToggleEditBoardModal] =
    useState<boolean>(false);
  const [toggleDeleteBoardModal, setToggleDeleteBoardModal] =
    useState<boolean>(false);
  const { currentBoard } = useSelector(
    (state: RootState) => state.KanbanReducer
  );

  return (
    <>
      {toggleDeleteBoardModal ? (
        <DeleteBoardModal
          deleteItem={currentBoard?.name}
          deleteId={currentBoard?._id!}
          toggleModal={setToggleDeleteBoardModal}
        />
      ) : null}
      {toggleEditBoardModal ? (
        <EditBoardModal toggleModal={setToggleEditBoardModal} />
      ) : null}
      <button
        className='h-4 lg:h-5 w-2.5 bg-center bg-no-repeat bg-mobile-board-expand
          lg:bg-desktop-board-expand'
        onClick={() => setToggleMenu(prev => !prev)}
      ></button>
      {toggleMenu && (
        <div
          className='absolute right-6 top-[90%] flex flex-col gap-y-4 p-4
            bg-white dark:bg-dark-bg rounded-lg shadow-primary-shadow z-10'
        >
          <button
            className='text-medium-grey font-medium w-40 text-left text-sm'
            onClick={() => {
              setToggleEditBoardModal(true);
              setToggleMenu(false);
            }}
          >
            Edit Board
          </button>
          <button
            className='text-red font-medium w-40 text-left text-sm'
            onClick={() => {
              setToggleDeleteBoardModal(true);
              setToggleMenu(false);
            }}
          >
            Delete Board
          </button>
        </div>
      )}
    </>
  );
};
