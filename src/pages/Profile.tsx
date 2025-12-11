import { Card, CardBody, CardHeader } from '@heroui/card';
import { Image } from '@heroui/image';
import { Input } from '@heroui/input';
import React, { useEffect } from 'react';
import profile from '../assets/profile.png';
import { Button } from '@heroui/button';
import { Icon } from '@iconify/react';
import { useAuthStore } from '../store/userStore';
import { updateUserName } from '../services/userService';
import CommonModal from '../components/common/CommonModal';
import PrivacyPolicy from '../components/common/PrivacyPolicy';
import TermsOfService from '../components/common/TermsOfService';
import { useNavigate } from 'react-router-dom';

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const { user, userDetails, logout } = useAuthStore();

  const [isEdit, setIsEdit] = React.useState(false);
  const [username, setUsername] = React.useState('');
  const [modalTitle, setModalTitle] = React.useState('');
  const [modalchild, setModalChild] = React.useState<React.ReactNode>(<></>);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  useEffect(() => {
    if (userDetails?.username) {
      setUsername(userDetails.username);
    }
  }, [userDetails]);

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
    if (isEdit) {
      await updateUserName(user?.uid || '', username);
    }
    setIsEdit(!isEdit);
  };

  return (
    <>
      <div className="flex flex-col w-full h-full items-center pb-20 justify-center gap-4">
        <Button
          variant="flat"
          className="flex items-center text-primary-900"
          onPress={() => navigate('/portfolio')}
        >
          <Icon icon="mi:switch" className="text-2xl" />
          <p>Switch to Portfolio</p>
        </Button>
        <Card className="py-4 w-80">
          <CardHeader className="pb-0 pt-2 px-4 flex-col">
            <Image
              alt="Card background"
              className="object-cover rounded-xl size-30"
              src={profile}
            />
          </CardHeader>
          <CardBody className="overflow-visible py-2 flex flex-col gap-4">
            <Input
              isDisabled
              labelPlacement="inside"
              label="Email"
              value={userDetails?.email || ''}
              name="email"
              type="email"
              variant="faded"
              className="opacity-70"
              classNames={{
                inputWrapper: 'bg-primary-50',
              }}
            />
            <Input
              readOnly={!isEdit}
              labelPlacement="outside"
              label="Username"
              name="username"
              type="text"
              variant="faded"
              className={`${isEdit ? 'opacity-100' : 'opacity-70'}`}
              classNames={{
                inputWrapper: 'bg-primary-50',
                input: `${isEdit ? '' : 'disabled cursor-not-allowed'}`,
              }}
              value={username}
              onValueChange={setUsername}
              endContent={
                <Button
                  isIconOnly={true}
                  variant="light"
                  size="sm"
                  onPress={() => editSaveAction()}
                  className="focus:outline-none z-10"
                >
                  <Icon
                    icon={isEdit ? 'typcn:tick' : 'fa7-solid:edit'}
                    className={`${isEdit ? 'text-success text-2xl' : 'text-default-500 text-xl'}`}
                  />
                </Button>
              }
            />
            <Button
              variant="light"
              className="linkszar-light mt-2 text-md"
              color="danger"
              startContent={<Icon icon="mdi:logout" className="text-lg" />}
              onPress={logout}
            >
              Log out
            </Button>
            <div className="flex justify-evenly mt-2 text-sm text-default-400">
              <p className="cursor-pointer" onClick={openPrivacyModal}>
                Privacy Policy
              </p>
              <p className="cursor-pointer" onClick={openTOSModal}>
                Terms of Service
              </p>
            </div>
          </CardBody>
        </Card>
        <CommonModal
          isOpen={isModalOpen}
          title={modalTitle}
          children={modalchild}
          closeModal={() => setIsModalOpen(false)}
        ></CommonModal>
      </div>
    </>
  );
};

export default Profile;
