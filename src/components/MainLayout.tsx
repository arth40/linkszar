import React from 'react';
// import type { ReactNode } from 'react';
import Navbar from './navbar/Navbar';
import Topbar from './common/Topbar';
import { Outlet, useLocation } from 'react-router-dom';

const MainLayout: React.FC = () => {
  const location = useLocation();

  const adExcluded = () => {
    return ['/profile', '/portfolio'].includes(location.pathname);
  };

  return (
    <div className="app-container">
      <Topbar />
      <Navbar />
      <main
        className={`fixed p-4 top-16 md:left-12 w-full md:w-[calc(100vw-2rem)] ${adExcluded() ? 'lg:w-[calc(100vw-8rem)]' : 'lg:w-[calc(100vw-20rem)'} ${adExcluded() ? 'h-[calc(var(--vh)*100-8rem)]' : 'h-[calc(var(--vh)*100-14rem)]'} md:h-[calc(var(--vh)*100-9rem)] lg:h-[calc(var(--vh)*100-4rem)]`}
      >
        <Outlet />
      </main>
      {!adExcluded() && (
        <div className="adsColumn fixed md:right-0 bottom-16 md:bottom-0 w-screen lg:w-72 bg-primary-50 h-24 lg:h-screen"></div>
      )}
    </div>
  );
};

export default MainLayout;
