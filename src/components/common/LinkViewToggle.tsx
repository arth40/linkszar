import { Tab, Tabs } from '@heroui/tabs';
import { Icon } from '@iconify/react';
import React from 'react';

const LinkViewToggle: React.FC<{
  toggleView: (key: 'list' | 'thumbnail') => void;
}> = (props) => {
  const handleViewChange = (key: any) => {
    props.toggleView(key);
  };
  return (
    <>
      <Tabs
        aria-label="List view"
        variant="solid"
        classNames={{
          panel: 'hidden',
          cursor: 'w-full bg-[#083b23]',
          tabContent: 'group-data-[selected=true]:text-[#ffffff]',
        }}
        onSelectionChange={handleViewChange}
      >
        <Tab key="thumbnail">
          <Icon
            icon="lucide:gallery-thumbnails"
            className="text-xl cursor-pointer"
          />
        </Tab>
        <Tab key="list">
          <Icon icon="typcn:th-list" className="text-xl cursor-pointer" />
        </Tab>
      </Tabs>
    </>
  );
};

export default LinkViewToggle;
