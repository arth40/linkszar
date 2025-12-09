import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import React from 'react';
import type { Collection } from '../../types/collection';
import { useCollectionStore } from '../../store/collectionStore';
import { useAuthStore } from '../../store/userStore';
import toastMessage from '../../services/toasterService';
import { Icon } from '@iconify/react';
import CommonLoading from '../common/CommonLoading';

const ShareCollection: React.FC<{
  collection: Collection;
  close: () => void;
}> = (props) => {
  const [email, setEmail] = React.useState('');
  const [deleted, setDeleted] = React.useState<string[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const { shareCollection, revokeSharedAccess } = useCollectionStore();
  const { user } = useAuthStore();

  const handleShareCollection = async () => {
    if (
      !props.collection.sharedWith ||
      !Object.values(props.collection.sharedWith).some(
        (user) => user.email === email
      )
    ) {
      setIsLoading(true);
      await shareCollection(user?.uid!, props.collection, email);
      setIsLoading(false);
      setEmail('');
    } else {
      toastMessage('success', 'Collection already shared with this email');
    }
  };

  const handleRevokeAccess = async (key: string) => {
    await revokeSharedAccess(user?.uid!, props.collection.id!, key);
    if (props.collection?.sharedWith) {
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
            {props.collection.sharedWith && (
              <>
                <h3 className="font-semibold mt-4 mb-2">Shared With</h3>
                {Object.entries(props.collection.sharedWith).map(
                  ([key, user]) => (
                    <>
                      {!deleted.includes(key) && (
                        <div className="flex items-center justify-between">
                          <span key={key}>{user.email}</span>
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
                    </>
                  )
                )}
              </>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default ShareCollection;
