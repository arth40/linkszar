import React from 'react';
import { Card, CardBody } from '@heroui/card';
import { Image } from '@heroui/image';
import type { PortfolioLinks } from '../../types/portfolio.';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';

const PortfolioLinkCard: React.FC<{ link: PortfolioLinks }> = (props) => {
  return (
    <div>
      <Link to={props.link.url}>
        <Card className="w-full cursor-pointer bg-primary-50 text-primary-900">
          <CardBody className="overflow-visible px-0 py-0 flex flex-row items-center gap-4">
            <div className="flex p-4">
              <Image
                removeWrapper
                src={`https://www.google.com/s2/favicons?domain=${props.link.url}&sz=256`}
                className="size-12"
              />
            </div>
            <div className="flex flex-1 w-full">
              <p className="font-semibold">{props.link.details}</p>
            </div>
            <div className="flex h-full p-4 items-center justify-center">
              <Icon
                icon="material-symbols:web-traffic-rounded"
                className="text-3xl"
              />
            </div>
          </CardBody>
        </Card>
      </Link>
    </div>
  );
};

export default PortfolioLinkCard;
