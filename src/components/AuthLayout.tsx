import React from 'react';
import type { ReactNode } from 'react';

import logo from '../assets/linkszar-logo.svg';
import icon from '../assets/favicon.svg';
import '../styles/authlayout.scss';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex w-full flex-col justify-center items-center gap-16 authlayout">
      <div className="flex items-center gap-2">
        <img src={icon} alt="Linkszar Logo icon" className="h-8" />
        <img src={logo} alt="Linkszar Logo" className="h-10" />
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
