import React from 'react';
import Navbar from '../Navbar';

type TProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: TProps) => {
  return (
    <div className="layout-background">
      <Navbar />
      <main className="main">{children}</main>
    </div>
  );
};

export default Layout;
