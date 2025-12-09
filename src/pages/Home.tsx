import React, { useEffect, useState } from 'react';
import ActionBar from '../components/common/ActionBar';
import CommonLoading from '../components/common/CommonLoading';
import { useLinkStore } from '../store/linkStore';
import { Tabs, Tab } from '@heroui/tabs';
import { Icon } from '@iconify/react';
import LinksListView from '../components/links/LinksListView';
import type { Link } from '../types/link';
import { useCollectionStore } from '../store/collectionStore';
import EmptyListMessage from '../components/common/EmptyListMessage';

const Home: React.FC = () => {
  const { loading, links, fetchLinks, getAllLinks } = useLinkStore();
  const { collections } = useCollectionStore();
  const [allLinks, setAllLinks] = useState<Record<string, Link>>();
  const [view, setView] = useState<'list' | 'thumbnail'>('list');

  const changeView = (key: any) => {
    setView(key);
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  useEffect(() => {
    if (links) {
      const allData = getAllLinks();
      setAllLinks(allData);
    }
  }, [links, collections]);

  return (
    <>
      {loading && (
        <div className="flex h-full w-full relative">
          <CommonLoading />
        </div>
      )}
      <div className="h-full flex flex-col">
        <ActionBar>
          <Tabs
            disableAnimation
            color="primary"
            aria-label="List view"
            classNames={{
              panel: 'hidden',
              tabContent: 'group-data-[selected=true]:text-[#ffffff]',
              cursor: 'w-full bg-[#3fbe7d]',
            }}
            onSelectionChange={changeView}
          >
            <Tab key="list">
              <Icon icon="typcn:th-list" className="text-xl cursor-pointer" />
            </Tab>
            <Tab key="thumbnail">
              <Icon
                icon="lucide:gallery-thumbnails"
                className="text-xl cursor-pointer"
              />
            </Tab>
          </Tabs>
        </ActionBar>
        <p className="py-2 px-4 text-lg font-semibold">Your Links</p>
        <div className="md:px-4 flex-1 overflow-y-auto w-full">
          {(!allLinks || (allLinks && Object.keys(allLinks).length === 0)) && (
            <EmptyListMessage
              children={
                <p className="flex gap-1 items-center">
                  You don't have any links{' '}
                  <Icon icon="mynaui:sad-ghost" className="text-2xl" />
                </p>
              }
            />
          )}
          <LinksListView list={allLinks!} view={view} />
        </div>
      </div>
    </>
  );
};

export default Home;
