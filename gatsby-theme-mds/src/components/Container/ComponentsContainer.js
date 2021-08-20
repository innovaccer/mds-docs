import React from 'react';
import { Card, Heading } from '@innovaccer/design-system';
import PropsTable from '../PropsTable';
import jsonData from '../../util/componentsData/StorybookData.json';
import {
  buttonVariants,
  avatarVariants,
} from '../../util/constants';

const ComponentsContainer = ({
  children,
  pageTitle,
  relativePagePath,
}) => {
  const mdxNodes = children.props.children[0];

  let keys, variants;

  if (relativePagePath.includes('button')) {
    keys = Object.keys(jsonData).filter((key) =>
      key.includes('button')
    );
    variants = buttonVariants;
  } else if (relativePagePath.includes('avatar')) {
    keys = Object.keys(jsonData).filter((key) =>
      key.includes('avatar')
    );
    variants = avatarVariants;
  }

  let count = 0;

  function getJsxCode() {
    const variantName = keys.filter((elt) =>
      elt.includes(variants[count])
    );
    count++;
    const jsxCode = variantName.length
      ? jsonData[variantName[0]].parameters.storySource
          .source
      : '';
    return jsxCode;
  }

  return (
    <>
      <Heading className="my-5">{pageTitle}</Heading>
      <Card className="p-6">
        {mdxNodes &&
          mdxNodes.length &&
          mdxNodes.map((elt) => {
            return (
              <>
                {elt !== 'Preview' && elt}
                {elt && elt === 'Preview' && (
                  <PropsTable
                    componentData={getJsxCode()}
                    showArgsTable={false}
                  />
                )}
              </>
            );
          })}
      </Card>
    </>
  );
};

export default ComponentsContainer;
