import React from 'react';
import { Icon } from '@iconify/react';
import NavbarTooltip from './NavbarTooltip';
import { useLocation, useNavigate } from 'react-router-dom';
import CommonModal from '../common/CommonModal';
import NewLinkForm from '../links/NewLinkForm';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const activeTab = location.pathname;
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const navigateToPage = (page: string) => {
    navigate(page);
  };
  return (
    <>
      <div className="navbar bg-white w-screen md:w-16 h-16 md:h-screen fixed left-0 bottom-0 md:top-0 border-primary-50 border-t-2 md:border-r-2 md:border-t-0 flex md:flex-col items-center justify-evenly md:justify-start md:pt-18 gap-7 text-4xl md:text-[34px] text-primary-900">
        <NavbarTooltip text="Add New">
          <Icon
            icon="icon-park-outline:add-three"
            className="cursor-pointer p-1"
            onClick={() => setIsModalOpen(true)}
          />
        </NavbarTooltip>
        <NavbarTooltip text="Home">
          <Icon
            icon="fluent-emoji-high-contrast:link"
            className={`${activeTab === '/' ? 'text-primary' : ''} cursor-pointer p-1`}
            onClick={() => navigateToPage('/')}
          />
        </NavbarTooltip>
        <NavbarTooltip text="Collection">
          <Icon
            icon="fluent:collections-empty-24-regular"
            className={`${activeTab === '/collection' ? 'text-primary' : ''} cursor-pointer p-1`}
            onClick={() => navigateToPage('/collection')}
          />
        </NavbarTooltip>
        <NavbarTooltip text="Shared with me">
          <Icon
            icon="hugeicons:user-group"
            className={`${activeTab === '/shared' ? 'text-primary' : ''} cursor-pointer p-1`}
            onClick={() => navigateToPage('/shared')}
          />
        </NavbarTooltip>
        <NavbarTooltip text="Profile">
          <Icon
            icon="solar:user-outline"
            className={`${activeTab === '/profile' ? 'text-primary' : ''} cursor-pointer p-1`}
            onClick={() => navigateToPage('/profile')}
          />
        </NavbarTooltip>
      </div>
      <CommonModal
        isOpen={isModalOpen}
        closeModal={() => setIsModalOpen(false)}
        title="Add new Link"
      >
        <NewLinkForm close={() => setIsModalOpen(false)} />
      </CommonModal>
    </>
  );
};

export default Navbar;
