import React from 'react';

const ActionBar: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="w-full h-12 flex items-center md:px-4">{children}</div>
  );
};

export default ActionBar;
