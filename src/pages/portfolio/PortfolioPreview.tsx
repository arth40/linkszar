import React, { useEffect, useState } from 'react';
import Topbar from '../../components/common/Topbar';
import { getPorfolio } from '../../services/portfolioService';
import { useAuthStore } from '../../store/userStore';
import type { Portfolio } from '../../types/portfolio.';
import PortfolioLinkCard from '../../components/portfolio/PortfolioLinkCard';

const PortfolioPreview: React.FC = () => {
  const { user } = useAuthStore();

  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    const portfolio = await getPorfolio(user?.uid);
    setPortfolio(portfolio);
    setLoading(false);
  };
  return (
    <div className="flex w-screen h-screen py-6 bg-primary-50">
      <Topbar />
      <div className="flex w-full mt-20 pb-4 px-4 md:px-20 lg:mx-60">
        {!portfolio && !isLoading && <p>Portfolio not found</p>}
        {portfolio && (
          <div className="flex w-full flex-col gap-6 items-center">
            <h1 className="text-4xl font-bold">{portfolio.name}</h1>
            {portfolio.about && (
              <div className="w-full border-2 border-primary-100 rounded-lg p-4">
                <p>{portfolio.about}</p>
              </div>
            )}
            <div className="flex flex-col py-4 md:py-4 px-4 md:px-8 w-full gap-2 overflow-y-auto">
              {portfolio.links &&
                portfolio.links.length > 0 &&
                portfolio.links.map((link, index) => (
                  <PortfolioLinkCard key={index} link={link} />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PortfolioPreview;
