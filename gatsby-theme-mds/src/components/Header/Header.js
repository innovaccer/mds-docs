import React from 'react';
import { Link } from 'gatsby';
import { Heading } from '@innovaccer/design-system';
import { useHeaderItems } from '../../util/HeaderItems';
import logo from '../../../../site/src/images/default.png';
import './Header.css';

const Header = ({ relativePagePath }) => {
  const items = useHeaderItems();
  return (
    <div
      className='header'
    >
      <Link to='/' className='pl-6 HeaderLink'>
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
              to={link}
              className={`HeaderLink ${
                relativePagePath.includes(
                  label.toLowerCase()
                )
                  ? 'HeaderLink--active'
                  : ''
              } ${
                relativePagePath.includes(
                  label.toLowerCase()
                )
                  ? 'HeaderLink--active'
                  : 'HeaderLink--default'
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
