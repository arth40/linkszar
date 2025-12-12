import React, { useState } from 'react';
import ActionBar from '../../components/common/ActionBar';
import { Button } from '@heroui/button';
import { Icon } from '@iconify/react';
import CommonModal from '../../components/common/CommonModal';
import NewCollectionForm from '../../components/collection/NewCollectionForm';
import { useCollectionStore } from '../../store/collectionStore';
import CollectionCard from '../../components/collection/CollectionCard';
import CommonLoading from '../../components/common/CommonLoading';
import EditCollectionForm from '../../components/collection/EditCollectionForm';
import ShareCollection from '../../components/collection/ShareCollection';
import CommonConfirmModal from '../../components/common/CommonConfirmModal';
import { useLinkStore } from '../../store/linkStore';

const Collection: React.FC = () => {
  const { collections, loading, deleteCollection } = useCollectionStore();
  const { deleteAllLinksInCollection } = useLinkStore();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalChild, setModalChild] = useState<React.ReactNode>(<></>);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [confirmModalDesc, setConfirmModalDesc] = useState('');
  const [confirmModalAction, setConfirmModalAction] = useState<
    (...args: unknown[]) => unknown
  >(() => {});

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
    setModalTitle('Share Collection');
    setModalChild(
      <ShareCollection
        collectionId={collectionId}
        close={() => setIsModalOpen(false)}
      />
    );
    setIsModalOpen(true);
  };

  const openDeleteCollectionModal = (collectionId: string) => {
    const collection = collections ? collections[collectionId] : null;
    if (!collection) return;
    setConfirmModalDesc(
      'This will delete the collection and links will be marked as solo links'
    );
    setConfirmModalAction(() => () => deleteCollection(collectionId));
    setIsConfirmModalOpen(true);
  };

  const openDeleteAllLinksModal = (collectionId: string) => {
    const collection = collections ? collections[collectionId] : null;
    if (!collection) return;
    setConfirmModalDesc('This will delete all the links in collection.');
    setConfirmModalAction(() => () => deleteAllLinksInCollection(collectionId));
    setIsConfirmModalOpen(true);
  };

  return (
    <>
      {loading && (
        <div className="flex h-full w-full relative">
          <CommonLoading />
        </div>
      )}
      {!loading && (
        <div className="h-full flex flex-col">
          <ActionBar>
            <Button
              variant="bordered"
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
            <div className="grid p-4 grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 w-full">
              <CollectionCard
                key="default"
                id="default"
                title="Solo Links"
                page="collection"
              />
              {Object.entries(collections).map(([id, collection]) => (
                <CollectionCard
                  key={id}
                  id={id}
                  title={collection.name}
                  page="collection"
                  editCollection={() => openEditCollectionModal(id)}
                  shareCollection={() => openShareCollectionModal(id)}
                  deleteCollection={() => openDeleteCollectionModal(id)}
                  deleteAllLinks={() => openDeleteAllLinksModal(id)}
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
          <CommonConfirmModal
            title="Are you sure?"
            description={confirmModalDesc}
            isOpen={isConfirmModalOpen}
            confirmAction={confirmModalAction}
            closeModal={() => setIsConfirmModalOpen(false)}
          />
        </div>
      )}
    </>
  );
};

export default Collection;
