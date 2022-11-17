import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Loading_Pages_Users } from '../../user_ui/imports/General_Global_Import';
const LoadingToRedirects = () => {
  const [count, setCount] = useState(2);
  const navigate = useNavigate();
  const location = useLocation();
  const { profile } = useSelector((state) => ({
    ...state.auth_user,
  }));
  useEffect(() => {
    const interval = setInterval(() => {
      setCount((currentCount) => --currentCount);
    }, 1000);
    count === 0 && navigate('/', { replace: true, state: { from: location } });
    count === 0 && toast.info(`Please Logout Account ${profile && profile.name} 🤔`);
    return () => clearInterval(interval);
  }, [count, profile]);

  return <Loading_Pages_Users />;
};

export default LoadingToRedirects;
