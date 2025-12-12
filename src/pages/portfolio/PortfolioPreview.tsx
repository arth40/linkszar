import React, { useEffect, useState } from 'react';
import Topbar from '../../components/common/Topbar';
import { getPorfolio } from '../../services/portfolioService';
import type { Portfolio } from '../../types/portfolio.';
import PortfolioLinkCard from '../../components/portfolio/PortfolioLinkCard';
import { useLocation, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Button } from '@heroui/button';
import { Icon } from '@iconify/react';
import toastMessage from '../../services/toasterService';

const PortfolioPreview: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();

  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    const portfolio = await getPorfolio(id);
    setPortfolio(portfolio);
    setLoading(false);
  };

  const sharePorfolioLink = async () => {
    const link = `${window.location.origin}${location.pathname}`;
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(link);
      toastMessage('success', 'Link copied');
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${portfolio?.name} ~ Linkszar`}</title>
        <meta name="description" content={`Portfolio of ${portfolio?.name}`} />
        <link rel="canonical" href={`https://linkszar.com/potfolio/${id}`} />
        <meta name="robots" content="index, follow" />
      </Helmet>
      <div className="flex w-screen h-screen py-6 bg-primary-50">
        <Topbar />
        <div className="flex w-full mt-20 pb-4 px-4 md:px-20 lg:mx-60">
          {!portfolio && !isLoading && <p>Portfolio not found</p>}
          {portfolio && (
            <div className="relative flex w-full flex-col gap-6 items-center">
              <Button
                isIconOnly
                variant="bordered"
                size="md"
                className="absolute right-4 border-2 border-primary-900"
                onPress={() => sharePorfolioLink()}
              >
                <Icon
                  icon="fluent:share-24-filled"
                  className="text-2xl cursor-pointer"
                />
              </Button>
              <h1 className="text-4xl font-bold px-5 mr-12 break-all">
                {portfolio.name}
              </h1>
              <div className="flex flex-col w-full overflow-y-auto">
                {portfolio.about && (
                  <div className="flex mx-2 border-2 border-primary-100 rounded-lg p-4">
                    <p>{portfolio.about}</p>
                  </div>
                )}
                <div className="flex flex-col py-4 md:py-4 px-4 md:px-8 w-full gap-2">
                  {portfolio.links &&
                    portfolio.links.length > 0 &&
                    portfolio.links.map((link, index) => (
                      <PortfolioLinkCard key={index} link={link} />
                    ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PortfolioPreview;
