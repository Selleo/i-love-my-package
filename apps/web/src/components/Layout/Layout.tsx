import React from 'react';
import { ReactComponent as Logo } from '../../assets/images/new.Selleo-logo.svg';

type TProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: TProps) => {
  return (
    <div className="layout-background">
      <nav className="navbar">Navbar</nav>
      <main className="main">{children}</main>
    </div>
  );
};

export default Layout;
