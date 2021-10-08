/* eslint-disable import/no-unresolved */
import React, { useState } from 'react';
import '@fontsource/nunito-sans';
import {
  Row,
  Column,
  Heading,
  Button,
  Toast,
} from '@innovaccer/design-system';
import LeftNav from './LeftNav';
import TableOfContent from './TableOfContent/TableOfContent';
import Header from './Header';
import Container from './Container';
import ComponentsContainer from './Container/ComponentsContainer';
import { MDXProvider } from "@mdx-js/react";
import * as MDSComponents from '@innovaccer/design-system';
import Meta from './Meta';
import '../css/style.css';
import PropsTable from '../components/PropsTable/index';
import jsonData from '../util/componentsData/StorybookData.json';
import htmlData from '../util/componentsData/htmlData.json';
import Rules from './Rules/Rules';
import DOs from './Rules/DOs';
import DONTs from './Rules/DONTs';
import InlineMessage from './Rules/InlineMessage';
import IconWrapper from './Rules/IconWrapper';
import Footer from './Footer/Footer';
import ProductLogos from '../components/Logos/Logos';
import ProductColors from '../components/Colors/Colors';

const copyToClipboard = (str) => {
  let codeBlock = '';
  if (Array.isArray(str)) {
    str.map((elt) => {
      if (typeof elt === 'object') {
        codeBlock = codeBlock + elt.props.children;
      } else {
        codeBlock = codeBlock + elt;
      }
    });
  } else {
    codeBlock = str;
  }
  navigator.clipboard.writeText(codeBlock);
};

const Code = ({ children, ...rest }) => {
  return (
    <>
      <div {...rest}>{children}</div>
      <Button
        icon='copy'
        onClick={() => copyToClipboard(children)}
      />
    </>
  );
};

const List = ({children, ...rest}) => {
  return (
    <div className='list'>
      {children}
    </div>
  )
}

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
  relativePagePath,
  component,
  tabs,
  logos,
  showMobile,
  ...rest
}) => {
  const is404 = children && children.key === null;
  const [isToastActive, setIsToastActive] = useState(false);
  const [toastTitle, setToastTitle] = useState('');

  function getJsxCode(name) {
    let keys = Object.keys(jsonData).filter((key) =>
      key.includes(pageTitle.toLowerCase())
    );

    const variantName = keys.filter((elt) =>
      elt.includes(name)
    );

    const jsxCode = variantName.length
      ? jsonData[variantName[0]].parameters.storySource
          .source
      : '';
    return jsxCode;
  }

    function getHTMLCode(name) {
      let keys = Object.keys(htmlData).filter((key) =>
        key.includes(pageTitle.toLowerCase())
      );
      
      const variantName = keys.filter((elt) =>
        elt.includes(name)
      );

      const jsxCode = variantName.length
        ? htmlData[variantName[0]].html
        : '';
      return jsxCode;
    }

  function getPropTableData(name) {
    let keys = Object.keys(jsonData).filter((key) =>
      key.includes(pageTitle.toLowerCase())
    );

    const variantName = keys.filter((elt) =>
      elt.includes(name)
    );
    const jsxCode = variantName.length
      ? jsonData[variantName[0]].parameters.argTypes
      : '';
    return jsxCode;
  }

  const Preview = ({ children, name, ...rest }) => {
    return (
      <>
        <div {...rest}>{children}</div>
        <PropsTable
          componentData={getJsxCode(name)}
          showArgsTable={false}
          htmlData={getHTMLCode(name)}
        />
      </>
    );
  };

  const PreviewWithPropTable = ({
    children,
    name,
    ...rest
  }) => {
    return (
      <>
        <div {...rest}>{children}</div>
        <PropsTable
          componentData={getJsxCode(name)}
          propData={getPropTableData(name)}
        />
      </>
    );
  };

  const toggleToast = (name) => {
    setIsToastActive(true);
    setToastTitle(name);
  }

  const Logos = ({ children, logoData, ...rest }) => {
    return (
        <ProductLogos
          logoData={logoData}
          toggleToast={toggleToast}
        />
    );
  };

  const Rectangle = ({ name, ...rest }) => {
    return (
      <div className='rectangle'>{name}</div>
    );
  };

    const Colors = ({ children, colorData, ...rest }) => {
      return (
        <div className='d-flex flex-wrap pb-6 mb-8'>
          <ProductColors
            colorData={colorData}
            toggleToast={toggleToast}
          />
        </div>
      );
    };

  const DSComponents = {
    ...MDSComponents,
    code: Code,
    Preview: Preview,
    PreviewWithPropTable: PreviewWithPropTable,
    Rules,
    DOs,
    DONTs,
    InlineMessage,
    IconWrapper,
    h1: (props) => <Heading size='xxl' {...props} />,
    h2: (props) => <Heading size='xl' {...props} />,
    h3: (props) => <Heading size='l' {...props} />,
    h4: (props) => <Heading size='m' {...props} />,
    h5: (props) => <Heading size='s' {...props} />,
    ul: List,
    Logos: (props) => <Logos {...props} />,
    Rectangle: (props) => <Rectangle {...props} />,
    Colors: (props) => <Colors {...props} />,
  };
  return (
    <>
      <Meta
        titleType={titleType}
        pageTitle={pageTitle}
        pageDescription={pageDescription}
        pageKeywords={pageKeywords}
      />
      <Header
        leftMenuList={leftMenuList}
        relativePagePath={relativePagePath}
      />
      <Row style={{ height: 'calc(100vh - 48px)' }}>
        <LeftNav
          is404Page={is404}
          relativePagePath={relativePagePath}
          pageTitle={pageTitle}
          showMobile={showMobile}
        />
        <Column className="page-animation" style={{height: '100%', overflowY: 'scroll', scrollBehavior: 'smooth'}}>
          <Row>
            <Column className="px-12 py-8 min-vh-100" size={9}>
              {!relativePagePath.includes('components') && (
                <Container
                  pageTitle={pageTitle}
                  relativePagePath={relativePagePath}
                  tabs={tabs}
                  pageDescription={pageDescription}
                  logos={logos}
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
                  component={component}
                  tabs={tabs}
                  pageDescription={pageDescription}
                >
                  <MDXProvider components={DSComponents}>
                    {children}
                  </MDXProvider>
                </ComponentsContainer>
              )}
            </Column>

            <Column
              size={3}
              className="pb-6 in-page-nav"
            >
              <TableOfContent
                is404Page={is404}
                relativePagePath={relativePagePath}
                pageTitle={pageTitle}
                location={rest.location}
              />
            </Column>
          </Row>
          {isToastActive && (
            <Toast
              appearance='success'
              title={toastTitle}
              className='toast'
              onClose={() => setIsToastActive(false)}
            />
          )}
          <Footer relativePagePath={relativePagePath} />
        </Column>
      </Row>
    </>
  );
};

export default Layout;
