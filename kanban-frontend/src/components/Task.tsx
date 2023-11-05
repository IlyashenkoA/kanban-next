import { useState } from 'react';

import { TaskModal } from './Modal/Task/TaskModal';

import { ITask } from '@/types/kanban';

export const Task: React.FC<{ task: ITask }> = ({ task }) => {
  const [toggleTaskModal, setToggleTaskModal] = useState<boolean>(false);
  const { title, subtasks } = task;

  return (
    <>
      {toggleTaskModal && (
        <TaskModal toggleModal={setToggleTaskModal} task={task} />
      )}
      <article
        className='group px-4 py-6 w-[17.5rem] bg-white dark:bg-dark-grey
          rounded-lg shadow-secondary-shadow cursor-pointer'
        onClick={() => setToggleTaskModal(true)}
      >
        <h3 className='text-m text-black group-hover:text-main-purple dark:text-white font-bold pb-2'>
          {title}
        </h3>
        <p className='text-s font-bold text-medium-grey'>
          {`${
            subtasks.filter(subtask => subtask.completed === true).length
          } of ${subtasks.length} subtasks`}
        </p>
      </article>
    </>
  );
};
