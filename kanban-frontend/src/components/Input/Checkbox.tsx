import { ISubtask } from '@/types/kanban';

type CheckboxProps = {
  id: string;
  data: ISubtask;
  onChange: () => void;
};

export const Checkbox: React.FC<CheckboxProps> = ({ id, data, onChange }) => {
  const { label, completed } = data;

  return (
    <label
      className='bg-light-bg dark:bg-dark-bg hover:bg-main-purple/[0.25]
      dark:hover:bg-main-purple/[0.25] inline-flex gap-x-4 items-center p-3
        w-full rounded cursor-pointer'
      htmlFor={id}
    >
      <span
        className='checkmark-container grid items-center h-4 w-4 bg-white
        dark:bg-dark-grey border border-medium-grey/[0.248914] rounded-sm'
      >
        <input
          type='checkbox'
          className='hidden'
          id={id}
          checked={completed}
          onChange={onChange}
        />
        {completed && (
          <svg
            className='place-self-center mt-0.5 h-2 w-2.5'
            width='10'
            height='8'
            viewBox='0 0 10 8'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M1.27588 3.06593L4.03234 5.82239L9.03234 0.822388'
              stroke='white'
              strokeWidth='2'
            />
          </svg>
        )}
      </span>
      <p className='checkbox-label text-black dark:text-white font-bold text-s'>
        {label}
      </p>
    </label>
  );
};
