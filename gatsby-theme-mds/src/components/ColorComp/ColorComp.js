import React from 'react';
import { Card, Column } from '@innovaccer/design-system';
import './ColorComp.css';

const ColorComp = (props) => {
  const { colorData } = props;
  return colorData.map((elt) => {
    return (
      <Column size='4'>
        <Card className='mr-7 mt-7' shadow='none'>
          <div className='px-6'>
            <div
              style={{
                backgroundColor: elt.backgroundColor,
              }}
              className='mt-6 container w-auto'
            ></div>
            <p>{elt.name} </p>
            <div className='d-flex mb-7'>
              <div className='mr-auto'>
                <p className='my-2 paragraph'>Hex</p>
                <span className='hexcode'>
                  {elt.hexCode}
                </span>
              </div>
              <div>
                <p className='my-2 paragraph'>RGB</p>
                <span className='hexcode'>
                  {elt.colorCode}
                </span>
              </div>
            </div>
          </div>
        </Card>
      </Column>
    );
  });
};

export default ColorComp;
