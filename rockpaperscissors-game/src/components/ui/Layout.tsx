import React from 'react';

const Layout = ({
  children,
}: React.PropsWithChildren<{
  children: React.ReactNode;
}>) => {
  return (
    <div className='w-full min-h-screen flex flex-col bg-gradient-to-b from-gray-900 to-gray-700'>
      <main className='flex flex-col items-center justify-center gap-10'>
        {children}
      </main>
    </div>
  );
};

export default Layout;
