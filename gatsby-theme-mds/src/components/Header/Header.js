import React from 'react';
import { Link, Heading } from '@innovaccer/design-system';
import { useHeaderItems } from '../../util/HeaderItems';
import logo from '../../../../site/src/images/default.png';

const Header = () => {
  const items = useHeaderItems();
  return (
    <div
      className="d-flex w-100 p-6 bg-light position-relative align-items-center"
      style={{ boxShadow: "0px 10px 5px -10px rgb(0 0 0 / 16%)", boxSizing: 'border-box', zIndex: 1000 }}
    >
      <Link href="/">
        <img src= {logo} />
      </Link>
      <Heading size='s' className='ml-8' appearance='subtle' >Masala Design System</Heading>
      <div className='ml-6' >
        {items.map(({link, label}, index) => {
          const isExternal = link.startsWith('http://') || link.startsWith('https://'); 
          return (
            <Link appearance="subtle" href={link} className="ml-6" target={isExternal && '_blank'}>
              {label}
            </Link>
          )
        }) }
      </div>
    </div>
  );
}

export default Header;
