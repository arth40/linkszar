import React from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import collectioncover from '../../assets/linkcollection.png';
import { Icon } from '@iconify/react';
import { Button } from '@heroui/button';
import { Tooltip } from '@heroui/tooltip';
import { useNavigate } from 'react-router-dom';
import { Image } from '@heroui/image';

interface CollectionCardProps {
  id: string;
  title: string;
  ownerId?: string;
  totalLinks?: number;
  page: 'collection' | 'shared';
  editCollection?: () => void;
  shareCollection?: () => void;
  deleteCollection?: () => void;
  deleteAllLinks?: () => void;
}

const CollectionCard: React.FC<CollectionCardProps> = (props) => {
  const navigate = useNavigate();

  const viewCollectionLinks = () => {
    if (props.page === 'collection') {
      navigate(`/collection/${props.id}`);
    } else {
      navigate(`/shared/${props.ownerId}/${props.id}`);
    }
  };

  return (
    <>
      <Card className="w-full cursor-pointer">
        <CardHeader
          className="pb-0 pt-2 px-4 flex-col"
          onClick={() => viewCollectionLinks()}
        >
          <Image
            src={collectioncover}
            alt="Collection Cover"
            className="size-28 object-cover"
          />
          <span className="text-md font-semibold break-all">{props.title}</span>
        </CardHeader>
        <CardBody
          className="overflow-visible py-2 flex flex-col gap-4 mb-2"
          onClick={() => viewCollectionLinks()}
        >
          {!['default'].includes(props.id) && props.page === 'collection' && (
            <div className="actions flex w-full justify-center gap-4">
              <Tooltip content="Edit collection" placement="top">
                <Button
                  isIconOnly
                  variant="bordered"
                  size="sm"
                  className="p-0"
                  onPress={props.editCollection}
                >
                  <Icon
                    icon="tabler:edit"
                    className="text-xl cursor-pointer text-[#cc9900]"
                  />
                </Button>
              </Tooltip>
              <Tooltip content="Share collection" placement="top">
                <Button
                  isIconOnly
                  variant="bordered"
                  size="sm"
                  className="p-0"
                  onPress={props.shareCollection}
                >
                  <Icon
                    icon="fluent:channel-share-48-filled"
                    className="text-xl cursor-pointer text-primary-900"
                  />
                </Button>
              </Tooltip>
              <Tooltip content="Delete collection" placement="top">
                <Button
                  isIconOnly
                  variant="bordered"
                  size="sm"
                  className="p-0"
                  onPress={props.deleteCollection}
                >
                  <Icon
                    icon="material-symbols:delete-rounded"
                    className="text-xl cursor-pointer text-[#990000]"
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
                  className="p-0"
                  onPress={props.deleteAllLinks}
                >
                  <Icon
                    icon="fe:delete-link"
                    className="text-xl cursor-pointer text-[#990000]"
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
