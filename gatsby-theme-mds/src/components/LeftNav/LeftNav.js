import React from 'react';
import { useNavItems } from '../../util/NavItems';
import {
  VerticalNav,
  Subheading,
  Button,
} from '@innovaccer/design-system';
import { navigate } from 'gatsby';
import { MOBILE } from '../../util/constants';

const isBrowser = typeof window !== 'undefined';

const LeftNav = (props) => {
  const { relativePagePath, showMobile } = props;
  let navItems = useNavItems(relativePagePath);
  
  const [expanded, setExpanded] = React.useState(true);

  let activeMenu;

  function getActiveNavItem() {
    if (
      isBrowser &&
      window.location.pathname &&
      window.location.pathname.includes('tabs')
    ) {
      activeMenu = navItems.filter((item) => {
        if (item.link && item.link.includes('tabs')) {
          const url =
            window.location.pathname.split('tabs');
          if (item.link.includes(url[0])) {
            return item.link;
          }
        }
      });
      return activeMenu[0].link;
    } else {
      return window.location.pathname;
    }
  }

  const activeLink = isBrowser ? getActiveNavItem() : '';
  const [active, setActive] = React.useState({
    link: activeLink,
  });

  const onClickHandler = (menu) => {
    navigate(menu.link);
    setActive(menu);
  };

  const handleNavigate = (name) => {
    if (name === MOBILE) {
      navigate(`/mobile${window.location.pathname}`);
    } else {
      if (window.location.pathname.includes('/mobile')) {
        navigate(
          window.location.pathname.replace('/mobile', '')
        );
      }
    }
  };

  const getHeading = () => {
    const componentName =
      relativePagePath && relativePagePath.split('/')[1];
    return componentName.toUpperCase();
  };

  return (
    <div className='h-100 bg-secondary-lightest border-right'>
      {showMobile && (
        <div className='d-flex pt-6 pl-6'>
          <Button
            appearance='basic'
            size='regular'
            className='mr-4'
            onClick={() => handleNavigate()}
            selected={!relativePagePath.includes(MOBILE)}
            expanded
          >
            Web
          </Button>
          <Button
            appearance='basic'
            onClick={() => handleNavigate(MOBILE)}
            selected={relativePagePath.includes(MOBILE)}
            className='mr-6'
            expanded
          >
            Mobile
          </Button>
        </div>
      )}
      <Subheading className='pl-6 pt-6 pb-3' appearance='subtle'>
        {getHeading()}
      </Subheading>
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
