import React from 'react';
import {
  Paragraph,
  Heading,
  Tabs,
  Tab,
} from '@innovaccer/design-system';
import { navigate } from 'gatsby';

const Container = ({
  children,
  pageTitle,
  tabs,
  relativePagePath,
  pageDescription,
}) => {
  const page = relativePagePath.split('/');
  const pageName = page[page.length - 1].split('.')[0];

  const getTabSlug = (tabIndex) => {
    const tabName = tabs[tabIndex];
    let tabSlug = '';
    if (tabName.length) {
      tabSlug = tabName.toLowerCase().replace(/\s/g, '-');
    }
    return tabSlug;
  };

  const activeTab =
    tabs && tabs.length
      ? tabs.findIndex(
          (tab, index) =>
            getTabSlug(index) === pageName.toLowerCase()
        )
      : '';

  const [activeIndex, setActiveIndex] = React.useState(
    activeTab || 0
  );

  const onTabChangeHandler = (tabIndex) => {
    const nextTabSlug = getTabSlug(tabIndex);
    const pagePath = relativePagePath.split('/');
    const pages = pagePath.slice(0, pagePath.length - 1);
    const path = `${pages.join('/')}/${nextTabSlug}/`;
    navigate(path);
    setActiveIndex(tabIndex);
  };

  return (
    <>
      <Heading size='xl' className='my-5'>
        {pageTitle}
      </Heading>
      {tabs && tabs.length && (
        <>
          <Paragraph>{pageDescription}</Paragraph>
          <Tabs
            activeIndex={activeIndex}
            onTabChange={onTabChangeHandler}
            className='mb-6'
          >
            {tabs.map((tab) => (
              <Tab label={tab}></Tab>
            ))}
          </Tabs>
        </>
      )}
      {children}
    </>
  );
};

export default Container;
