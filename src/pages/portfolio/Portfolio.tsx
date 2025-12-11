import { Card, CardBody, CardFooter, CardHeader } from '@heroui/card';
import { Input, Textarea } from '@heroui/input';
import React, { useEffect, useState } from 'react';
import { Button } from '@heroui/button';
import { Icon } from '@iconify/react';
import { useAuthStore } from '../../store/userStore';
import { useLocation, useNavigate } from 'react-router-dom';
import type { PortfolioLinks } from '../../types/portfolio.';
import toastMessage from '../../services/toasterService';
import {
  createOrUpdatePortoflio,
  getPorfolio,
} from '../../services/portfolioService';

const Portfolio: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, userDetails } = useAuthStore();

  const [about, setAbout] = useState('');
  const [links, setLinks] = useState<Array<PortfolioLinks>>([]);

  const addNewLink = () => {
    if (links.some((link) => !link.url || !link.details)) {
      toastMessage('error', 'Please complete details first');
    } else {
      setLinks([...links, { url: '', details: '' }]);
    }
  };

  const updateLinkUrlAtIndex = (value: string, index: number) => {
    const updatedData = [...links];
    updatedData[index].url = value;
    setLinks(updatedData);
  };

  const updateLinkDetailsAtIndex = (value: string, index: number) => {
    const updatedData = [...links];
    updatedData[index].details = value;
    setLinks(updatedData);
  };

  const removeLinkAtIndex = (index: number) => {
    const updatedData = [...links];
    updatedData.splice(index, 1);
    setLinks(updatedData);
  };

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    const portfolio = await getPorfolio(user?.uid);
    setAbout(portfolio?.about || '');
    setLinks(portfolio?.links || []);
  };

  const syncPortfolio = async () => {
    if (links.length >= 6) {
      setLinks(links.slice(0, 6));
    }
    const porfolio = {
      name: userDetails?.username || '',
      about,
      links,
    };
    await createOrUpdatePortoflio(porfolio, user?.uid);
    await fetchPortfolio();
  };

  const viewPortfolio = () => {
    const newWindow = window.open(
      `${window.location.origin}${location.pathname}/${user?.uid}`,
      '_blank',
      'noopener,noreferrer'
    );
    if (newWindow) newWindow.opener = null;
  };

  return (
    <>
      <div className="flex flex-col w-full h-full items-center justify-center gap-4">
        <Button
          variant="flat"
          className="flex items-center text-primary-900"
          onPress={() => navigate('/profile')}
        >
          <Icon icon="mi:switch" className="text-2xl" />
          <p>Switch to Profile</p>
        </Button>
        <Card className="py-4 w-full md:w-100">
          <Button
            variant="solid"
            onPress={() => viewPortfolio()}
            className="focus:outline-none flex items-center font-semibold bg-primary-900 text-gray-100 rounded-none"
          >
            View Portfolio{' '}
            <Icon
              icon="material-symbols:web-traffic-rounded"
              className="text-xl"
            />
          </Button>
          <CardHeader className="pb-0 pt-2 px-4 flex-col mb-4">
            <p className="text-xl font-semibold">Edit Portfolio</p>
          </CardHeader>
          <CardBody className="overflow-visible py-2 flex flex-col gap-4 h-100 overflow-y-auto">
            <Textarea
              label="About You"
              placeholder="Who are you?"
              value={about}
              onValueChange={setAbout}
            />
            {links.map((link, index) => (
              <div
                className="flex flex-col w-full border border-gray-200 rounded-md p-2"
                key={index}
              >
                <Input
                  labelPlacement="inside"
                  label={`Link ${index + 1}`}
                  value={link.details}
                  name="details"
                  type="text"
                  variant="flat"
                  classNames={{ inputWrapper: 'rounded-b-none' }}
                  onValueChange={(value) =>
                    updateLinkDetailsAtIndex(value, index)
                  }
                  endContent={
                    <Button
                      isIconOnly={true}
                      variant="light"
                      size="sm"
                      onPress={() => removeLinkAtIndex(index)}
                      className="focus:outline-none z-10"
                    >
                      <Icon
                        icon={'lets-icons:remove'}
                        className={`text-[#990000] text-2xl`}
                      />
                    </Button>
                  }
                />
                <Input
                  name="link"
                  placeholder="Paste your link here..."
                  type="text"
                  variant="flat"
                  className=""
                  classNames={{ inputWrapper: 'rounded-t-none' }}
                  value={link.url}
                  onValueChange={(value) => updateLinkUrlAtIndex(value, index)}
                />
              </div>
            ))}
          </CardBody>
          <CardFooter className="flex flex-col items-center px-4">
            <div className="w-full flex justify-evenly pb-4">
              {links && links.length < 6 && (
                <Button
                  variant="bordered"
                  onPress={() => addNewLink()}
                  className="focus:outline-none text-primary-900"
                >
                  Add Link
                </Button>
              )}
              <Button
                variant="solid"
                color="primary"
                onPress={() => syncPortfolio()}
                className="focus:outline-none text-white bg-primary-500"
              >
                Sync changes
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default Portfolio;
