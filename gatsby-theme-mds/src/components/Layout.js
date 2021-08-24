/* eslint-disable import/no-unresolved */
import React, { useLayoutEffect } from 'react';
import "@fontsource/nunito-sans";
import "@innovaccer/design-system/css";
import { Row, Column, Card, Button } from '@innovaccer/design-system';
import LeftNav from './LeftNav';
import TableOfContent from './TableOfContent/TableOfContent';
import Header from './Header';
import Container from './Container';
import ComponentsContainer from './Container/ComponentsContainer';
import { MDXProvider } from "@mdx-js/react";
import * as MDSComponents from '@innovaccer/design-system';
import Meta from './Meta';
import '../css/style.css';


const Code = ({ children, ...rest }) => {
  return (
    <>
      <div {...rest}>
        {children}
      </div>
      <Button icon="copy" />
    </>
  )
};

const DSComponents = { ...MDSComponents, code: Code }

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
        <Column className="overflow-auto h-100 p-6 mr-5">
          {!relativePagePath.includes('components') && (
            <Container
              pageTitle={pageTitle}
              relativePagePath={relativePagePath}
            >
              <MDXProvider components={DSComponents}>
                {children}
              </MDXProvider>
            </Container>
          )}
          {relativePagePath.includes('components') && (
            <ComponentsContainer
              pageTitle={pageTitle}
              relativePagePath={relativePagePath}
            >
              <MDXProvider components={DSComponents}>
                {children}
              </MDXProvider>
            </ComponentsContainer>
          )}
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
