import React, { useContext, useRef, useEffect } from 'react';
import { useNavItems } from '../../util/NavItems';
import { Collapsible, VerticalNav, Subheading } from '@innovaccer/design-system';
import { navigate } from 'gatsby';

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

  return (
    <div className="h-auto">
    <Collapsible
      expanded={expanded}
      onToggle={setExpanded}
      hoverable={false}
    >
      <Subheading className="pt-5 pl-6 pb-3" appearance='subtle'>Introduction</Subheading>
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
