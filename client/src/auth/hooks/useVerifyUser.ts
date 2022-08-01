import { VerifyUserRequest, VerifyUserResponse } from '@pocket/schema';
import useCustomMutation from '@shared/hooks/useCustomMutation';
import { getUserNameFormLocalStorage, setUserNameToLocalStorage } from '@shared/utils/localStorage';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { verifyUserUrl } from '../api';

type VerifyUserBodyType = VerifyUserRequest['body'];
interface UseVerifyUserMutationProps {
  path: string;
}

const useAuth = ({ path }: UseVerifyUserMutationProps) => {
  const navigate = useNavigate();

  const onSuccess = (_: VerifyUserResponse, vars: VerifyUserBodyType) => {
    setUserNameToLocalStorage(vars.pocketToken);
    navigate(path);
  };

  const { mutate: verifyUserMutate } = useCustomMutation<
    VerifyUserResponse,
    VerifyUserResponse,
    VerifyUserBodyType
  >({
    url: verifyUserUrl,
    method: 'POST',
    onSuccess,
  });

  const verifyUser = useCallback(async () => {
    const userName = getUserNameFormLocalStorage();
    if (!userName) return;

    verifyUserMutate({ pocketToken: userName });
  }, [verifyUserMutate]);

  return { verifyUser };
};

export default useAuth;
