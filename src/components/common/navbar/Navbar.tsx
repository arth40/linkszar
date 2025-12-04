import React, { useEffect } from 'react';
import { Icon } from '@iconify/react';
import NavbarTooltip from './NavbarTooltip';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
  const [activeTab, setActiveTab] = React.useState('/');
  const navigate = useNavigate();
  const navigateToPage = (page: string) => {
    // setActiveTab(page);
    navigate(page);
    // console.log('Active Tab:', page, activeTab);
  };
  useEffect(() => {
    setActiveTab(window.location.pathname);
  }, []);
  return (
    <>
      <div className="navbar w-screen md:w-16 h-16 md:h-screen fixed left-0 bottom-0 md:top-0 border-primary-50 border-t-2 md:border-r-2 md:border-t-0 flex md:flex-col items-center justify-evenly md:justify-start md:pt-18 gap-8 text-3xl md:text-2xl text-primary-900">
        <NavbarTooltip text="Add New">
          <Icon icon="icon-park-outline:add-three" className="cursor-pointer" />
        </NavbarTooltip>
        <NavbarTooltip text="Home">
          <Icon
            icon="fluent-emoji-high-contrast:link"
            className={`${activeTab === '/' ? 'text-primary' : ''} cursor-pointer`}
            onClick={() => navigateToPage('/')}
          />
        </NavbarTooltip>
        <NavbarTooltip text="Collection">
          <Icon
            icon="fluent:collections-empty-24-regular"
            className={`${activeTab === '/collection' ? 'text-primary' : ''} cursor-pointer`}
            onClick={() => navigateToPage('/collection')}
          />
        </NavbarTooltip>
        <NavbarTooltip text="Groups">
          <Icon
            icon="hugeicons:user-group"
            className={`${activeTab === '/shared' ? 'text-primary' : ''} cursor-pointer`}
            onClick={() => navigateToPage('/shared')}
          />
        </NavbarTooltip>
        <NavbarTooltip text="Profile">
          <Icon
            icon="solar:user-outline"
            className={`${activeTab === '/profile' ? 'text-primary' : ''} cursor-pointer`}
            onClick={() => navigateToPage('/profile')}
          />
        </NavbarTooltip>
      </div>
    </>
  );
};

export default Navbar;
