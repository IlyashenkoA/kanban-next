'use client';

import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AddColumnButton } from '@/components/Buttons/AddColumnButton';
import { Column } from '@/components/Column';
import { PrimaryLargeButton } from '@/components/HOC/Buttons/PrimaryLargeButton';
import { Loader } from '@/components/Loader';
import { AddBoardModal } from '@/components/Modal/Board/AddBoardModal';
import { EditBoardModal } from '@/components/Modal/Board/EditBoardModal';

import { Header } from '@/layouts/Header';
import { Sidebar } from '@/layouts/Sidebar';

import { setActiveBoard } from '@/store/action-creators/action-creators';
import { RootState } from '@/store/reducers';

import { useDebouncedValue } from '@/hooks/useDebouncedValue';
import { IColumn, KanbanResponse } from '@/types/kanban';

function App() {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth <= 768 : false
  );
  const debouncedIsMobile = useDebouncedValue(isMobile, 500);
  const router = useRouter();

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    if (
      localStorage.theme === 'dark' ||
      (!('theme' in localStorage) &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
    ) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [showSidebar, setShowSidebar] = useState<boolean>(true);
  const [toggleCreateBoardModal, setToggleCreateBoardModal] =
    useState<boolean>(false);
  const [toggleEditBoardModal, setToggleEditBoardModal] =
    useState<boolean>(false);
  const { currentBoard } = useSelector(
    (state: RootState) => state.KanbanReducer
  );
  const dispatch = useDispatch();

  const { isLoading, data } = useQuery({
    queryKey: ['kanban'],
    queryFn: async (): Promise<KanbanResponse | void> => {
      return await axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/board/boards`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        })
        .catch(error => {
          if (error.response && error.response.status === 401) {
            router.push('/login');
          }
        });
    },
  });

  useEffect(() => {
    if (data) {
      const { boards } = data.data;

      if (currentBoard !== boards[0]) {
        dispatch(setActiveBoard(boards[0]));
      }
    }
  }, [data]);

  return (
    <div
      className='relative flex flex-col min-h-screen min-w-[375px]'
      id='root'
    >
      {toggleEditBoardModal && (
        <EditBoardModal toggleModal={setToggleEditBoardModal} />
      )}
      {toggleCreateBoardModal && (
        <AddBoardModal toggleModal={setToggleCreateBoardModal} />
      )}
      {isLoading ? (
        <Loader />
      ) : data ? (
        data?.data?.boards.length > 0 ? (
          <>
            <Header data={data} />
            <main className='inline-flex flex-auto bg-light-bg dark:bg-dark-bg'>
              {debouncedIsMobile ? null : (
                <Sidebar
                  data={data}
                  showSidebar={showSidebar}
                  setShowSidebar={setShowSidebar}
                />
              )}
              <section className='relative inline-flex flex-auto px-6 py-6 overflow-x-auto overflow-y-hidden border-t gap-x-6 border-light-lines dark:border-dark-lines'>
                {!showSidebar && (
                  <button
                    className='absolute left-0 z-10 items-center hidden py-4 pl-4 pr-5 font-bold rounded-tr-full rounded-br-full bottom-8 group md:inline-flex gap-x-3 bg-main-purple hover:bg-main-purple-hover active:bg-main-purple-hover'
                    onClick={() => setShowSidebar(true)}
                  >
                    <svg
                      width='16'
                      height='11'
                      viewBox='0 0 16 11'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        fillRule='evenodd'
                        clipRule='evenodd'
                        d='M15.8154 4.43419C14.2491 1.77636 11.328 0 8 0C4.67056 0 1.75012 1.77761 0.184624 4.43419C-0.0615413 4.8519 -0.0615413 5.37033 0.184624 5.78805C1.75087 8.44585 4.67195 10.2222 8 10.2222C11.3294 10.2222 14.2499 8.4446 15.8154 5.78802C16.0615 5.37031 16.0615 4.85189 15.8154 4.43419ZM8 8.88887C5.91217 8.88887 4.22223 7.19924 4.22223 5.1111C4.22223 3.02327 5.91184 1.33333 8 1.33333C10.0878 1.33333 11.7778 3.02294 11.7778 5.1111C11.7778 7.19893 10.0882 8.88887 8 8.88887ZM8 7.99999C9.5955 7.99999 10.8889 6.7066 10.8889 5.1111C10.8889 3.51561 9.5955 2.22222 8 2.22222C7.50811 2.22222 7.04503 2.3453 6.63964 2.56211L6.64053 2.56208C7.2975 2.56208 7.83008 3.09466 7.83008 3.75163C7.83008 4.40858 7.2975 4.94116 6.64053 4.94116C5.98356 4.94116 5.45098 4.4086 5.45098 3.75163L5.451 3.75074C5.2342 4.15613 5.11112 4.61921 5.11112 5.1111C5.11112 6.7066 6.4045 7.99999 8 7.99999Z'
                        fill='white'
                      />
                    </svg>
                  </button>
                )}
                {currentBoard?.columns.length > 0 ? (
                  currentBoard.columns.map((item: IColumn) => {
                    return (
                      <Column
                        column={item}
                        tasks={currentBoard.tasks}
                        key={item._id}
                      />
                    );
                  })
                ) : (
                  <div
                    className='flex flex-col items-center gap-y-6 absolute
                      top-1/2 left-1/2 -translate-x-2/4 -translate-y-2/4
                      min-w-[345px] w-[70%]'
                  >
                    <h1 className='font-bold text-center text-l text-medium-grey'>
                      This board is empty. Create a new column to get started.
                    </h1>
                    <div className='text-center'>
                      <PrimaryLargeButton
                        label='+ Add New Column'
                        onClick={() => setToggleEditBoardModal(true)}
                      />
                    </div>
                  </div>
                )}
                {currentBoard?.columns.length > 0 ? (
                  <AddColumnButton key={Date.now()} />
                ) : null}
              </section>
            </main>
          </>
        ) : (
          <div
            className='flex flex-col items-center gap-y-6
              absolute top-1/2 left-1/2 -translate-x-2/4
              -translate-y-2/4 min-w-[345px] w-[70%]'
          >
            <h1 className='font-bold text-center text-l text-medium-grey'>
              There are no boards available. Create a new board to get started.
            </h1>
            <div className='text-center'>
              <PrimaryLargeButton
                label='+ Add New Board'
                onClick={() => setToggleCreateBoardModal(true)}
              />
            </div>
          </div>
        )
      ) : null}
    </div>
  );
}

export default App;
