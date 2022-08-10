import {
  CreateUserRequest,
  CreateUserResponse,
  createUserResponseValidate,
} from '@codepocket/schema';
import useCustomMutation from '@shared/hooks/useCustomMutation';
import { localStorage } from '@shared/utils/localStorage';
import { useNavigate } from 'react-router-dom';

import { generateTokenPath } from '../../routes';
import { createUserUrl } from '../api';

const useCreateUser = () => {
  const navigate = useNavigate();
  const { mutate: createUserMutate } = useCustomMutation<
    CreateUserResponse,
    CreateUserResponse,
    CreateUserRequest['body']
  >({
    url: createUserUrl,
    method: 'POST',
    validator: createUserResponseValidate,
    options: {
      onSuccess: async (response) => {
        const { pocketToken: token } = response;
        localStorage.setUserToken(token);
        navigate(generateTokenPath({ token }));
      },
    },
  });

  return { createUser: createUserMutate };
};

export default useCreateUser;
