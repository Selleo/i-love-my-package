import React, { useState } from 'react';
import { ReactComponent as Logo } from '../../assets/images/new.Selleo-logo.svg';
import { ReactComponent as IconSearch } from '../../assets/images/Icon.svg';
import { ReactComponent as Love } from '../../assets/images/heart-filled.svg';

const Navbar = () => {
  const [searchValue, setSearchValue] = useState('');

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) =>
    setSearchValue(e.target.value);

  const handleSearch = (e: React.KeyboardEvent<HTMLElement>) => {
    if (e.keyCode === 13) {
      console.log(searchValue);
      //send request and redirect to search route
      setSearchValue('');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <Logo />
        <div className="navbar__text">
          i <Love className="navbar__icon" /> my package
        </div>
      </div>
      <div>
        <div className="navbar__input-wrapper">
          <input
            className="navbar__input input -search"
            placeholder="Search package"
            value={searchValue}
            onChange={handleChangeInput}
            onKeyDown={handleSearch}
          />
          <IconSearch />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
