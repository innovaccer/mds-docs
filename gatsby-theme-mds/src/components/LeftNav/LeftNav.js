import React, { useContext, useRef, useEffect } from 'react';
import { useNavItems } from '../../util/NavItems';
import { Collapsible, VerticalNav, Subheading, Button } from '@innovaccer/design-system';
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
    if(name === MOBILE) {
      navigate(`/mobile${window.location.pathname}`);
    } else {
      if (window.location.pathname.includes('/mobile')) {
        navigate(window.location.pathname.replace('/mobile', ''));
      }
      
    }
  }

  return (
    <div className="h-auto">
    <Collapsible
      expanded={expanded}
      onToggle={setExpanded}
      hoverable={false}
    >
      <Subheading className="pt-5 pl-6 pb-3" appearance='subtle'>Introduction</Subheading>
      <div className="d-flex pt-5 pl-6 pb-3">
        <Button
          appearance="basic"
          size="regular"
          className="mr-4"
          onClick={() => handleNavigate()}
          selected={!relativePagePath.includes(MOBILE)}
          expanded
        >
          Web
        </Button>
        <Button
          appearance="basic"
          onClick={() => handleNavigate(MOBILE)}
          selected={relativePagePath.includes(MOBILE)}
          className="mr-6"
          expanded
        >
          Mobile
        </Button>
      </div>
      <VerticalNav
        menus={navItems}
        active={active}
        onClick={onClickHandler}
        expanded={expanded}
        autoCollapse={false}
      />
    </Collapsible>
    </div>
  );
};

export default LeftNav;
