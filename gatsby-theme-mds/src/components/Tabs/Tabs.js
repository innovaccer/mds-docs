import React, { useState } from 'react';
import { TabsWrapper, Tab, Text } from '@innovaccer/design-system';

// import NavContext from '../../util/context/NavContext';

const Tabs = (props) => {
  const [activeIndex, setActive] = useState(0);

  const { tabData } = props;

  const onTabChangeHandler = (tabIndex) => {
    setActive(tabIndex);
  };

  return (
    <TabsWrapper active={activeIndex} onTabChange={onTabChangeHandler}>
      {tabData &&
        tabData.length &&
        tabData.map((tab, index) => {
          return (
            <Tab
              label={
                <>
                  <Text
                    tabIndex={index + 1}
                    appearance={activeIndex !== index ? 'subtle' : 'link'}
                  >
                    {tab.tabName}
                  </Text>
                </>
              }
            >
              <div>{<tab.data />}</div>
            </Tab>
          );
        })}
    </TabsWrapper>
  );
};

export default Tabs;
