/* eslint-disable import/no-unresolved */
import React, { useLayoutEffect } from 'react';
import "@fontsource/nunito-sans";
import "@innovaccer/design-system/css";
import { Row, Column } from '@innovaccer/design-system';
import LeftNav from './LeftNav';
import TableOfContent from './TableOfContent/TableOfContent';
import Header from './Header';
import Container from './Container';
import { MDXProvider } from "@mdx-js/react";
import * as DSComponents from '@innovaccer/design-system';
import Meta from './Meta';
import PropTable from './PropsTable/index';
import '../css/style.css';

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
      <Row className="vh-100">
        <LeftNav
          is404Page={is404}
          relativePagePath={relativePagePath}
          pageTitle={pageTitle}
        />
        <Column className="px-12 py-8">
          <Container pageTitle={pageTitle}>
            <MDXProvider components={DSComponents}>
              {children}
            </MDXProvider>
            <PropTable />
          </Container>
        </Column>

        <Column
          size={2}
          className="pb-6 in-page-nav"
        >
          <TableOfContent
            is404Page={is404}
            relativePagePath={relativePagePath}
            pageTitle={pageTitle}
          />
        </Column>
      </Row>
    </>
  );
};

export default Layout;
