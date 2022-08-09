import {
  VerifyUserRequest,
  VerifyUserResponse,
  verifyUserResponseValidate,
} from '@codepocket/schema';
import useCustomMutation from '@shared/hooks/useCustomMutation';
import { localStorage } from '@shared/utils/localStorage';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import { verifyUserUrl } from '../api';

type VerifyUserBodyType = VerifyUserRequest['body'];
interface UseVerifyUserMutationProps {
  path: string;
}

const useVerifyUser = ({ path }: UseVerifyUserMutationProps) => {
  const navigate = useNavigate();

  const onSuccess = (_: VerifyUserResponse, vars: VerifyUserBodyType) => {
    localStorage.setUserToken(vars.pocketToken);
    navigate(path);
  };

  const { mutate: verifyUserMutate } = useCustomMutation<
    VerifyUserResponse,
    VerifyUserResponse,
    VerifyUserBodyType
  >({
    url: verifyUserUrl,
    validator: verifyUserResponseValidate,
    method: 'POST',
    options: {
      onSuccess,
    },
  });

  const verifyUser = useCallback(async () => {
    const token = localStorage.getUserToken();
    if (!token) return;

    verifyUserMutate({ pocketToken: token });
  }, [verifyUserMutate]);

  return { verifyUser };
};

export default useVerifyUser;
