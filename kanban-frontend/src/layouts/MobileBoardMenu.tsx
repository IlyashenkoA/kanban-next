import { useState } from 'react';

import { MobileSidebar } from '@/layouts/MobileSidebar';

import { KanbanResponse } from '@/types/kanban';

export const MobileBoardMenu: React.FC<{
  data: KanbanResponse;
}> = ({ data }) => {
  const [toggleMenu, setToggleMenu] = useState<boolean>(false);

  return (
    <div className='md:hidden'>
      <button
        className={
          toggleMenu
            ? 'mobile-toggle-menu md:hidden bg-mobile-menu-toggle h-2 w-2.5 bg-no-repeat bg-center duration-300 ease-in-out rotate-180'
            : 'mobile-toggle-menu md:hidden bg-mobile-menu-toggle h-2 w-2.5 bg-no-repeat bg-center duration-300 ease-in-out'
        }
        onClick={() => setToggleMenu(prev => !prev)}
      ></button>
      {toggleMenu && <MobileSidebar data={data} closeModal={setToggleMenu} />}
    </div>
  );
};
