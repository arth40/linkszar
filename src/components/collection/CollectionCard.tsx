import React from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import collectioncover from '../../assets/linkcollection.png';
import { Icon } from '@iconify/react';
import { Button } from '@heroui/button';
import { Tooltip } from '@heroui/react';

interface CollectionCardProps {
  id: string;
  title: string;
  description?: string;
  totalLinks?: number;
  editCollection?: () => void;
  shareCollection?: () => void;
  deleteCollection?: () => void;
  deleteAllLinks?: () => void;
}

const CollectionCard: React.FC<CollectionCardProps> = (props) => {
  return (
    <>
      <Card className="w-full cursor-pointer">
        <CardHeader className="pb-0 pt-2 px-4 flex-col">
          <img
            src={collectioncover}
            alt="Collection Cover"
            className="h-20 object-cover"
          />
          <span className="text-md font-semibold">{props.title}</span>
        </CardHeader>
        <CardBody className="overflow-visible py-2 flex flex-col gap-4 mb-2">
          {!['default', 'shared'].includes(props.id) && (
            <div className="actions flex w-full justify-center gap-4">
              <Tooltip content="Edit collection" placement="top">
                <Button
                  isIconOnly
                  variant="bordered"
                  size="sm"
                  className="p-0 border-warning-100"
                  onPress={props.editCollection}
                >
                  <Icon
                    icon="tabler:edit"
                    className="text-xl cursor-pointer text-warning-400"
                  />
                </Button>
              </Tooltip>
              <Tooltip content="Share collection" placement="top">
                <Button
                  isIconOnly
                  variant="bordered"
                  size="sm"
                  className="p-0 border-primary-100"
                  onPress={props.shareCollection}
                >
                  <Icon
                    icon="fluent:channel-share-48-filled"
                    className="text-xl cursor-pointer text-primary"
                  />
                </Button>
              </Tooltip>
              <Tooltip content="Delete collection" placement="top">
                <Button
                  isIconOnly
                  variant="bordered"
                  size="sm"
                  className="p-0 border-[#ff000030]"
                  onPress={props.deleteCollection}
                >
                  <Icon
                    icon="material-symbols:delete-rounded"
                    className="text-xl cursor-pointer text-[#ff0000bb]"
                  />
                </Button>
              </Tooltip>
              <Tooltip
                content="Delete all links"
                color="danger"
                placement="top"
              >
                <Button
                  isIconOnly
                  variant="bordered"
                  size="sm"
                  className="p-0 border-[#ff000030]"
                  onPress={props.deleteAllLinks}
                >
                  <Icon
                    icon="fe:delete-link"
                    className="text-xl cursor-pointer text-[#ff0000bb]"
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
