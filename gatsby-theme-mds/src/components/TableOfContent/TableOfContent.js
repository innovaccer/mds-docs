import React, { useEffect } from 'react';
import { useNavItems } from '../../util/InPageNavItems';
import { Subheading } from '@innovaccer/design-system';
import './TableOfContent.css';

const TableOfContent = (props) => {
  const { relativePagePath, location } = props;
  let navItems = useNavItems(relativePagePath);
  const [active, setActive] = React.useState('');

  let tocLevelCount = 1;

  const onClickHandler = (itemUrl) => {
    setActive(itemUrl);
  };

  useEffect(() => {
    let urlHash = '';
    if (location && location.hash) {
      urlHash = location.hash;
    }
    setActive(urlHash);
  }, []);

  function setPadding(isChild) {
    if (!isChild) {
      return '16px';
    } else if (isChild) {
      return `${tocLevelCount * 16}px`;
    }
  }

  function renderItems(items, isChild = false) {
    return (
      <ul className='table-of-content-list pr-8'>
        {items.map((item) => {
          return (
            <li>
              <div
                className={`${
                  active == item.url ? 'active-link' : ''
                }`}
              >
                <a
                  href={item.url}
                  onClick={() => onClickHandler(item.url)}
                  className={`toc-link `}
                  style={{
                    paddingLeft: setPadding(isChild),
                    display: `${
                      item.title ? 'inline-block' : 'none'
                    }`,
                  }}
                >
                  {item.title}
                </a>
              </div>
              {item.items &&
                (tocLevelCount++,
                renderItems(item.items, true))}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div className='d-flex flex-column right-nav-container overflow-hidden'>
      {navItems && navItems.length ? (
        <>
          <Subheading
            appearance='subtle'
            className='pl-6 mt-10'
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
