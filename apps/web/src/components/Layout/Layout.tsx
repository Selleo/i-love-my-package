import React from 'react';
import { ReactComponent as Logo } from '../../assets/images/new.Selleo-logo.svg';

type TProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: TProps) => {
  return (
    <div className="layout-background">
      <div>
        <Logo />
      </div>
      {children}
    </div>
  );
};

export default Layout;
