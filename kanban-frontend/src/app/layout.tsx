import type { Metadata } from 'next';

import { store } from '@/store';
import { QueryProvider } from '@/utils/QueryProvider';
import { ReduxProvider } from '@/utils/ReduxProvider';

import '../css/normalize.css';
import '../css/base.css';
import '../css/components.css';

export const metadata: Metadata = {
  title: 'Kanban board',
  description: 'Kanban board project, based on the Next',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' className='dark'>
      <body className='bg-light-bg dark:bg-dark-bg'>
        <ReduxProvider store={store}>
          <QueryProvider>{children}</QueryProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
