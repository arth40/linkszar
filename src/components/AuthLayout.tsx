import React from 'react';
import type { ReactNode } from 'react';

import logo from '../assets/linkszar-logo.svg';
import '../styles/authlayout.scss';

interface AuthLayoutProps {
  children: ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div className="flex w-full flex-col justify-center items-center gap-16 authlayout">
      <img className="h-12" src={logo} alt="Linkszar Logo"></img>
      {children}
    </div>
  );
};

export default AuthLayout;
