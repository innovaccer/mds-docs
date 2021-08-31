import React from 'react';
import { useNavItems } from '../../util/InPageNavItems';
import { Subheading } from '@innovaccer/design-system';
import './TableOfContent.css';

const TableOfContent = (props) => {
  const { relativePagePath } = props;
  let navItems = useNavItems(relativePagePath);
  const [active, setActive] = React.useState('');

  const onClickHandler = (item) => {
    setActive(item);
  };

  const createSlug = (name) => {
    return `#${name
      .toLowerCase()
      .replace(/[^a-z0-9 -]/g, '')
      .replace(/\s/g, '-')
      .replace(/-+/g, '-')}`;
  };

  function renderItems(items) {
    return (
      <div className="table-of-content">
        {items.map((item) => (
          <div className="mb-6">
            <a
              href={createSlug(item.value)}
              onClick={() => onClickHandler(item.value)}
              className={
                active === item.value ? 'active-link' : ''
              }
              style={{
                paddingLeft: `${item.depth * 20}px`,
              }}
            >
              {item.value}
            </a>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="d-flex flex-column right-nav-container overflow-hidden">
      {navItems && navItems.length ? (
        <>
          <Subheading
            appearance="subtle"
            className="pl-6 mt-10 mb-6"
          >
            CONTENTS
          </Subheading>
          {renderItems(navItems)}
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default TableOfContent;
