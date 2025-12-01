import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  setTimeout(() => {
    navigate('/');
  }, 2000);
  return <div>This page is not accesible redirecting to Home</div>;
};

export default NotFound;
