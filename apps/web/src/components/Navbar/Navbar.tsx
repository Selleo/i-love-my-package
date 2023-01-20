import React from 'react';
import { ReactComponent as Logo } from '../../assets/images/new.Selleo-logo.svg';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div>
        <Logo />
      </div>
      <div>search</div>
    </nav>
  );
};

export default Navbar;
