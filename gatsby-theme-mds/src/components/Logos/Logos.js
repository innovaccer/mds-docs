import React from 'react';
import {
  Card,
  CardBody,
  Icon,
  Toast,
} from '@innovaccer/design-system';
import './Logos.css';
import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { Link } from 'gatsby';
import { useLogoItems } from '../../util/Logos';

const ProductLogos = (props) => {
  const nodes = useLogoItems();

  return props.logoData.map((elt) => {
    const filteredGatsbyImage = nodes.filter((img) => {
      if (img.fluid.src.includes(elt.imgName)) {
        return elt;
      }
    });

    let image;
    if (filteredGatsbyImage.length) {
      image = getImage(
        filteredGatsbyImage[0].gatsbyImageData
      );
    }

    return (
      <>
        <Card className='mr-7 mt-7' shadow='none'>
          <CardBody>
            <div className='mt-6 container p-8'>
              <GatsbyImage
                image={image}
                alt={'test'}
                className='image'
              />
            </div>
            <div className='d-flex align-items-center'>
              <p className='imgName mr-auto'>{elt.name} </p>
              <Link
                href={image.images.fallback.src}
                download
              >
                <Icon
                  size={16}
                  name='download'
                  className='mr-3 imgName'
                  onClick={() => props.toggleToast(elt.name)}
                />
              </Link>
            </div>
          </CardBody>
        </Card>
      </>
    );
  });
};

export default ProductLogos;
