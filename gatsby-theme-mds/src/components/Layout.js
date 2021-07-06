/* eslint-disable import/no-unresolved */
import React, { useLayoutEffect } from 'react';
import "@fontsource/nunito-sans";
import "@innovaccer/design-system/css";
import { Row, Column } from '@innovaccer/design-system';
import LeftNav from './LeftNav';
import Header from './Header';
import Container from './Container';
import { MDXProvider } from "@mdx-js/react";
import * as DSComponents from '@innovaccer/design-system';
import Meta from './Meta';

const leftMenuList = [
  {
    title: 'Gatsby Theme MDS'
  }
];

const Layout = ({
  children,
  titleType,
  pageTitle,
  pageDescription,
  pageKeywords,
  relativePagePath
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
        <LeftNav
          is404Page={is404}
          relativePagePath={relativePagePath}
          pageTitle={pageTitle}
        />
        <Column className="overflow-auto h-100 p-6 mr-5">
          <Container pageTitle={pageTitle}>
            <MDXProvider components={DSComponents}>{children}</MDXProvider>
          </Container>
        </Column>
      </Row>
    </>
  );
};

export default Layout;
