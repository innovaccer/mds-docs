import React from 'react';
import { Link, Heading, Input } from '@innovaccer/design-system';
import { useHeaderItems } from '../../util/HeaderItems';
import logo from '../../../../site/src/images/default.png';
import './Header.css';

const Header = ({ relativePagePath }) => {
  const items = useHeaderItems();
  return (
    <div
      className='header'
    >
      <Link href='/' className='pl-6 header-link'>
        <img src={logo} />
      </Link>
      <Heading
        size='xs'
        className='ml-8'
        appearance='subtle'
      >
        Masala Design System
      </Heading>
      <div >
        {items.map(({ link, label }, index) => {
          const isExternal =
            link.startsWith('http://') ||
            link.startsWith('https://');
          return (
            <Link
              appearance={
                relativePagePath.includes(
                  label.toLowerCase()
                )
                  ? 'default'
                  : 'subtle'
              }
              href={link}
              className={`ml-8 header-link ${
                relativePagePath.includes(
                  label.toLowerCase()
                )
                  ? 'header-link__active'
                  : ''
              }`}
              target={isExternal && '_blank'}
            >
              {label}
            </Link>
          );
        })}
      </div>
      {/* <Input
        className='w-25 flex-grow-0 ml-auto'
        icon='search'
        name='input'
        placeholder='Search components, patterns, principles...'
      /> */}
    </div>
  );
};

export default Header;
