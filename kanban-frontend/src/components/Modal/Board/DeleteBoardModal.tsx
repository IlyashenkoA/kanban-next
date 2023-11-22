import { Dispatch, SetStateAction } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';

import { DestructiveButton } from '@/components/HOC/Buttons/DestructiveButton';
import { SecondaryButton } from '@/components/HOC/Buttons/SecondaryButton';
import { Loader } from '@/components/Loader';
import Portal from '@/components/HOC/Portal';

interface IDeleteModalProps {
  deleteItem: string;
  deleteId: string;
  toggleModal: Dispatch<SetStateAction<boolean>>;
}

export const DeleteBoardModal: React.FC<IDeleteModalProps> = ({
  deleteItem,
  deleteId,
  toggleModal,
}) => {
  const queryClient = useQueryClient();
  const { mutate, status } = useMutation({
    mutationFn: async (id: string) => {
      return await axios.delete(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/board/${id}`,
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
    <Portal>
      {status === 'pending' && <Loader />}
      <div
        className='modal absolute top-0 left-0 right-0 bottom-0 bg-black/[0.5] min-w-[375px] grid place-items-center'
        onClick={() => toggleModal(false)}
      >
        <article className='pt-8 px-8 pb-10 bg-white dark:bg-dark-grey w-5/6 min-w-[345px] max-w-[30rem] mx-4 rounded-lg'>
          <h2 className='text-l text-red font-bold pb-6'>Delete this board?</h2>
          <p className='text-sm text-medium-grey font-medium pb-6'>
            {`Are you sure you want to delete the ‘${deleteItem}’ board? This
              action will remove all columns and tasks and cannot be reversed.`}
          </p>
          <div className='inline-flex gap-4 flex-wrap w-full'>
            <div className='flex-auto'>
              <DestructiveButton
                label='Delete'
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  mutate(deleteId);
                }}
              />
            </div>
            <div className='flex-auto'>
              <SecondaryButton
                label='Cancel'
                onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.stopPropagation();
                  toggleModal(false);
                }}
              />
            </div>
          </div>
        </article>
      </div>
    </Portal>
  );
};
