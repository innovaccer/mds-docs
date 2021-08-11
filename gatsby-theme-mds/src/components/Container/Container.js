import React from 'react';
import { Card, Heading } from '@innovaccer/design-system';

const Container = ({ children, pageTitle }) => {
  return (
    <>
      <Heading className="my-5">{pageTitle}</Heading>
      <Card className="p-6">{children}</Card>
    </>
  );
};

export default Container;
