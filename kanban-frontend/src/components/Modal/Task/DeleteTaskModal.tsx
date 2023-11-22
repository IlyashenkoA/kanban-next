import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';

import { DestructiveButton } from '@/components/HOC/Buttons/DestructiveButton';
import { SecondaryButton } from '@/components/HOC/Buttons/SecondaryButton';
import { Loader } from '@/components/Loader';
import Portal from '@/components/HOC/Portal';

import { RootState } from '@/store/reducers';
import { ITask } from '@/types/kanban';

interface IDeleteModalProps {
  deleteItem: ITask;
  toggleModal: Dispatch<SetStateAction<boolean>>;
}

export const DeleteTaskModal: React.FC<IDeleteModalProps> = ({
  deleteItem,
  toggleModal,
}) => {
  const { currentBoard } = useSelector(
    (state: RootState) => state.KanbanReducer
  );
  const queryClient = useQueryClient();
  const { mutate, status: loadingStatus } = useMutation({
    mutationFn: async () => {
      return await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/board/delete-task/${currentBoard._id}`,
        deleteItem,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['kanban'] });
      toggleModal(false);
    },
  });

  return (
    <>
      {loadingStatus === 'pending' ? <Loader /> : null}
      <Portal>
        <div
          className='modal absolute top-0 left-0 right-0 bottom-0 min-w-[375px] grid place-items-center'
          onClick={() => toggleModal(false)}
        >
          <article className='pt-8 px-8 pb-10 bg-white dark:bg-dark-grey min-w-[345px] max-w-[30rem] mx-4 rounded-lg'>
            <h2 className='pb-6 font-bold text-l text-red'>
              Delete this task?
            </h2>
            <p className='pb-6 text-sm font-medium text-medium-grey'>
              `Are you sure you want to delete the ‘{deleteItem.title}’ task and
              its subtasks? This action cannot be reversed.`
            </p>
            <div className='inline-flex flex-wrap w-full gap-4'>
              <DestructiveButton
                label='Delete'
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  mutate();
                }}
              />
              <SecondaryButton
                label='Cancel'
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  toggleModal(false);
                }}
              />
            </div>
          </article>
        </div>
      </Portal>
    </>
  );
};
