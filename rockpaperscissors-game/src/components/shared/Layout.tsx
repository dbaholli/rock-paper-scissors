import React from 'react';

const Layout = ({ children }: React.PropsWithChildren) => {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
