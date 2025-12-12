import { Input } from '@heroui/input';
import { Button } from '@heroui/button';
import { Autocomplete, AutocompleteItem } from '@heroui/autocomplete';
import React, { useState } from 'react';
import { useCollectionStore } from '../../store/collectionStore';
import { useLinkStore } from '../../store/linkStore';

const NewLinkForm: React.FC<{ close: () => void }> = (props) => {
  const [link, setLink] = useState('');
  const [placeholder, setPlaceholder] = useState('');
  const [collection, setCollection] = useState('default');
  const { collections } = useCollectionStore();
  const { addLink } = useLinkStore();

  const setSelectedCollectionId = (key: any) => {
    setCollection(key);
  };

  const handleAddLink = async () => {
    if (placeholder.length > 40 || !collection) return;
    const linkData = {
      url: link,
      placeholder,
    };

    await addLink(collection, linkData);
    props.close();
  };
  return (
    <>
      <div className="flex flex-col gap-4">
        <Input
          isRequired
          label="Link"
          placeholder="Paste Link here..."
          labelPlacement="outside"
          value={link}
          onValueChange={setLink}
        />
        <Input
          isRequired
          label="Placeholder"
          placeholder="Enter a Title"
          labelPlacement="outside"
          value={placeholder}
          onValueChange={setPlaceholder}
          isInvalid={placeholder.length > 40}
          errorMessage="Max. length 40"
        />
        <Autocomplete
          isRequired
          label="Collection"
          labelPlacement="outside"
          placeholder="Select a collection"
          defaultSelectedKey="default"
          defaultInputValue="default"
          onSelectionChange={setSelectedCollectionId}
        >
          <AutocompleteItem key="default">default</AutocompleteItem>
          <>
            {Object.entries(collections).map(([id, collection]) => (
              <AutocompleteItem key={id} textValue={collection.name}>
                <p className="flex items-end gap-1">
                  <span className="font-semibold">{collection.name}</span>
                  <span className="text-xs">({id.slice(-5)})</span>
                </p>
              </AutocompleteItem>
            ))}
          </>
        </Autocomplete>

        <Button variant="flat" color="primary" onPress={handleAddLink}>
          Add Link
        </Button>
      </div>
    </>
  );
};

export default NewLinkForm;
