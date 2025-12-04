import { Icon } from '@iconify/react';
import React from 'react';

const Contact: React.FC = () => {
  return (
    <>
      <p className="flex items-center gap-2 pt-1">
        <span className="text-primary text-2xl">
          <Icon icon="mdi:account-question" />
        </span>
        &nbsp;
        <span>help@linkszar.com</span>
      </p>
      <p className="flex items-center gap-2 pt-1">
        <span className="text-primary text-2xl">
          <Icon icon="mdi:code-tags" />
        </span>
        &nbsp;
        <span>developers@linkszar.com</span>
      </p>
      <p className="flex items-center gap-2 pt-1">
        <span className="text-primary text-2xl">
          <Icon icon="mdi:office-building" />
        </span>
        &nbsp;
        <span>business@linkszar.com</span>
      </p>
    </>
  );
};

export default Contact;
