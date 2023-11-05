import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Dispatch, SetStateAction } from 'react';
import {
  Controller,
  SubmitHandler,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import { useSelector } from 'react-redux';

import { PrimarySmallButton } from '@/components/HOC/Buttons/PrimarySmallButton';
import { SecondaryButton } from '@/components/HOC/Buttons/SecondaryButton';
import { DropDown } from '@/components/Input/DropDown';
import { Input } from '@/components/Input/Input';
import { Loader } from '@/components/Loader';
import Portal from '@/components/HOC/Portal';

import { IFormValues } from '@/lib/react-hook-form';
import { RootState } from '@/store/reducers';
import { IBoard } from '@/types/kanban';

export const AddNewTaskModal: React.FC<{
  toggleModal: Dispatch<SetStateAction<boolean>>;
}> = ({ toggleModal }) => {
  const { currentBoard } = useSelector(
    (state: RootState) => state.KanbanReducer
  );
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IFormValues>({
    defaultValues: {
      taskName: '',
      description: '',
      subtasks: [],
      status: currentBoard.columns[0]._id,
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: 'subtasks',
    control,
  });
  const { mutate, status: loadingStatus } = useMutation({
    mutationFn: async (board: IBoard) => {
      return await axios.put(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/board/${currentBoard._id}`,
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
    const { taskName, subtasks, description, status } = data;
    const { columns, tasks, name } = currentBoard;

    const updateTasks = [
      ...tasks,
      {
        title: taskName,
        description,
        subtasks,
        status: columns.filter(column => {
          if (column._id === status) return column.status;
        })[0].status,
        column: status,
      },
    ];

    mutate({
      name,
      columns,
      tasks: updateTasks,
    });
  };

  return (
    <Portal>
      <div
        className='modal task-modal absolute top-0 left-0 right-0 bottom-0 grid place-items-center bg-black/[0.5] min-w-[375px] z-10'
        onClick={() => toggleModal(false)}
      >
        <form
          className='bg-white dark:bg-dark-grey w-full rounded-md p-8 max-w-[30rem]'
          onSubmit={handleSubmit(onSubmit)}
          onClick={e => e.stopPropagation()}
        >
          <h1 className='pb-6 font-bold text-black text-l dark:text-white'>
            Add New Task
          </h1>
          <div>
            <label className='block pb-2 font-bold text-black text-s dark:text-white'>
              Title
            </label>
            <Input
              type='text'
              id='taskName'
              name='taskName'
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
                return errors.taskName ? (
                  <>
                    {errors.taskName.type === 'pattern' && (
                      <span className='pr-4 textfield-error text-red'>
                        {errors.taskName.message}
                      </span>
                    )}
                    {errors.taskName.type === 'required' && (
                      <span className='pr-4 textfield-error text-red'>
                        {errors.taskName.message}
                      </span>
                    )}
                  </>
                ) : null;
              }}
            />
            <label
              htmlFor='description'
              className='block pt-6 pb-2 font-bold text-black text-s dark:text-white'
            >
              Description
            </label>
            <Input
              id='description'
              type='textarea'
              name='description'
              placeholder='e.g. It’s always good to take a break. This 15 minute break will
        recharge the batteries a little.'
              register={register}
            />
          </div>
          <div className='py-6'>
            <label className='block pb-2 font-bold text-black text-s dark:text-white'>
              Subtasks
            </label>
            <ul className='flex flex-col pb-3 overflow-y-auto gap-y-3 max-h-64'>
              {fields.map((field, index) => {
                return (
                  <li className='inline-flex items-center gap-x-4' key={index}>
                    <Input
                      type='text'
                      id={`${field._id}`}
                      placeholder='e.g. Doing'
                      register={register}
                      registerOptions={{
                        required: "Can't be empty",
                        pattern: {
                          value: /[\S\s]+[\S]+/,
                          message: "Can't be empty",
                        },
                      }}
                      name={`subtasks.${index}.label` as keyof IFormValues}
                      errors={errors}
                      render={errors =>
                        errors.subtasks ? (
                          <>
                            {errors.subtasks[index]?.type === 'pattern' && (
                              <span className='pr-4 textfield-error text-red'>
                                {errors.subtasks[index]?.message?.toString()}
                              </span>
                            )}
                            {errors.subtasks[index]?.type === 'required' && (
                              <span className='pr-4 textfield-error text-red'>
                                {errors.subtasks[index]?.message?.toString()}
                              </span>
                            )}
                          </>
                        ) : null
                      }
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
            <SecondaryButton
              label='+ Add New Subtask'
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                append({
                  label: '',
                  completed: false,
                });
              }}
            />
          </div>
          <div className='pb-6'>
            <label className='block pb-2 font-bold text-black text-s dark:text-white'>
              Status
            </label>
            <Controller
              name='status'
              control={control}
              rules={{ required: true }}
              render={({ field: { onChange } }) => (
                <DropDown onChange={onChange} />
              )}
            />
          </div>
          <PrimarySmallButton
            submit={true}
            label='Create Task'
            onClick={(e: React.MouseEvent<HTMLButtonElement>) =>
              e.stopPropagation()
            }
          />
        </form>
        {loadingStatus === 'pending' && <Loader />}
      </div>
    </Portal>
  );
};
