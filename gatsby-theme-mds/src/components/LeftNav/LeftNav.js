import React, { useContext, useRef, useEffect } from 'react';
import { useNavItems } from "../../util/NavItems";
import { Collapsible, VerticalNav } from "@innovaccer/design-system";
import { navigate } from 'gatsby';

// import NavContext from '../../util/context/NavContext';

const isBrowser = typeof window !== "undefined";

const LeftNav = (props) => {
  const { relativePagePath } = props;
  let navItems = useNavItems(relativePagePath);

  const [expanded, setExpanded] = React.useState(true);
  const [active, setActive] = React.useState({
    link: isBrowser ? window.location.pathname : '/'
  });

  const onClickHandler = (menu) => {
    console.log("menu-clicked: ", menu);
    navigate(menu.link);
    setActive(menu);
  };

  return (
    <Collapsible expanded={expanded} onToggle={setExpanded} hoverable={false}>
      <VerticalNav
        menus={navItems}
        active={active}
        onClick={onClickHandler}
        expanded={expanded}
        autoCollapse={false}
      />
    </Collapsible>
  );
};

export default LeftNav;
