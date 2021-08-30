import React from 'react';
import { Card, CardBody } from '@innovaccer/design-system';
import './ColorComp.css';

const ColorComp = (props) => {
  const { colorData } = props;
  return colorData.map((elt) => {
    return (
      <Card className='mr-7 mt-7 card'>
        <CardBody>
          <div
            style={{
              backgroundColor: elt.backgroundColor,
            }}
            className='mt-6 container'
          ></div>
          <p>{elt.name} </p>
          <div className='d-flex'>
            <div className='mr-auto'>
              <p className='my-2 paragraph'>Hex</p>
              <span className='hexcode'>{elt.hexCode}</span>
            </div>
            <div>
              <p className='my-2 paragraph'>RGB</p>
              <span className='hexcode'>
                {elt.colorCode}
              </span>
            </div>
          </div>
        </CardBody>
      </Card>
    );
  });
};

export default ColorComp;
