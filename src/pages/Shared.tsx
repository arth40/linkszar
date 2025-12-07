import React from 'react';
import { useCollectionStore } from '../store/collectionStore';
import CommonLoading from '../components/common/CommonLoading';
import CollectionCard from '../components/collection/CollectionCard';

const Shared: React.FC = () => {
  const { sharedCollections, fetchSharedCollections, loading } =
    useCollectionStore();
  React.useEffect(() => {
    fetchSharedCollections();
  }, []);

  return (
    <>
      {loading && (
        <div className="h-full flex flex-col relative">
          <CommonLoading />
        </div>
      )}
      <div className="h-full flex flex-col">
        <p className="py-2 px-4 text-lg font-semibold">Shared Collections</p>
        <div className="md:px-4 flex-1 overflow-y-auto w-full">
          <div className="grid p-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
            {Object.entries(sharedCollections).map(([id, collection]) => (
              <CollectionCard
                key={id}
                id="shared"
                title={collection.name}
                description={collection.description}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Shared;
