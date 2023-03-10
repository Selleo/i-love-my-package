import React, { useState } from 'react';
import { ReactComponent as IconSearch } from '../../assets/images/Icon.svg';
import { ReactComponent as Logo } from '../../assets/images/logo.svg';

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
      <Logo className="navbar__logo" />
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
