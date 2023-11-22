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

import { EditTask } from '@/components/EditTask';
import { Checkbox } from '@/components/Input/Checkbox';
import { DropDown } from '@/components/Input/DropDown';
import { Loader } from '@/components/Loader';
import Portal from '@/components/HOC/Portal';

import { RootState } from '@/store/reducers';
import { IFormValues } from '@/lib/react-hook-form';
import { ITask } from '@/types/kanban';

export const TaskModal: React.FC<{
  task: ITask;
  toggleModal: Dispatch<SetStateAction<boolean>>;
}> = ({ task, toggleModal }) => {
  const { _id, title, description, column, subtasks, status } = task;
  const { currentBoard } = useSelector(
    (state: RootState) => state.KanbanReducer
  );
  const queryClient = useQueryClient();
  const { handleSubmit, control } = useForm<IFormValues>({
    defaultValues: {
      subtasks,
      status: currentBoard.columns.filter(col => col._id === column)[0]._id,
    },
  });
  const { fields, update } = useFieldArray({
    name: 'subtasks',
    control,
  });
  const { mutate, status: loadingStatus } = useMutation({
    mutationFn: async (editItem: ITask) => {
      return await axios.patch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/board/edit-task/${currentBoard._id}`,
        { taskId: _id, editItem },
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
    const { status } = data;
    const { columns } = currentBoard;

    mutate({
      title,
      description,
      subtasks: fields,
      status: columns.filter(column => {
        if (column._id === status) return column.status;
      })[0].status,
      column: status,
    });
  };

  return (
    <Portal>
      <div
        className='modal absolute top-0 left-0 right-0 bottom-0 bg-black/[0.5]
        grid place-items-center min-w-[375px]'
        onClick={handleSubmit(onSubmit)}
      >
        <article
          className='pt-8 px-8 pb-10 bg-white dark:bg-dark-grey
          min-w-[345px] w-5/6 max-w-[30rem] mx-4 rounded-lg'
          onClick={e => e.stopPropagation()}
        >
          <h2
            className='relative text-l text-black dark:text-white
          font-bold pb-6 inline-flex justify-between gap-x-6 w-full'
          >
            {title}
            <EditTask data={task} />
          </h2>
          {description && (
            <p
              className='text-sm text-medium-grey font-medium mb-6
            max-h-24 text-ellipsis overflow-hidden'
            >
              {description}
            </p>
          )}
          <form>
            <label className='block text-s font-bold text-medium-grey pb-4'>
              Subtasks (
              {`${fields.filter(item => item.completed === true).length} of
            ${subtasks.length}`}
              )
            </label>
            <ul className='overflow-y-auto max-h-60'>
              {fields.map((subtask, index) => {
                return (
                  <li className='pb-2' key={subtask._id}>
                    <Checkbox
                      id={`${subtask._id}`}
                      data={subtask}
                      onChange={() => {
                        update(index, {
                          ...subtask,
                          completed: !subtask.completed,
                        });
                      }}
                    />
                  </li>
                );
              })}
            </ul>
            <div className='pt-6'>
              <label className='block text-s font-bold text-black dark:text-white pb-2'>
                Current Status
              </label>
              <Controller
                name='status'
                control={control}
                render={({ field: { onChange } }) => (
                  <DropDown defaultValue={status} onChange={onChange} />
                )}
              />
            </div>
          </form>
          {loadingStatus === 'pending' && <Loader />}
        </article>
      </div>
    </Portal>
  );
};
