import { Task } from './Task';

import { IColumn, ITask } from '@/types/kanban';

export const Column: React.FC<{
  column: IColumn;
  tasks: ITask[];
}> = ({ column, tasks }) => {
  const { color, status, _id } = column;

  return (
    <section className='min-w-[17.5rem]'>
      <h2 className='inline-flex gap-x-3 pb-6 text-s text-medium-grey uppercase font-bold tracking-wide'>
        <span
          className='block w-4 h-4 rounded-full'
          style={{
            backgroundColor: color,
          }}
        ></span>
        {`${status} (${tasks.filter(task => task.column === _id).length})`}
      </h2>
      <ul className='flex flex-col gap-y-5 h-[95%] overflow-y-auto overflow-x-hidden'>
        {tasks.map(item => {
          if (item.column === _id) {
            return <Task task={item} key={item._id} />;
          }
        })}
      </ul>
    </section>
  );
};
