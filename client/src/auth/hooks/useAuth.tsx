import { VerifyUserRequest, VerifyUserResponse } from '@pocket/schema';
import useCustomMutation from '@shared/hooks/useCustomMutation';
import { APIErrorType } from '@shared/lib/axios';
import { getUsernameFormLocalStorage, setUsernameToLocalStorage } from '@shared/utils/localStorage';
import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { verifyUserUrl } from '../api';

type VerifyUserBodyType = VerifyUserRequest['body'];
interface UseAuthProps {
  path: string;
}

const SHAKE_TIMEOUT_MS = 500;

const useAuth = ({ path }: UseAuthProps) => {
  const navigate = useNavigate();
  const [error, setError] = useState<string>('');
  const [shake, setShake] = useState<boolean>(false);

  const onErrorAuth = (err: APIErrorType<VerifyUserResponse>) => {
    setError(err.response.data.message);
    setShake(true);
    setTimeout(() => {
      setShake(false);
    }, SHAKE_TIMEOUT_MS);
  };

  const onSuccess = (_: VerifyUserResponse, vars: VerifyUserBodyType) => {
    setUsernameToLocalStorage(vars.pocketToken);
    navigate(path);
  };

  const { mutate: verifyUserMutate } = useCustomMutation<
    VerifyUserResponse,
    VerifyUserResponse,
    VerifyUserBodyType
  >({
    url: verifyUserUrl,
    method: 'POST',
    onError: onErrorAuth,
    onSuccess,
  });

  const checkValidUser = useCallback(async () => {
    const username = getUsernameFormLocalStorage();
    if (!username) return;

    verifyUserMutate({ pocketToken: username });
  }, [verifyUserMutate]);

  useEffect(() => {
    checkValidUser();
  }, [checkValidUser]);

  return { shake, error, verifyUserFromServer: verifyUserMutate };
};

export default useAuth;
