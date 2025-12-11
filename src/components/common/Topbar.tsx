import React from 'react';

import logo from '../../assets/linkszar-logo.svg';
import icon from '../../assets/favicon.svg';

const Topbar: React.FC = () => {
  return (
    <div className="fixed h-14 flex gap-2 items-center left-1/2 transform -translate-x-1/2 md:transform-none md:translate-0 md:left-28 z-50">
      <div className="flex items-center gap-2">
        <img src={icon} alt="Linkszar Logo icon" className="h-8" />
        <img src={logo} alt="Linkszar Logo" className="h-10" />
      </div>
    </div>
  );
};

export default Topbar;
