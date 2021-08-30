import React from 'react';
import { Card, Heading } from '@innovaccer/design-system';

const Container = ({ children, pageTitle }) => {
  return (
    <>
      <Heading size="xl" className="my-5">
        {pageTitle}
      </Heading>
      {children}
    </>
  );
};

export default Container;
