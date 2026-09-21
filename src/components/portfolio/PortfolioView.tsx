import React from 'react';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import type { PortfolioLink } from '../../types/portfolio';

interface PortfolioViewProps {
  handle: string;
  name: string;
  about: string;
  links: PortfolioLink[];
  onShare?: () => void;
  showFooterCta?: boolean;
}

const romanize = (index: number) => String(index + 1).padStart(2, '0');

const PortfolioView: React.FC<PortfolioViewProps> = ({
  handle,
  name,
  about,
  links,
  onShare,
  showFooterCta = true,
}) => {
  return (
    <div className="w-[390px] h-[844px] box-border bg-paper flex flex-col overflow-hidden shrink-0">
      <div className="flex items-center justify-between px-6 pt-5">
        <span className="text-[11.5px] font-semibold tracking-wide text-mist uppercase">
          linkszar.com/{handle}
        </span>
        {onShare && (
          <button
            type="button"
            aria-label="Share this profile"
            onClick={onShare}
            className="w-[34px] h-[34px] rounded-full border-[1.5px] border-ink bg-white flex items-center justify-center cursor-pointer"
          >
            <Icon icon="fluent:share-24-filled" className="text-[15px] text-ink" />
          </button>
        )}
      </div>

      <div className="flex flex-col gap-2.5 px-7 pt-7 pb-1.5">
        <p className="font-display font-semibold text-[30px] leading-[1.05] m-0 break-words">
          {name || 'Your name'}
        </p>
        {about && (
          <p className="text-[13.5px] leading-[1.5] text-ink-70 max-w-[280px] m-0">
            {about}
          </p>
        )}
      </div>

      <div className="flex-1 flex flex-col px-7 pt-5.5 overflow-y-auto">
        {links.length > 0 && (
          <div className="flex items-center gap-2.5 pb-2.5">
            <span className="text-[11px] font-semibold tracking-[1.5px] uppercase text-mist">
              Selected links
            </span>
            <span className="flex-1 h-px bg-ghost" />
          </div>
        )}

        {links.map((link, index) => (
          <a
            key={index}
            href={link.url || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 py-4 no-underline text-ink border-b border-line"
          >
            <span
              className={`font-display italic font-medium text-[26px] w-[34px] shrink-0 ${
                index % 3 === 2 ? 'text-ember' : 'text-ghost'
              }`}
            >
              {romanize(index)}
            </span>
            <span className="flex-1 flex flex-col gap-0.5 min-w-0">
              <span className="text-[16px] font-semibold truncate">
                {link.title || 'Untitled link'}
              </span>
              {link.url && (
                <span className="text-[11.5px] text-mist truncate">
                  {link.url.replace(/^https?:\/\//, '')}
                </span>
              )}
            </span>
            <Icon
              icon="lucide:arrow-up-right"
              className="text-[16px] text-ink shrink-0"
            />
          </a>
        ))}

        {links.length === 0 && (
          <p className="text-[13px] text-mist pt-6 text-center">
            No links yet.
          </p>
        )}
      </div>

      {showFooterCta ? (
        <Link
          to="/register"
          className="flex items-center justify-center gap-1.5 py-5 no-underline"
        >
          <span className="text-[12px] text-mist">Get your own</span>
          <span className="font-display font-semibold text-[13px] text-ink">
            linkszar
          </span>
          <Icon icon="lucide:arrow-up-right" className="text-[11px] text-ink" />
        </Link>
      ) : (
        <div className="flex items-center justify-center gap-1.5 py-5">
          <span className="text-[12px] text-mist">made with</span>
          <span className="font-display font-semibold text-[13px] text-ink-70">
            linkszar
          </span>
        </div>
      )}
    </div>
  );
};

export default PortfolioView;
