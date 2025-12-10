import React from 'react';
import { useCollectionStore } from '../store/collectionStore';
import CommonLoading from '../components/common/CommonLoading';
import CollectionCard from '../components/collection/CollectionCard';
import EmptyListMessage from '../components/common/EmptyListMessage';
import { Icon } from '@iconify/react';

const Shared: React.FC = () => {
  const { sharedCollections, loading } = useCollectionStore();

  return (
    <>
      {loading && (
        <div className="h-full flex flex-col relative">
          <CommonLoading />
        </div>
      )}
      {!loading && (
        <div className="h-full flex flex-col">
          <p className="py-2 px-4 text-lg font-semibold">Shared Collections</p>
          <div className="md:px-4 flex-1 overflow-y-auto w-full">
            {(!sharedCollections ||
              (sharedCollections &&
                Object.keys(sharedCollections).length === 0)) && (
              <EmptyListMessage
                children={
                  <p className="flex flex-col mt-10 gap-1 items-center">
                    <span>Nothing in shared.</span>
                    <span className="flex items-center gap-1">
                      Looks like an introvert account
                      <Icon icon="ph:eyes-fill" className="text-2xl" />
                    </span>
                  </p>
                }
              />
            )}
            <div className="grid p-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
              {Object.entries(sharedCollections).map(([id, collection]) => (
                <CollectionCard
                  key={id}
                  id={id}
                  page="shared"
                  title={collection.name}
                  ownerId={collection.ownerId}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Shared;
