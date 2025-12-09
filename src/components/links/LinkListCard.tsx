import React from 'react';
import { Card, CardBody, CardHeader } from '@heroui/card';
import type { Link } from '../../types/link';
import { Icon } from '@iconify/react';
import { Tooltip } from '@heroui/tooltip';
import { Button } from '@heroui/button';
import toastMessage from '../../services/toasterService';
import { useLinkStore } from '../../store/linkStore';
import { Image } from '@heroui/image';

interface LinkListCardProps {
  link: Link;
  view: 'list' | 'thumbnail';
}

const LinkListCard: React.FC<LinkListCardProps> = (props) => {
  const { deleteLink } = useLinkStore();
  const copyToClipboard = async (): Promise<boolean> => {
    try {
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(props.link.url);
        toastMessage('success', 'Link copied');
        return true;
      }
      throw new Error('Clipboard API not supported');
    } catch (error) {
      console.error('Failed to copy:', error);
      return false;
    }
  };

  const handleOpenInNewTab = (): void => {
    const newWindow = window.open(
      props.link.url,
      '_blank',
      'noopener,noreferrer'
    );
    if (newWindow) newWindow.opener = null;
  };

  const handleDeleteLink = async () => {
    deleteLink(props.link);
  };

  return (
    <>
      <Card className="w-full cursor-pointer">
        {props.view === 'thumbnail' && (
          <CardHeader onClick={() => handleOpenInNewTab()}>
            <div className="flex w-full h-24 md:h-30 items-center justify-center">
              <Image
                removeWrapper
                src={`https://www.google.com/s2/favicons?domain=${props.link.url}&sz=256`}
                className="size-12 md:size-16"
              />
            </div>
          </CardHeader>
        )}
        <CardBody
          className="overflow-visible py-2 flex flex-row items-center gap-4 mb-2"
          onClick={() => handleOpenInNewTab()}
        >
          {props.view === 'list' && (
            <Icon
              icon="material-symbols:link-rounded"
              className="text-4xl cursor-pointer text-primary"
            />
          )}
          <div className="flex w-full">
            <div className="flex flex-col w-full gap-1">
              <p className="font-semibold">{props.link.placeholder}</p>
              <p>{props.link.collectionName}</p>
            </div>
            <div className="actions flex pl-1 justify-center gap-2">
              <Tooltip content="Copy Link" placement="top">
                <Button
                  isIconOnly
                  variant="bordered"
                  size="sm"
                  className="p-0"
                  onPress={() => copyToClipboard()}
                >
                  <Icon
                    icon="solar:copy-bold-duotone"
                    className="text-xl cursor-pointer text-primary"
                  />
                </Button>
              </Tooltip>
              <Tooltip content="Delete Link" placement="top">
                <Button
                  isIconOnly
                  variant="bordered"
                  size="sm"
                  className="p-0"
                  onPress={() => handleDeleteLink()}
                >
                  <Icon
                    icon="material-symbols:delete-rounded"
                    className="text-xl cursor-pointer text-[#ff0000bb]"
                  />
                </Button>
              </Tooltip>
            </div>
          </div>
        </CardBody>
      </Card>
    </>
  );
};

export default LinkListCard;
