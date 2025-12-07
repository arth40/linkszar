import { Button } from '@heroui/button';
import { Input, Textarea } from '@heroui/input';
import React from 'react';
import { useAuthStore } from '../../store/userStore';
import { useCollectionStore } from '../../store/collectionStore';

const NewCollectionForm: React.FC<{ close: () => void }> = (props) => {
  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');
  const { addCollection } = useCollectionStore();
  const { user } = useAuthStore();

  const handleCreateCollection = async () => {
    await addCollection({ name, description }, user?.uid);
    props.close();
  };
  return (
    <div className="flex flex-col gap-4">
      <Input
        label="Collection Name"
        placeholder="Enter collection name"
        onValueChange={setName}
      />
      <Textarea
        label="Description"
        placeholder="Enter collection description"
        onValueChange={setDescription}
      />
      <Button variant="flat" color="primary" onPress={handleCreateCollection}>
        Create Collection
      </Button>
    </div>
  );
};

export default NewCollectionForm;
