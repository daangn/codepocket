import { useAuth0 } from '@auth0/auth0-react';
import { useCallback, useMemo } from 'react';

interface UseCustomAuth0Props {
  domain: string;
}

const useCustomAuth0 = ({ domain }: UseCustomAuth0Props) => {
  const { isAuthenticated, user, logout, loginWithPopup } = useAuth0();

  const isExternalUser = useMemo(() => domain === '*', [domain]);
  const isValidEmailDomain = useCallback(() => {
    if (isExternalUser) return true;
    if (!user || !user.email) return false;

    const userDomain = user?.email.split('@')[1];
    return userDomain === domain;
  }, [domain, isExternalUser, user]);

  return {
    user,
    isAuthenticated,
    isExternalUser,
    loginWithPopup,
    logout,
    isValidEmailDomain,
  };
};

export default useCustomAuth0;
