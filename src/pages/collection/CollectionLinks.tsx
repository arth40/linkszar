import React, { useEffect, useState } from 'react';
import ActionBar from '../../components/common/ActionBar';
import LinkViewToggle from '../../components/common/LinkViewToggle';
import { Icon } from '@iconify/react';
import EmptyListMessage from '../../components/common/EmptyListMessage';
import LinksListView from '../../components/links/LinksListView';
import type { Link } from '../../types/link';
import { useLinkStore } from '../../store/linkStore';
import { useNavigate, useParams } from 'react-router-dom';
import { useCollectionStore } from '../../store/collectionStore';
import { Button } from '@heroui/button';
import { Accordion, AccordionItem } from '@heroui/accordion';
import { getCollectionById } from '../../services/collectionService';
import type { Collection } from '../../types/collection';
import { useAuthStore } from '../../store/userStore';
import CommonLoading from '../../components/common/CommonLoading';

const CollectionLinks: React.FC<{ page: 'collection' | 'shared' }> = (
  props
) => {
  const { ownerId, id } = useParams();
  const navigate = useNavigate();

  const {
    links,
    sharedLinks,
    fetchCollectionLinks,
    getCollectionLinks,
    fetchSharedConnectionLinks,
    loading,
  } = useLinkStore();
  const { collections, sharedCollections, deleteSharedCollection } =
    useCollectionStore();
  const { user } = useAuthStore();

  const [view, setView] = useState<'list' | 'thumbnail'>('thumbnail');
  const [allLinks, setAllLinks] = useState<Record<string, Link>>();
  const [sharedCollection, setSharedCollection] = useState<Collection | null>(
    null
  );
  const [hasAccess, setHasAccess] = useState(false);
  const [emptyMessage, setEmptyMessage] = useState('');

  useEffect(() => {
    const fetchLinks = async () => {
      if (id) {
        if (props.page === 'collection') {
          await fetchCollectionLinks(id);
        } else {
          const collectionDetails = await getCollectionById(ownerId!, id);
          setSharedCollection(collectionDetails);
          if (collectionDetails?.sharedWith) {
            const hasAccess = Object.values(collectionDetails.sharedWith).some(
              (guy) => {
                return guy?.uid === user?.uid;
              }
            );
            setHasAccess(hasAccess);
            if (hasAccess) {
              await fetchSharedConnectionLinks(ownerId!, id);
            }
          }
        }
      }
    };
    fetchLinks();
  }, [id, sharedCollections, collections]);

  useEffect(() => {
    if (id) {
      if (props.page === 'collection' && links && links[id]) {
        const allData = getCollectionLinks(id);
        setAllLinks(allData);
      }
      if (props.page === 'shared') {
        setAllLinks(sharedLinks);
      }
      if (props.page === 'shared' && !hasAccess) {
        setEmptyMessage("You don't have access");
      } else if (checkEmptyList()) {
        setEmptyMessage('No links here');
      } else {
        setEmptyMessage('');
      }
    }
  }, [links, sharedLinks, hasAccess]);

  const changeView = (key: any) => {
    setView(key);
  };

  const checkEmptyList = () => {
    if (props.page === 'collection') {
      return (
        !links[id!] || (links[id!] && Object.keys(links[id!]).length === 0)
      );
    } else {
      return (
        !sharedLinks || (sharedLinks && Object.keys(sharedLinks).length === 0)
      );
    }
  };

  const getCollectionName = () => {
    if (props.page === 'collection') {
      return collections[id!]?.name ? collections[id!].name : '';
    } else {
      return sharedCollection?.name ? sharedCollection.name : '';
    }
  };

  const getCollectionDesc = () => {
    if (props.page === 'collection') {
      return collections[id!]?.description
        ? collections[id!]?.description
        : 'No Description.';
    } else {
      return sharedCollection?.description
        ? sharedCollection?.description
        : 'No Description.';
    }
  };

  const handleDeleteSharedCollection = async () => {
    await deleteSharedCollection(id!);
    navigate(-1);
  };

  return (
    <>
      <div className="h-full flex flex-col">
        <ActionBar>
          <LinkViewToggle toggleView={(key) => changeView(key)} />
        </ActionBar>
        <div className="flex items-center w-full gap-2">
          <Button
            isIconOnly
            variant="light"
            size="sm"
            className="p-0"
            onPress={() => navigate(-1)}
          >
            <Icon
              icon="famicons:arrow-back"
              className="text-xl cursor-pointer"
            />
          </Button>
          <p className="py-2 px-4 text-lg font-semibold">
            {getCollectionName()}
          </p>
          {props.page === 'shared' && (
            <>
              <Icon
                icon="fluent:channel-share-48-filled"
                className="text-2xl cursor-pointer text-primary-900"
              />
              <Button
                isIconOnly
                variant="bordered"
                size="sm"
                className="p-0"
                onPress={handleDeleteSharedCollection}
              >
                <Icon
                  icon="material-symbols:delete-rounded"
                  className="text-xl cursor-pointer text-[#990000]"
                />
              </Button>
            </>
          )}
        </div>
        <div className="md:px-6 mt-2">
          <Accordion variant="shadow" className="bg-primary-900 text-gray-300">
            <AccordionItem
              key="1"
              aria-label="Description"
              title="Description"
              indicator={
                <Icon
                  icon="tabler:layout-sidebar-right-expand-filled"
                  className="text-2xl"
                />
              }
              classNames={{ title: 'font-semibold text-gray-200' }}
            >
              {getCollectionDesc()}
            </AccordionItem>
          </Accordion>
        </div>
        <div className="md:px-4 flex-1 overflow-y-auto w-full">
          {!loading && emptyMessage && (
            <EmptyListMessage
              children={
                <p className="flex gap-1 items-center">
                  {emptyMessage}
                  <Icon icon="mynaui:sad-ghost" className="text-2xl" />
                </p>
              }
            />
          )}
          {loading && (
            <div className="h-full flex flex-col relative">
              <CommonLoading />
            </div>
          )}
          <LinksListView list={allLinks!} view={view} page={props.page} />
        </div>
      </div>
    </>
  );
};

export default CollectionLinks;
