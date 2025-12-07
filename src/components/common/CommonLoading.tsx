import { Spinner } from '@heroui/spinner';
import React from 'react';

const CommonLoading: React.FC = () => {
  return (
    <div className="flex w-full absolute items-center justify-center h-full z-50">
      <div className="text-lg">
        <Spinner size="lg" />
      </div>
    </div>
  );
};

export default CommonLoading;
