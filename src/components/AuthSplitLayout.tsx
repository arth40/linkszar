import React from 'react';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import Logo from './brand/Logo';

interface AuthSplitLayoutProps {
  tagline: string;
  footerLabel: string;
  footerLinkText: string;
  footerLinkTo: string;
  children: ReactNode;
}

const AuthSplitLayout: React.FC<AuthSplitLayoutProps> = ({
  tagline,
  footerLabel,
  footerLinkText,
  footerLinkTo,
  children,
}) => {
  return (
    <div className="min-h-screen w-full flex bg-paper">
      <div className="hidden md:flex w-[400px] shrink-0 bg-ink p-12 flex-col justify-between">
        <Link to="/">
          <Logo ink="#F3EEE2" accent="#FF6B45" wordmarkClassName="text-[19px]" />
        </Link>
        <p className="font-display text-[32px] leading-[1.3] font-medium text-[#F3EEE2] m-0">
          {tagline}
        </p>
        <div className="flex flex-col gap-1.5">
          <p className="text-[13px] text-mist m-0">{footerLabel}</p>
          <Link
            to={footerLinkTo}
            className="text-[14px] font-semibold text-[#F3EEE2] no-underline"
          >
            {footerLinkText} →
          </Link>
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center p-8 md:p-12">
        <div className="w-full max-w-[380px] flex flex-col gap-6">
          <Link to="/" className="md:hidden mb-2">
            <Logo />
          </Link>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthSplitLayout;
