import React, { useEffect, useState } from 'react';
import { getPublicPortfolioByHandle } from '../../services/portfolioService';
import type { PublicPortfolio } from '../../types/portfolio';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Spinner } from '@heroui/spinner';
import PortfolioView from '../../components/portfolio/PortfolioView';
import toastMessage from '../../services/toasterService';
import Logo from '../../components/brand/Logo';
import { Link } from 'react-router-dom';

const PortfolioPreview: React.FC = () => {
  const { handle } = useParams();

  const [portfolio, setPortfolio] = useState<PublicPortfolio | null>(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handle]);

  const fetchPortfolio = async () => {
    setLoading(true);
    if (handle) {
      const data = await getPublicPortfolioByHandle(handle);
      setPortfolio(data);
    }
    setLoading(false);
  };

  const shareLink = async () => {
    const link = `${window.location.origin}/${handle}`;
    if (navigator?.clipboard?.writeText) {
      await navigator.clipboard.writeText(link);
      toastMessage('success', 'Link copied');
    }
  };

  return (
    <>
      <Helmet>
        <title>{`${portfolio?.name || handle} ~ Linkszar`}</title>
        <meta
          name="description"
          content={`${portfolio?.name || handle}'s links on Linkszar`}
        />
        <link rel="canonical" href={`https://linkszar.com/${handle}`} />
        <meta name="robots" content="index, follow" />
      </Helmet>

      <div className="min-h-screen w-full bg-paper flex flex-col items-center">
        <div className="py-6">
          <Link to="/">
            <Logo />
          </Link>
        </div>

        <div className="flex-1 flex items-center justify-center w-full pb-10 px-4">
          {isLoading && <Spinner size="lg" />}

          {!isLoading && !portfolio && (
            <p className="text-mist text-sm">
              No linkszar found at this address.
            </p>
          )}

          {!isLoading && portfolio && (
            <div className="rounded-[32px] border border-line shadow-sm overflow-hidden">
              <PortfolioView
                handle={portfolio.handle}
                name={portfolio.name}
                about={portfolio.about}
                links={portfolio.links}
                onShare={shareLink}
              />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PortfolioPreview;
