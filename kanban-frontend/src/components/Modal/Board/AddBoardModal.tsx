import { Dispatch, SetStateAction } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { SubmitHandler, useFieldArray, useForm } from 'react-hook-form';

import { PrimarySmallButton } from '@/components/HOC/Buttons/PrimarySmallButton';
import { SecondaryButton } from '@/components/HOC/Buttons/SecondaryButton';
import { Input } from '@/components/Input/Input';
import { Loader } from '@/components/Loader';
import Portal from '@/components/HOC/Portal';

import { IFormValues } from '@/lib/react-hook-form';
import { IBoard } from '@/types/kanban';

export const AddBoardModal: React.FC<{
  toggleModal: Dispatch<SetStateAction<boolean>>;
}> = ({ toggleModal }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFormValues>({
    defaultValues: {
      boardName: '',
      columns: [
        {
          status: 'Todo',
          color: '#49C4E5',
          tasks: [],
        },
        {
          status: 'Doing',
          color: '#8471F2',
          tasks: [],
        },
      ],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: 'columns',
    control,
  });
  const queryClient = useQueryClient();
  const { mutate, status: loadingStatus } = useMutation({
    mutationFn: async (board: IBoard) => {
      return await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/board/create-board`,
        board,
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

  const onSubmit: SubmitHandler<IFormValues> = data => {
    const { boardName, columns } = data;

    mutate({
      name: boardName,
      columns,
      tasks: [],
    });
  };

  return (
    <Portal>
      <div
        className='modal board-modal absolute top-0 left-0 right-0 bottom-0
          grid place-items-center bg-black/[0.5] min-w-[375px] z-10'
        onClick={() => toggleModal(false)}
      >
        <form
          className='bg-white dark:bg-dark-grey min-w-[345px] w-5/6 rounded-md p-8 max-w-[30rem] mx-4'
          onSubmit={handleSubmit(onSubmit)}
          onClick={e => e.stopPropagation()}
        >
          <h2 className='text-l text-black dark:text-white pb-6'>
            Add New Board
          </h2>
          <label
            htmlFor='boardName'
            className='block text-s text-black dark:text-white pb-2'
          >
            Board Name
          </label>
          <Input
            id='boardName'
            type='text'
            name='boardName'
            placeholder='e.g. Web Design'
            register={register}
            registerOptions={{
              required: "Can't be empty",
              pattern: {
                value: /[\S\s]+[\S]+/,
                message: "Can't be empty",
              },
            }}
            errors={errors}
            render={errors => {
              return errors?.boardName ? (
                <>
                  {errors.boardName.type === 'pattern' && (
                    <span className='textfield-error text-red pr-4'>
                      {errors.boardName.message}
                    </span>
                  )}
                  {errors.boardName.type === 'required' && (
                    <span className='textfield-error text-red pr-4'>
                      {errors.boardName.message}
                    </span>
                  )}
                </>
              ) : null;
            }}
          />
          <label className='block text-s text-black dark:text-white pt-6 pb-2'>
            Board Columns
          </label>
          <ul className='flex flex-col gap-y-3 pb-3 max-h-64 overflow-y-auto'>
            {fields.map((field, index) => {
              return (
                <li className='inline-flex gap-x-4 items-center' key={index}>
                  <Input
                    id={`columns.${index}.status`}
                    type='text'
                    name={`columns.${index}.status` as keyof IFormValues}
                    placeholder='e.g. Doing'
                    register={register}
                    registerOptions={{
                      required: "Can't be empty",
                      pattern: {
                        value: /[\S\s]+[\S]+/,
                        message: "Can't be empty",
                      },
                    }}
                    errors={errors}
                    render={errors => {
                      return errors.columns ? (
                        <>
                          {errors.columns[index]?.status?.type ===
                            'pattern' && (
                            <span className='textfield-error text-red pr-4'>
                              {errors.columns[index]?.status?.message}
                            </span>
                          )}
                          {errors.columns[index]?.status?.type ===
                            'required' && (
                            <span className='textfield-error text-red pr-4'>
                              {errors.columns[index]?.status?.message}
                            </span>
                          )}
                        </>
                      ) : null;
                    }}
                  />
                  <input
                    className='bg-white dark:bg-dark-grey cursor-pointer'
                    type='color'
                    defaultValue={field.color}
                    {...register(`columns.${index}.color`)}
                  />
                  <button
                    type='button'
                    onClick={e => {
                      e.stopPropagation();
                      remove(index);
                    }}
                  >
                    <svg
                      width='15'
                      height='15'
                      viewBox='0 0 15 15'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      className='group'
                    >
                      <rect
                        x='12.7279'
                        width='3'
                        height='18'
                        transform='rotate(45 12.7279 0)'
                        fill='#828FA3'
                        className='group-hover:fill-red'
                      />
                      <rect
                        y='2.12109'
                        width='3'
                        height='18'
                        transform='rotate(-45 0 2.12109)'
                        fill='#828FA3'
                        className='group-hover:fill-red'
                      />
                    </svg>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className='flex flex-col gap-y-6'>
            <SecondaryButton
              label='+ Add New Column'
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                append({
                  status: '',
                  color: '#000000',
                  tasks: [],
                });
              }}
            />
            <PrimarySmallButton
              submit={true}
              label='Create New Board'
              onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
                e.stopPropagation()
              }
            />
          </div>
        </form>
        {loadingStatus === 'pending' && <Loader />}
      </div>
    </Portal>
  );
};
