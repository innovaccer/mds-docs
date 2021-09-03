import React, { useEffect } from 'react';
import {
  Heading,
  Tabs,
  Tab
} from '@innovaccer/design-system';
import { navigate } from 'gatsby';

const ComponentsContainer = ({
  children,
  pageTitle,
  relativePagePath,
  tabs,
  pageDescription,
}) => {
  const page = relativePagePath.split('/');
  const pageName = page[page.length - 1].split('.')[0];
  const activeTab =
    tabs && tabs.length
      ? tabs.findIndex(
          (tab) =>
            tab.toLowerCase() === pageName.toLowerCase()
        )
      : '';

  const [activeIndex, setActiveIndex] = React.useState(
    activeTab || 0
  );

  const getTabSlug = (tabIndex) => {
    const tabSlug = tabs[tabIndex]
      .toLowerCase()
      .replace(' ', '-');
    return tabSlug;
  };

  const onTabChangeHandler = (tabIndex) => {
    const tabSlug = getTabSlug(tabIndex);
    const pagePath = relativePagePath.replace(
      tabs[activeIndex].toLowerCase(),
      tabSlug
    );
    navigate(`${pagePath.replace('.mdx', '')}/`);
    setActiveIndex(tabIndex);
  };

  return (
    <>
      <Heading>{pageTitle}</Heading>
      <p>{pageDescription}</p>
      {tabs && tabs.length && (
        <Tabs
          activeIndex={activeIndex}
          onTabChange={onTabChangeHandler}
          className='mb-6'
        >
          {tabs.map((tab) => (
            <Tab label={tab}></Tab>
          ))}
        </Tabs>
      )}
      {children}
    </>
  );
};

export default ComponentsContainer;
