import { Button } from '@heroui/button';
import { Input, Textarea } from '@heroui/input';
import React from 'react';
import { useAuthStore } from '../../store/userStore';
import { useCollectionStore } from '../../store/collectionStore';
import type { Collection } from '../../types/collection';

const EditCollectionForm: React.FC<{
  collection: Collection;
  close: () => void;
}> = (props) => {
  const [name, setName] = React.useState(props.collection.name || '');
  const [description, setDescription] = React.useState(
    props.collection.description || ''
  );
  const { updateCollection } = useCollectionStore();
  const { user } = useAuthStore();

  const handleUpdateCollection = async () => {
    await updateCollection(user!.uid, props.collection.id!, {
      name,
      description,
    });
    props.close();
  };
  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Collection Name"
        placeholder="Enter collection name"
        value={name}
        onValueChange={setName}
      />
      <Textarea
        label="Description"
        placeholder="Enter collection description"
        value={description}
        onValueChange={setDescription}
      />
      <Button variant="flat" color="warning" onPress={handleUpdateCollection}>
        Update Collection
      </Button>
    </div>
  );
};

export default EditCollectionForm;
