import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => navigate('/'), 2000);
    return () => clearTimeout(timeout);
  }, [navigate]);

  return (
    <div className="min-h-screen w-full bg-paper flex items-center justify-center">
      <p className="text-[14px] text-ink-70">
        That page doesn't exist — taking you home.
      </p>
    </div>
  );
};

export default NotFound;
