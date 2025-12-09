import { Tooltip } from '@heroui/react';
import React from 'react';

const NavbarTooltip: React.FC<{ children: React.ReactNode; text: string }> = ({
  children,
  text,
}) => {
  return (
    <Tooltip
      content={text}
      placement="right"
      className="linkszar-light text-primary-300 bg-primary-50"
      closeDelay={1000}
      showArrow
    >
      {children}
    </Tooltip>
  );
};

export default NavbarTooltip;
