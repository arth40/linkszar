import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useAuthStore } from '../store/userStore';
import { updateDisplayName } from '../services/userService';
import CommonModal from '../components/common/CommonModal';
import PrivacyPolicy from '../components/common/PrivacyPolicy';
import TermsOfService from '../components/common/TermsOfService';
import Logo from '../components/brand/Logo';

const Account: React.FC = () => {
  const navigate = useNavigate();
  const { user, userDetails, logout } = useAuthStore();

  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalChild, setModalChild] = useState<React.ReactNode>(<></>);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (userDetails?.name) setName(userDetails.name);
  }, [userDetails?.name]);

  const openPrivacyModal = () => {
    setModalTitle('Privacy Policy');
    setModalChild(<PrivacyPolicy />);
    setIsModalOpen(true);
  };

  const openTOSModal = () => {
    setModalTitle('Terms of Service');
    setModalChild(<TermsOfService />);
    setIsModalOpen(true);
  };

  const editSaveAction = async () => {
    if (isEdit && name.trim()) {
      await updateDisplayName(user?.uid || '', name.trim());
    }
    setIsEdit(!isEdit);
  };

  return (
    <>
      <Helmet>
        <title>Account ~ Linkszar</title>
      </Helmet>
      <div className="min-h-screen w-full bg-paper flex flex-col items-center gap-8 py-8 px-4">
        <RouterLink to="/">
          <Logo />
        </RouterLink>

        <button
          type="button"
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-[13.5px] font-semibold text-ink-70 bg-transparent border-none cursor-pointer"
        >
          <Icon icon="lucide:arrow-left" className="text-[15px]" />
          Back to dashboard
        </button>

        <div className="w-full max-w-[380px] bg-white border border-line rounded-[20px] p-7 flex flex-col gap-5">
          <div>
            <p className="font-display font-semibold text-[22px] m-0">
              Account
            </p>
            {userDetails?.handle && (
              <p className="text-[13px] text-mist mt-1 mb-0">
                linkszar.com/{userDetails.handle}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-semibold text-ink-70">
              Email
            </label>
            <input
              disabled
              value={userDetails?.email || ''}
              className="border-[1.5px] border-line rounded-[10px] px-3.5 py-2.5 text-[14px] font-sans text-mist bg-paper"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label htmlFor="account-name" className="text-[12px] font-semibold text-ink-70">
              Display name
            </label>
            <div className="flex items-center gap-2">
              <input
                id="account-name"
                type="text"
                readOnly={!isEdit}
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`flex-1 border-[1.5px] rounded-[10px] px-3.5 py-2.5 text-[14px] font-sans outline-none ${
                  isEdit ? 'border-ink' : 'border-line text-ink-70 bg-paper'
                }`}
              />
              <button
                type="button"
                aria-label={isEdit ? 'Save name' : 'Edit name'}
                onClick={editSaveAction}
                className="w-[40px] h-[40px] rounded-[10px] border-[1.5px] border-ink flex items-center justify-center bg-transparent cursor-pointer shrink-0"
              >
                <Icon
                  icon={isEdit ? 'lucide:check' : 'lucide:pencil'}
                  className="text-ink text-[15px]"
                />
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={logout}
            className="flex items-center justify-center gap-2 text-[14px] font-semibold text-danger-ink bg-transparent border border-line rounded-[10px] py-2.5 cursor-pointer"
          >
            <Icon icon="lucide:log-out" className="text-[15px]" />
            Log out
          </button>

          <div className="flex justify-evenly text-[12.5px] text-mist pt-1">
            <button
              type="button"
              onClick={openPrivacyModal}
              className="bg-transparent border-none cursor-pointer text-mist"
            >
              Privacy Policy
            </button>
            <button
              type="button"
              onClick={openTOSModal}
              className="bg-transparent border-none cursor-pointer text-mist"
            >
              Terms of Service
            </button>
          </div>
        </div>

        <CommonModal
          isOpen={isModalOpen}
          title={modalTitle}
          closeModal={() => setIsModalOpen(false)}
        >
          {modalChild}
        </CommonModal>
      </div>
    </>
  );
};

export default Account;
