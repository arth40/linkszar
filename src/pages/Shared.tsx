import React from 'react';
import MainLayout from '../components/MainLayout';

const Shared: React.FC = () => {
  return (
    <div>
      <MainLayout>
        <h1 className="text-3xl font-bold underline">Shared</h1>
      </MainLayout>
    </div>
  );
};

export default Shared;
