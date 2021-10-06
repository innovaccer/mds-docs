import React from 'react';
import Homepage from '../../../gatsby-theme-mds/src/templates/Homepage';
import {
  Heading,
  Button,
  Paragraph,
} from '@innovaccer/design-system';
import { navigate } from 'gatsby';
import Meta from '../../../gatsby-theme-mds/src/components/Meta';

const Docs = () => {
  return (
    <Homepage relativePagePath={'/404'} is404={true}>
      <Meta titleType='page' />
      <div className='m-auto w-75 mt-10'>
        <Heading size='xl'>Masala Design System</Heading>

        <Paragraph>
          Designers, developers, product managers, and
          UXer's use Innovaccer's Masala Design System to
          build products effortlessly, fearlessly, and
          conveniently.
        </Paragraph>

        <br />

        <Button
          appearance='primary'
          onClick={() =>
            navigate(
              '/introduction/get-started/developers/'
            )
          }
        >
          Get started
        </Button>
      </div>
    </Homepage>
  );
};

export default Docs;
