import React from 'react';
import { Link } from '@innovaccer/design-system';
import { useFooterItems } from '../../util/FooterItems';
import './Footer.css';

const Footer = ({ relativePagePath }) => {
  const items = useFooterItems();
  return (
    <div className='d-flex w-100 px-12 py-8 bg-secondary-lightest position-sticky align-items-center'>
      <div>
        {items.map(({ link, label }, index) => {
          let isExternal;
          if (link) {
            isExternal =
              link.startsWith('http://') ||
              link.startsWith('https://');
          }
          return (
            <Link
              appearance={
                relativePagePath.includes(
                  label.toLowerCase()
                )
                  ? 'default'
                  : 'subtle'
              }
              href={link}
              className={`link ${index > 0 ? 'ml-6' : ''} `}
              target={isExternal && '_blank'}
              disabled={index === 0}
            >
              {label}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Footer;
