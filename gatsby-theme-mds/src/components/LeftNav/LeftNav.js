import React, { useContext, useRef, useEffect } from 'react';
import { useNavItems } from '../../util/NavItems';
import {
  VerticalNav,
  Input,
} from '@innovaccer/design-system';
import { navigate } from 'gatsby';
import { MOBILE } from '../../util/constants';
// import NavContext from '../../util/context/NavContext';

const isBrowser = typeof window !== 'undefined';

const LeftNav = (props) => {
  const { relativePagePath } = props;
  let navItems = useNavItems(relativePagePath);
  const [expanded, setExpanded] = React.useState(true);
  const [active, setActive] = React.useState({
    link: isBrowser ? window.location.pathname : '/',
  });

  const onClickHandler = (menu) => {
    console.log('menu-clicked: ', menu);
    navigate(menu.link);
    setActive(menu);
  };

  const handleNavigate = (name) => {
    if (name === MOBILE) {
      navigate(`/mobile${window.location.pathname}`);
    } else {
      if (window.location.pathname.includes('/mobile')) {
        navigate(window.location.pathname.replace('/mobile', ''));
      }

    }
  }

  return (
    <div className='h-100 bg-secondary-lightest'>
      <Input
        icon='search'
        name='input'
        className='my-6 ml-5 w-75'
        minWidth={"230px"}
        placeholder='Search for patterns, content..'
      />
      <VerticalNav
        menus={navItems}
        active={active}
        onClick={onClickHandler}
        expanded={expanded}
        autoCollapse={false}
      />
    </div>
  );
};

export default LeftNav;
