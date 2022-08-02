import { useAuth0 } from '@auth0/auth0-react';
import { useCallback } from 'react';

interface UseCustomAuth0Props {
  domain: string;
}

const useCustomAuth0 = ({ domain }: UseCustomAuth0Props) => {
  const { isAuthenticated, user, logout, loginWithPopup } = useAuth0();

  const isValidEmailDomain = useCallback(() => {
    if (!user || !user.email) return false;
    const userDomain = user?.email.split('@')[1];
    return userDomain === domain;
  }, [domain, user]);

  return {
    user,
    isAuthenticated,
    loginWithPopup,
    logout,
    isValidEmailDomain,
  };
};

export default useCustomAuth0;
