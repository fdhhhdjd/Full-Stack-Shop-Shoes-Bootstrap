import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loading_Pages_Users } from '../../user_ui/imports/General_Global_Import';
const LoadingToRedirect = () => {
  const [count, setCount] = useState(2);
  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 && navigate('/login', { replace: true, state: { from: location } });
    count === 0 && toast.warning('Please Login  when you to the WebSite 😵');
    return () => clearInterval(interval);
  }, [count, navigate]);

  return <Loading_Pages_Users />;
};

export default LoadingToRedirect;
