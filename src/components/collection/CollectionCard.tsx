import React from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import collectioncover from '../../assets/linkcollection.png';
import { Icon } from '@iconify/react';
import { Button } from '@heroui/button';
import { Tooltip } from '@heroui/react';
import { useCollectionStore } from '../../store/collectionStore';

interface CollectionCardProps {
  id: string;
  title: string;
  description?: string;
  totalLinks?: number;
  editCollection?: () => void;
  shareCollection?: () => void;
}

const CollectionCard: React.FC<CollectionCardProps> = (props) => {
  const { deleteCollection } = useCollectionStore();
  return (
    <>
      <Card className="w-full cursor-pointer">
        <CardHeader className="pb-0 pt-2 px-4 flex-col">
          <img
            src={collectioncover}
            alt="Collection Cover"
            className="h-20 md:h-24 object-cover"
          />
          <span className="text-lg font-semibold">{props.title}</span>
          {!['shared'].includes(props.id) && (
            <p className="cursor-pointer flex gap-2 items-center text-lg">
              <Icon icon="mdi:link" /> {props?.totalLinks || 0}
            </p>
          )}
        </CardHeader>
        <CardBody className="overflow-visible py-2 flex flex-col gap-4 mb-2">
          {!['default', 'shared'].includes(props.id) && (
            <div className="actions flex w-full justify-center gap-4">
              <Tooltip content="Edit Collection" placement="top">
                <Button
                  isIconOnly
                  variant="bordered"
                  size="sm"
                  className="p-0"
                  onPress={props.editCollection}
                >
                  <Icon
                    icon="tabler:edit"
                    className="text-xl cursor-pointer text-gray-600"
                  />
                </Button>
              </Tooltip>
              <Tooltip content="Share Collection" placement="top">
                <Button
                  isIconOnly
                  variant="bordered"
                  size="sm"
                  className="p-0"
                  onPress={props.shareCollection}
                >
                  <Icon
                    icon="fluent:channel-share-48-filled"
                    className="text-xl cursor-pointer text-gray-600"
                  />
                </Button>
              </Tooltip>
              <Tooltip content="Delete Collection" placement="top">
                <Button
                  isIconOnly
                  variant="bordered"
                  size="sm"
                  className="p-0"
                  onPress={() => deleteCollection(props.id)}
                >
                  <Icon
                    icon="material-symbols:delete-rounded"
                    className="text-xl cursor-pointer text-gray-600"
                  />
                </Button>
              </Tooltip>
              <Tooltip
                content="Delete Collection & Links"
                color="danger"
                placement="top"
              >
                <Button
                  isIconOnly
                  variant="flat"
                  color="danger"
                  size="sm"
                  className="p-0"
                >
                  <Icon
                    icon="fe:delete-link"
                    className="text-xl cursor-pointer text-danger"
                  />
                </Button>
              </Tooltip>
            </div>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export default CollectionCard;
