/* eslint-disable import/no-unresolved */
import React, { useLayoutEffect } from 'react';
import "@fontsource/nunito-sans";
import "@innovaccer/design-system/css";
import { Row, Column } from '@innovaccer/design-system';
import LeftNav from './LeftNav';
import Header from './Header';
import Container from './Container';
import { MDXProvider } from "@mdx-js/react"
import * as DSComponents from '@innovaccer/design-system';
import Meta from './Meta';
import PropTable from './PropsTable/index';

const leftMenuList = [
  {
    title: 'Gatsby Theme MDS'
  }
]

const Layout = ({
  children,
  homepage,
  theme,
  titleType,
  pageTitle,
  pageDescription,
  pageKeywords,
}) => {
  const is404 = children.key === null;

  return (
    <>
      <Meta
        titleType={titleType}
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        pageKeywords={pageKeywords}
      />
      <Header leftMenuList={leftMenuList} />
      <Row style={{ height: 'calc(100vh - 52px)' }}>
        <LeftNav homepage={homepage} is404Page={is404} theme={theme} />
        <Column className="overflow-auto h-100 p-6 bg-secondary-lightest">
          <Container homepage={homepage} theme={theme} pageTitle={pageTitle}>
            <MDXProvider components={DSComponents}>{children}</MDXProvider>
            <PropTable />
          </Container>
        </Column>
      </Row >
    </>
  );
};

export default Layout;
