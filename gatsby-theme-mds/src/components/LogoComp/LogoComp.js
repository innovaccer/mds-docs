import React from 'react';
import {
  Card,
  CardBody,
  Icon,
} from '@innovaccer/design-system';
import './LogoComp.css';
import {
  StaticImage,
  GatsbyImage,
  getImage,
} from 'gatsby-plugin-image';
import { useStaticQuery, graphql, Link } from 'gatsby';

const LogoComp = (props) => {
  const {
    allImageSharp: { nodes },
  } = useStaticQuery(graphql`
    query IMAGES {
      allImageSharp {
        nodes {
          fluid {
            src
          }
          gatsbyImageData
        }
      }
    }
  `);

  return props.colorData.map((elt) => {
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
      <Card className='mr-7 mt-7 card'>
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
            <Link href={image.images.fallback.src} download>
              <Icon
                size={16}
                name='download'
                className='mr-3 imgName'
              />
            </Link>
          </div>
        </CardBody>
      </Card>
    );
  });
};

export default LogoComp;
