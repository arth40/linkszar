import React from 'react';
// import type { ReactNode } from 'react';
import Navbar from './common/navbar/Navbar';
import Topbar from './common/Topbar';
import { Outlet } from 'react-router-dom';

const MainLayout: React.FC = () => {
  return (
    <div className="app-container">
      <Topbar />
      <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)] md:h-screen">
        <Navbar />
        <main className="content md:ml-16 mt-16 flex-1 overflow-hidden border-t-1.5 border-primary-50 p-4">
          <Outlet />
        </main>
        <div className="adsColumn relative w-full lg:w-72 bg-primary-50 h-25 lg:h-screen"></div>
      </div>
    </div>
  );
};

export default MainLayout;
