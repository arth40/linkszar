import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import React, { useEffect, useState } from 'react';
import type { Collection } from '../../types/collection';
import { useCollectionStore } from '../../store/collectionStore';
import { useAuthStore } from '../../store/userStore';
import toastMessage from '../../services/toasterService';
import { Icon } from '@iconify/react';
import CommonLoading from '../common/CommonLoading';

const ShareCollection: React.FC<{
  collectionId: string;
  close: () => void;
}> = (props) => {
  const [email, setEmail] = React.useState('');
  const [deleted, setDeleted] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [collection, setCollection] = useState<Collection | null>(null);
  const { shareCollection, revokeSharedAccess, collections } =
    useCollectionStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (collections[props.collectionId]) {
      setCollection(collections[props.collectionId]);
    }
  }, [collections]);

  const handleShareCollection = async () => {
    if (
      !collection?.sharedWith ||
      !Object.values(collection.sharedWith).some((user) => user.email === email)
    ) {
      setIsLoading(true);
      await shareCollection(
        user?.uid!,
        { ...collection!, id: props.collectionId },
        email
      );
      setIsLoading(false);
      setEmail('');
    } else {
      toastMessage('success', 'Collection already shared with this email');
    }
  };

  const handleRevokeAccess = async (key: string) => {
    await revokeSharedAccess(user?.uid!, props.collectionId, key);
    if (collection?.sharedWith!) {
      setDeleted([...deleted, key]);
    }
  };

  return (
    <>
      {isLoading && (
        <div className="flex relative w-20 h-20 items-center">
          <CommonLoading />
        </div>
      )}
      {!isLoading && (
        <>
          <div className="flex gap-2">
            <Input
              placeholder="Enter email address to share"
              value={email}
              onValueChange={setEmail}
            />
            <Button
              variant="flat"
              color="primary"
              onPress={handleShareCollection}
            >
              Share
            </Button>
          </div>
          <div className="flex flex-col">
            {collection?.sharedWith && (
              <>
                <h3 className="font-semibold mt-4 mb-2">Shared With</h3>
                {Object.entries(collection.sharedWith).map(([key, user]) => (
                  <div key={key}>
                    {!deleted.includes(key) && (
                      <div
                        className="flex items-center justify-between"
                        key={user.uid}
                      >
                        <span>{user.email}</span>
                        <Button
                          isIconOnly
                          variant="light"
                          className=""
                          onPress={() => handleRevokeAccess(key)}
                        >
                          <Icon
                            icon="material-symbols:delete-rounded"
                            className="text-xl cursor-pointer"
                          />
                        </Button>
                      </div>
                    )}
                  </div>
                ))}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ShareCollection;
