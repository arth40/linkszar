import React from 'react';

const EmptyListMessage: React.FC<{ children: React.ReactNode }> = (props) => {
  return (
    <div className="flex h-20 text-medium justify-center items-center py-4 text-gray-300">
      {props.children}
    </div>
  );
};

export default EmptyListMessage;
