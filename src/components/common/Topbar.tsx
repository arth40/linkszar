import React from 'react';

import logo from '../../assets/linkszar-logo.svg';

const Topbar: React.FC = () => {
  return (
    <div className="fixed h-14 flex items-center left-1/2 transform -translate-x-1/2 md:transform-none md:translate-0 md:left-28 z-50">
      <img src={logo} alt="Linkszar Logo" className="h-8" />
    </div>
  );
};

export default Topbar;
