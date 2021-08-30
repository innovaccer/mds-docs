import React from 'react';
import { Link } from '@innovaccer/design-system';
import logo from '../../../../site/src/images/default.png';

const Header = () => {
  return (
    <div
      className='d-flex w-100 p-6 bg-light position-sticky align-items-center'
      style={{
        boxShadow: '0px 10px 5px -10px rgb(0 0 0 / 16%)',
        boxSizing: 'border-box',
        zIndex: 1000,
        top: 0,
      }}
    >
      <Link href='/'>
        <img src={logo} />
      </Link>
    </div>
  );
};

export default Header;
