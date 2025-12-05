import React from 'react';
import type { ReactNode } from 'react';
import Navbar from './common/navbar/Navbar';
import Topbar from './common/Topbar';

const MainLayout: React.FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className="app-container">
      <Topbar />
      <div className="flex">
        <Navbar />
        <main className="content md:ml-16 mt-16 flex-1 h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)] border-t-1.5 border-primary-50 p-4">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
