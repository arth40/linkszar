import { Button } from '@heroui/button';
import { Input, Textarea } from '@heroui/input';
import React, { useState } from 'react';
import { useAuthStore } from '../../store/userStore';
import { useCollectionStore } from '../../store/collectionStore';
const NewCollectionForm: React.FC<{ close: () => void }> = (props) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const { addCollection } = useCollectionStore();
  const { user } = useAuthStore();

  const handleCreateCollection = async () => {
    if (name.length > 20 || description.length > 250) return;
    await addCollection({ name, description }, user?.uid);
    props.close();
  };

  return (
    <div className="flex flex-col gap-4">
      <Input
        isRequired
        label="Collection Name"
        placeholder="Enter collection name"
        onValueChange={setName}
        isInvalid={name.length > 20}
        errorMessage="Max. length 20"
      />
      <Textarea
        label="Description"
        placeholder="Enter collection description"
        onValueChange={setDescription}
        isInvalid={description.length > 250}
        errorMessage="Max. length 250"
      />
      <Button variant="flat" color="primary" onPress={handleCreateCollection}>
        Create Collection
      </Button>
    </div>
  );
};

export default NewCollectionForm;
