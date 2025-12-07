import React from 'react';
import ActionBar from '../components/common/ActionBar';
import { Button } from '@heroui/button';
import { Icon } from '@iconify/react';
import CommonModal from '../components/common/CommonModal';
import NewCollectionForm from '../components/collection/NewCollectionForm';
import { useCollectionStore } from '../store/collectionStore';
import CollectionCard from '../components/collection/CollectionCard';
import CommonLoading from '../components/common/CommonLoading';
import EditCollectionForm from '../components/collection/EditCollectionForm';
import ShareCollection from '../components/collection/ShareCollection';

const Collection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const [modalTitle, setModalTitle] = React.useState('');
  const [modalChild, setModalChild] = React.useState<React.ReactNode>(<></>);
  const { collections, loading } = useCollectionStore();

  const openNewCollectionModal = () => {
    setModalTitle('Create New Collection');
    setModalChild(<NewCollectionForm close={() => setIsModalOpen(false)} />);
    setIsModalOpen(true);
  };

  const openEditCollectionModal = (collectionId: string) => {
    const collection = collections ? collections[collectionId] : null;
    if (!collection) return;
    setModalTitle('Edit Collection');
    setModalChild(
      <EditCollectionForm
        collection={{ ...collection, id: collectionId }}
        close={() => setIsModalOpen(false)}
      />
    );
    setIsModalOpen(true);
  };

  const openShareCollectionModal = (collectionId: string) => {
    const collection = collections ? collections[collectionId] : null;
    if (!collection) return;
    setModalTitle('Share Collection');
    setModalChild(
      <ShareCollection
        collection={{ ...collection, id: collectionId }}
        close={() => setIsModalOpen(false)}
      />
    );
    setIsModalOpen(true);
  };
  return (
    <>
      {loading && (
        <div className="flex h-full w-full relative">
          <CommonLoading />
        </div>
      )}
      <div className="h-full flex flex-col">
        <ActionBar>
          <Button
            variant="flat"
            className="bg-gray-200"
            startContent={
              <Icon className="text-2xl" icon="basil:add-outline" />
            }
            onPress={openNewCollectionModal}
          >
            New Collection
          </Button>
        </ActionBar>
        <p className="py-2 px-4 text-lg font-semibold">Your collections</p>
        <div className="md:px-4 flex-1 overflow-y-auto w-full">
          <div className="grid p-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
            <CollectionCard
              key="default"
              id="default"
              title="Solo Links"
              description="Links without a collection"
              totalLinks={5}
            />
            {Object.entries(collections).map(([id, collection]) => (
              <CollectionCard
                key={id}
                id={id}
                title={collection.name}
                description={collection.description}
                totalLinks={5}
                editCollection={() => openEditCollectionModal(id)}
                shareCollection={() => openShareCollectionModal(id)}
              />
            ))}
          </div>
        </div>
        <CommonModal
          isOpen={isModalOpen}
          closeModal={() => setIsModalOpen(false)}
          title={modalTitle}
        >
          {modalChild}
        </CommonModal>
      </div>
    </>
  );
};

export default Collection;
