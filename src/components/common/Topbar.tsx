import React from 'react';

import logo from '../../assets/linkser-logo.svg';

const Topbar: React.FC = () => {
  return (
    <div className="fixed h-14 flex items-center left-1/2 transform -translate-x-1/2">
      <img src={logo} alt="Linkser Logo" className="h-8" />
    </div>
  );
};

export default Topbar;
