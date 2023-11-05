import { useState } from 'react';

import { EditBoardModal } from '@/components/Modal/Board/EditBoardModal';

export const AddColumnButton = () => {
  const [toggleModal, setToggleModal] = useState<boolean>(false);
  return (
    <>
      {toggleModal ? <EditBoardModal toggleModal={setToggleModal} /> : null}
      <button
        className='min-w-[17.5rem] text-xl font-bold hover:text-main-purple text-medium-grey rounded-md px-12 bg-gradient-to-t from-light-frost to-light-frost/[0.5] dark:from-dark-grey/[0.25] dark:to-dark-grey/[0.125]'
        onClick={() => setToggleModal(true)}
      >
        + New Column
      </button>
    </>
  );
};
